const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Blog = require("../models/blog");

const blog_index = async (req, res) => {
  // console.log(req);
  // console.log(req.user);
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

const get_blog_details = async (req, res) => {
  console.log(req.params);
  return res.render("blogs/details", {
    title: "blogDetails",
    _id: req.params.id,
  });
};

const blog_details = async (req, res) => {
  var blogFind = await Blog.aggregate([
    {
      $match: { _id: ObjectId(req.query.id) },
    },
    {
      $project: {
        title: 1,
        snippet: 1,
        body: 1,
        createdAt: 1,
        author: 1,
        date: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
      },
    },
  ]);
  // console.log(blogFind);

  return res.status(200).json({
    blog: blogFind,
    title: "Blog Details",
  });
};

const blog_create_get = async (req, res) => {
  console.log(req.user);
  return res.render("blogs/create", {
    title: "Create a new Blog",
  });
};

const blog_create_post = async (req, res) => {
  try {
    await Blog.create({
      title: req.body.title,
      body: JSON.stringify(req.body.body),
      snippet: req.body.snippet,
      author: req.user.name,
      createdBy: req.user._id,
    });
    return res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

const blog_delete = async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);
  return res.redirect(`/`);
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  get_blog_details,
};
