/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Advice = require("./models/advice");
const Category = require("./models/category");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  console.log("User whoami", req.user)
  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/advice", (req, res) => {
  // empty selector means get all documents
  //Advice.deleteMany({}).then((a)=>{1}); //uncomment&refresh to delete all advice
  if (req.query.categoryName 
        && req.query.categoryName !== ""
        ){
    Advice.find({category: req.query.categoryName}).then((foundAdvices) => res.send(foundAdvices));
  }
  else{ 
    if (req.query.idQueriedUser !== ""){
      //console.log("idQueriedUser received in api: " + req.query.idQueriedUser);
      //console.log('req.query.idQueriedUser === "null" ', req.query.idQueriedUser === "null");
      Advice.find({
          creator_id: req.query.idQueriedUser
        }).then((foundAdvices) => res.send(foundAdvices));
    }
    else{
      Advice.find({}).then((foundAdvices) => res.send(foundAdvices));
    }};
  
});

router.post("/advice"
          // , auth.ensureLoggedIn
           , (req, res) => {
    let creator_id = "noID";
    let creator_name = "noName";
    if(req.user){
      console.log( "user received in post advice request", req.user);
      creator_id = req.user._id;
      creator_name = req.user.name;
      User.findOne({_id: req.user._id}).then(
        (poster) => {
          console.log("posterOfAdviceToInc: ", poster);
          poster.numAdvices = poster.numAdvices + 1;
          poster.save();
        }
      )
      console.log("new numAdvices: ", req.user.numAdvices);

    }
    Category.findOne({categoryName: req.body.category}).then(
      (foundCategory) => {
        if(foundCategory){
          foundCategory.numPosts = foundCategory.numPosts + 1;
          foundCategory.save();
          console.log("updated category: ", foundCategory);
        }
        else{
          const newCategory = new Category({
            categoryName: req.body.category,
            numPosts: 1,
          });
          newCategory.save();
          console.log("new category: ", newCategory);
        }
      }
    );
    const newAdvice = new Advice({
    creator_id: creator_id,
    creator_name: creator_name,
    advice: req.body.advice,
    adviceStory: req.body.adviceStory,
    category: req.body.category,
  });

  newAdvice.save().then((savedAdvice) => res.send(savedAdvice));
});

router.get( "/getProfileById" //passed id
  // , auth.ensureLoggedIn
  , (req, res) => {
    User.findById( req.query.idProfile).then(
      (foundProfileUser) => {res.send( foundProfileUser)}
    )
  }
);

router.get( "/categoriesWithSubstring"
  , (req,res) =>{ //req has substring
    Category.find({categoryName: {$regex: req.query.target, $options: 'i'}}).then(
      (foundCategories) => {res.send( foundCategories)}
    )
  }
);
router.get( "/usersWithName"
  , (req, res) =>{//req has Name
    User.find({name: {$regex: req.query.target, $options: 'i'}}).then(
      (foundUsers)=>{res.send( foundUsers)}
    )
  }
);

router.post("/like",auth.ensureLoggedIn, (req, res) => {
            console.log("like post request issued");
            Advice.findById( req.body.adviceId).then(
              ( foundAdvice) => {
                foundAdvice.numLikes = foundAdvice.numLikes + 1;
                foundAdvice.save();
              }
            )
            
            User.findById(req.body.creator_id).then(
              (foundCreator => {
                foundCreator.numLikes = foundCreator.numLikes + 1;
                foundCreator.save();
              })
            );
            
            User.findById(req.body.userId).then(
              (foundLiker) => {
                console.log("foundLiker haslikedB4: ", foundLiker.hasLiked);
                foundLiker.hasLiked = foundLiker.hasLiked.concat([req.body.adviceId]);
                console.log("foundLiker hasLikedAFTR", foundLiker.hasLiked);
                foundLiker.save().then(
                  (liker) => console.log("Found updated liker", liker)
                );
              }
            )    
          }
);

router.post("/undo"
           // , auth.ensureLoggedIn
          , (req, res) => {
            Advice.findById( req.body.adviceId).then(
              ( foundAdvice) => {
                foundAdvice.numLikes = foundAdvice.numLikes - 1;
                foundAdvice.save();
              }
            )
            
            User.findById(req.body.creator_id).then(
              (foundCreator => {
                foundCreator.numLikes = foundCreator.numLikes - 1;
                foundCreator.save();
              })
            );
            
            User.findById(req.body.userId).then(
              (foundLiker) => {
                console.log("foundLiker has Liked", foundLiker.hasLiked);
                console.log("remove this Id", req.body.adviceId);
                let x = foundLiker.hasLiked.filter((adviceId) => {
                  console.log("did match", adviceId.toString() !== req.body.adviceId.toString());
                  return adviceId.toString() !== req.body.adviceId.toString();
                });
                console.log("filtered", x);
                foundLiker.hasLiked = x;
                console.log("foundLiker after filter", foundLiker.hasLiked);
                foundLiker.save();
              }
            );
          }
);

