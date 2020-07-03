const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/User");

router.get("/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.json({ user });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      return res.status(400).json({ username: "username already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ userId: req.user.id });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send(200);
});



module.exports = router;
