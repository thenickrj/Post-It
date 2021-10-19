const router = require("express").Router();
const asyncHandler = require("express-async-handler");

let SignUp = require("../models/signup.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../util/generateToken");

// Route to check if the login credentials are valid
router.route("/login").post(
  asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await SignUp.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.json("Invalid Credentials");
    }
  })
);

// Route to a signup a new user
router.route("/signup").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const newSignUp = new SignUp({ name, email, password });

  newSignUp
    .save()
    .then((user) =>
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    )
    .catch((err) => res.json("Account already exist"));
});

module.exports = router;
