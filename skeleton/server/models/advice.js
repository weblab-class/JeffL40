const mongoose = require("mongoose");

//define a story schema for the database
const AdviceSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  advice: String,
  adviceStory: String,
  dateSubmitted: String,
  category: String,
});

// compile model from schema
module.exports = mongoose.model("advice", AdviceSchema);