router.post("/submitRating",(req,res)=>{
    console.log("submit rating api call");
    Promise.all([
      User.findById(req.body.userId),
      User.findById(req.body.creator_id),
      Advice.findById(req.body.adviceId)
    ]).then( (allData) =>{
        let foundAdvice = allData[2];
        let foundCreator=allData[1];
        let foundRater=allData[0];
        foundAdvice.totalRatings = foundAdvice.totalRatings + req.body.rating;
        foundCreator.totalRatings = foundCreator.totalRatings + req.body.rating;
        let filteredHasRated = foundRater.hasRated.filter((someTuple) =>{
            return someTuple.adviceId.toString() === req.body.adviceId.toString();
          }
        );
        let x = filteredHasRated.length === 0;
        if( x){//foundRater has not rated
            foundAdvice.numRatings = foundAdvice.numRatings + 1;
            foundCreator.numRatings = foundCreator.numRatings + 1;
            foundRater.hasRated = foundRater.hasRated.concat(
              [{adviceId:req.body.adviceId, rating: req.body.rating}]);
        }
        else{
            foundAdvice.totalRatings = foundAdvice.totalRatings 
                                      -filteredHasRated[0].rating;
            foundCreator.totalRatings = foundCreator.totalRatings
                                      -filteredHasRated[0].rating;
            foundRater.hasRated = foundRater.hasRated.filter(
              (someTuple) => {
                return someTuple.adviceId.toString() !==
                             req.body.adviceId.toString();
              }
            );
            foundRater.hasRated=foundRater.hasRated.concat([
              {adviceId: req.body.adviceId, rating: req.body.rating}
            ]);
        }
        // foundRater.hasRated=[] //reset hasrated
        foundAdvice.save();
        foundRater.save();
        foundCreator.save();
        res.send({deltaTotalRatings: (!x) ? req.body.rating
           - filteredHasRated[0].rating:req.body.rating,
              deltaNumRatings: (x)? 1:0
          });
      }
    );
});
router.post("/undoRating",(req,res)=>{
  console.log("undo rating api call");
  Promise.all([
    User.findById(req.body.userId),
    User.findById(req.body.creator_id),
    Advice.findById(req.body.adviceId)
  ]).then( (allData) =>{
      
    let foundAdvice = allData[2];
    let foundCreator=allData[1];
    let foundRater=allData[0];
    // foundAdvice.totalRatings = foundAdvice.totalRatings + req.body.rating;
    // foundCreator.totalRatings = foundCreator.totalRatings + req.body.rating;
    let filteredHasRated = foundRater.hasRated.filter((someTuple) =>{
        return someTuple.adviceId.toString() === req.body.adviceId.toString();
      }
    );
    let x = filteredHasRated.length === 0;
    if( x){//foundRater has not rated
        // foundAdvice.numRatings = foundAdvice.numRatings + 1;
        // foundCreator.numRatings = foundCreator.numRatings + 1;
        // foundRater.hasRated = foundRater.hasRated.concat(
        //   [{adviceId:req.body.adviceId, rating: req.body.rating}]);
    }
    else{
        foundAdvice.numRatings = foundAdvice.numRatings - 1;
        foundCreator.numRatings = foundCreator.numRatings - 1;
        foundAdvice.totalRatings = foundAdvice.totalRatings 
                                  -filteredHasRated[0].rating;
        foundCreator.totalRatings = foundCreator.totalRatings
                                  -filteredHasRated[0].rating;
        foundRater.hasRated = foundRater.hasRated.filter(
          (someTuple) => {
            return someTuple.adviceId.toString() !==
                         req.body.adviceId.toString();
          }
        );
    }
    // foundRater.hasRated=[] //reset hasrated
    foundAdvice.save();
    foundRater.save();
    foundCreator.save();
    res.send({deltaTotalRatings: (!x) ?
       - filteredHasRated[0].rating:0,
          deltaNumRatings: (!x)?-1:0
      });
    }
  );
  
});
// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
