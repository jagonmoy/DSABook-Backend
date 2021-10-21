const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userName: {
    type: String,
    required:true
  },
  postHeadline: {
    type: String,
    required:true
  },
  postDescription: {
    type: String,
    required:true
  }
},{
  timestamps : true
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
