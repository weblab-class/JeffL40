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
  console.log("apiReceivedThisQuery: ", req.query);
  console.log("apiReceivedThisQueryID: ", req.query.idQueriedUser);
  console.log('req.query.categoryName && req.query.categoryName !== ""'
             , req.query.categoryName && req.query.categoryName !== "");
  console.log('req.query.idQueriedUser !== ""', req.query.idQueriedUser !== "");
  if (req.query.categoryName 
        && req.query.categoryName !== ""
        ){
    Advice.find({category: req.query.categoryName}).then((foundAdvices) => res.send(foundAdvices));
  }
  else{ 
    if (req.query.idQueriedUser !== ""){
      console.log("idQueriedUser received in api: " + req.query.idQueriedUser);
      console.log('req.query.idQueriedUser === "null" ', req.query.idQueriedUser === "null");
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
      creator_id = req.user._id;
      creator_name = req.user.name;
    }
    const newAdvice = new Advice({
    creator_id: creator_id,
    creator_name: creator_name,
    advice: req.body.advice,
    adviceStory: req.body.adviceStory,
    dateSubmitted: "temporaryDate",
    category: req.body.category,
  });

  newAdvice.save().then((savedAdvice) => res.send(savedAdvice));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
