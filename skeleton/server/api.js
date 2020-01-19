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
  //Advice.deleteMany({}).then((a)=>{1});
  Advice.find({}).then((foundAdvices) => res.send(foundAdvices));
});

router.post("/advice"
          // , auth.ensureLoggedIn
           , (req, res) => {
    const newAdvice = new Advice({
    creator_id: "temporarycreatrID",//req.user.id,
    creator_name: "temporarycreatrname",//req.user.name,
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
