const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: String,
  reactions: { type: Map, of: Number },
});

const Post = mongoose.model("Post", postSchema);
 

export default  Post
