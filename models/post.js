const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  postHeadline: {
    type: String,
  },
  postDescription: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
