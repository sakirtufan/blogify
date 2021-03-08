const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const path = require("path");
const Category = require("../models/Category");

router.get("/new", (req, res) => {
  if(!req.session.userId) {
    res.redirect('/users/login')
  }

  Category.find({}).sort({$natural:-1}).then((categories) => {
    res.render("site/addPost", { categories: categories})
  })
  
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id).then((post) => {
    res.render("site/post", { post: post });
  });
});

router.post("/test", (req, res) => {
  let post_image = req.files.post_image;
  post_image.mv(
    path.resolve(__dirname, "../public/img/postimages", post_image.name)
  );
  Post.create({
    ...req.body,
    post_image: `/img/postimages/${post_image.name}`,
  }, );

  req.session.sessionFlash = {
    type:'alert alert-success',
    message: 'Your post has been created successfully'
  }

  res.redirect("/blog");
});


module.exports = router;
