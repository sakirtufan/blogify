const express = require("express");
const User = require("../models/User");
const router = express.Router();


router.get("/register", (req, res) => {
  res.render("site/register");
});

router.post("/register", (req, res) => {
  User.create(req.body, (err, user) => {
    req.session.sessionFlash = {
      type:'alert alert-info',
      message: 'User created successfully'
    }
    res.redirect("/users/login");
  });
});

router.get("/login", (req, res) => {
  res.render("site/login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (user) {
      if (user.password == password) {
        // USER SESSION
        req.session.userId = user._id;
        res.redirect("/");
      } else {
        res.redirect("/users/login");
      }
    } else {
      res.redirect("/users/register");
    }
  });
});

module.exports = router;
