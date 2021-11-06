const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Blog = require("../models/blog");
const { middlewareasync } = require("../middleware/asyncMiddleware");
const blog_index = async (req, res) => {
  var result = await Blog.aggregate([
    {
      $project: {
        title: 1,
        snippet: 1,
        body: 1,
        createdAt: 1,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);
  return res.render("blogs/index", { title: "All Blogs", blogs: result });
};

const blog_details = async (req, res) => {
  const id = req.params.id;
  // var blogFind = await Blog.findById(id);
  blogFind = await Blog.aggregate([
    {
      $match: { _id: ObjectId(req.params.id) },
    },
    {
      $project: {
        title: 1,
        snippet: 1,
        body: 1,
        createdAt: 1,
        images: 1,
      },
    },
  ]);
  if (blogFind.length > 0) {
    return res.render("blogs/details", {
      blog: blogFind,
      title: "Blog Details",
    });
  } else {
    res.status(404).render("404", { title: "Blog not found" });
  }
};

const blog_create_get = async (req, res) => {
  return res.render("blogs/create", { title: "Create a new Blog" });
};

const blog_create_post = async (req, res) => {
  var image = [];
  image.push(req.body.img);
  await Blog.create({
    title: req.body.title,
    body: req.body.body,
    snippet: req.body.snippet,
    images: image,
  });
  return res.redirect("/blogs");
};

const blog_delete = async (req, res) => {
  const id = req.params.id;

  await Blog.findByIdAndDelete(id);

  return res.json({ redirect: "/blogs" });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
