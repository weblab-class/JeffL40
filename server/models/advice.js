const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

//define a story schema for the database
const AdviceSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  advice: String,
  adviceStory: String,
  category: String,
  timeStamp: {type: Date, default: Date.now},
  likedOrDislikedBy: [ObjectId],
  likedBy: [ObjectId],
  dislikedBy: [ObjectId],
});

// compile model from schema
module.exports = mongoose.model("advice", AdviceSchema);
