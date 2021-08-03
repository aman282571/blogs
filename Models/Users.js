var mongoose = require("mongoose");
var user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  blogs: [{ type: mongoose.Schema.Types.ObjectId }],
  img: {
    type: String,
    default: null,
  },
  email: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
var User = mongoose.model("Users", user);
module.exports = User;
