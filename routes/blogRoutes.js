const express = require("express");
const apicache = require("apicache");
const blogController = require("../controllers/blogControllers");
const router = express.Router();

let cache = apicache.middleware;

router.get("/", blogController.blog_index);

router.post("/createPost", blogController.blog_create_post);

router.get("/blogs/:id", blogController.get_blog_details);

router.get("/create", blogController.blog_create_get);

router.get("/blogs", blogController.blog_details);

router.get("/delete/:id", blogController.blog_delete);

module.exports = router;
