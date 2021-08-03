var mongoose = require("mongoose");
var blog = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },

  updated_at: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
var blogs = mongoose.model("blogs", blog);
module.exports = blogs;
