const router = require("express").Router();

let Post = require("../models/post.model");
let Comments = require("../models/comment.model");

// route to add comment
router.route("/addComment").post((req, res) => {
  const postId = req.body.postId;
  const name = req.body.name;
  const body = req.body.body;

  const newComment = new Comments({ body, postId, name });

  newComment
    .save()
    .then((data) =>
      Post.findOneAndUpdate(
        { _id: postId },
        {
          $inc: {
            commentCount: 1,
          },
        }
      )
    )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

// route to get all the comments for a particular post
router.route("/comment/post=:id").get((req, res) => {
  Comments.find({ postId: req.params.id })
    .then((event) => res.json(event))
    .catch((err) => res.json("Error: " + err));
});

module.exports = router;
