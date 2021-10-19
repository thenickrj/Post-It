const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const SignUpRouter = require("./routes/signup");
const PostsRouter = require("./routes/posts");
const LikesRouter = require("./routes/likes");
const CommentRouter = require("./routes/comments");
const ReplyRouter = require("./routes/reply");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/", SignUpRouter);
app.use("/", PostsRouter);
app.use("/", LikesRouter);
app.use("/", CommentRouter);
app.use("/", ReplyRouter);

app.listen(port, function () {
  console.log("Server running on port 3000");
});
