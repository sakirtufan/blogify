const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", (req, res) => {
  res.render("site/index");
});


router.get("/blog", (req, res) => {
  Post.find({}).sort({$natural:-1}).then((posts) => {
    res.render("site/blog", { posts: posts });
  });
});

router.get("/contact", (req, res) => {
  res.render("site/contact");
});



module.exports = router;
