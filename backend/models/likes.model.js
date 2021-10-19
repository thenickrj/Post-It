const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likesSchema = new Schema(
  {
    postId: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Likes = mongoose.model("Likes", likesSchema);

module.exports = Likes;
