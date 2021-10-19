const router = require("express").Router();
const asyncHandler = require("express-async-handler");
let Post = require("../models/post.model");
let Likes = require("../models/likes.model");

// Route to get daily view of a particular user
router.route("/likes/post=:id").get((req, res) => {
  Likes.find({ postId: req.params.id })
    .then((event) => res.json(event))
    .catch((err) => res.json("Error: " + err));
});

// Route to get daily view of a particular user
router.route("/likes/email=:email/post=:id").get((req, res) => {
  Likes.find({ email: req.params.email, postId: req.params.id })
    .then((event) => res.json(event))
    .catch((err) => res.json("Error: " + err));
});

// Route to add a like
router.route("/addLike").post((req, res) => {
  const postId = req.body.postId;
  const email = req.body.email;

  const newLike = new Likes({ postId, email });

  newLike
    .save()
    .then((data) =>
      Post.findOneAndUpdate(
        { _id: postId },
        {
          $inc: {
            likeCount: 1,
          },
        }
      )
    )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

// Route for unlike
router.route("/unLike").post((req, res) => {
  const postId = req.body.postId;
  const email = req.body.email;

  Likes.deleteOne({ postId: postId, email: email })
    .then((data) =>
      Post.findOneAndUpdate(
        { _id: postId },
        {
          $inc: {
            likeCount: -1,
          },
        }
      )
    )
    .then((data) => res.json(data));

  // .then((data) =>
  //   res.json(data)
  // );

  // res.json(removeLike);
  // res.json(item);
  // try {
  //   Likes.deleteOne({ _id: item._id }).then((data) => res.json(data));
  // } catch (e) {
  //   console.log(e);
  // }
  // Likes.find({ postId: postId, email: email })
  //   .then((data) => Likes.remove({ _id: data._id }))
  //   .then((data) => res.json(data));
  // res.json(item);
  // Likes.findByIdAndDelete()
  // newLike
  //   .save()
  //   .then((data) => res.json(data))
  //   .catch((err) => res.json(err));

  // Post.findOneAndUpdate(
  //   { _id: postId },
  //   {
  //     $inc: {
  //       likeCount: -1,
  //     },
  //   }
  // );
});

module.exports = router;
