const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");
const Post = require("../../models/Post");


router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/categories", (req, res) => {
  Category.find({}).sort({$natural:-1}).then((categories) => {
    res.render("admin/categories", { categories: categories });
  });
});

router.post("/categories", (req, res) => {
  Category.create(req.body, (error, category) => {
    if (!error) {
      res.redirect("categories");
    }
  });
});

router.delete("/categories/:id", (req, res) => {
  Category.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect("/admin/categories");
  });
});

router.get("/posts", (req, res) => {
  Post.find({}).populate({path:"category", model: Category}).sort({$natural:-1}).then((posts) => {
    
      res.render("admin/posts", { posts: posts});
  
  });
});

router.delete("/posts/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect("/admin/posts");
  });
});

module.exports = router;
