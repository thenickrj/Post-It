const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    body: { type: String, required: true },
    postId: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comment", commentSchema);

module.exports = Comments;
