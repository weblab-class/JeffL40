const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryName: String,
  numPosts: {type:Number, default: 0},
});

// compile model from schema
module.exports = mongoose.model("category", CategorySchema);
