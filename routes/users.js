const express = require("express");
const User = require("../models/User");
const router = express.Router();


router.get("/register", (req, res) => {
  res.render("site/register");
});

router.post("/register", (req, res) => {
  User.create(req.body, (err, user) => {
    res.redirect("/");
  });
});

router.get("/login", (req, res) => {
  res.render("site/login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // if(!validateUserInput(email, password)){
  //   return next(new Error("Please check your inputs"))
  // }

  User.findOne({ email }, (err, user) => {
    if (user) {
      if (user.password == password) {
        // USER SESSION
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
