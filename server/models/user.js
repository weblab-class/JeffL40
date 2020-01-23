const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  numLikes : {type: Number, default:0},
  numAdvices : {type: Number, default:0},
  hasLiked: [ObjectId]
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
