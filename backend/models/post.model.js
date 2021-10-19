const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postsSchema = new Schema(
  {
    body: { type: String, required: true },
    name: { type: String, required: true },
    likeCount: { type: Number, required: true },
    commentCount: { type: Number, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Posts", postsSchema);

module.exports = Posts;
