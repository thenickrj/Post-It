const router = require("express").Router();

let Reply = require("..//models/reply.model");

// route to add a reply for a particular comment
router.route("/addReply").post((req, res) => {
  const postId = req.body.postId;
  const commentId = req.body.commentId;
  const name = req.body.name;
  const body = req.body.body;

  const newReply = new Reply({ body, commentId, postId, name });

  newReply
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

// Route to get replies for a particular comment
router.route("/reply/post=:id/comment=:commentId").get((req, res) => {
  Reply.find({ postId: req.params.id, commentId: req.params.commentId })
    .then((event) => res.json(event))
    .catch((err) => res.json("Error: " + err));
});
module.exports = router;
