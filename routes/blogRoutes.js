const express = require("express");
const apicache = require("apicache");
const blogController = require("../controllers/blogControllers");
const router = express.Router();
const { checkauth, userauth } = require("../middleware/auth");

let cache = apicache.middleware;

router.get("/", checkauth, blogController.blog_index);

router.post("/createPost", checkauth, blogController.blog_create_post);

router.get("/blogs/:id", checkauth, blogController.get_blog_details);

router.get("/create", userauth, blogController.blog_create_get);

router.get("/blogs", checkauth, blogController.blog_details);

router.get("/delete/:id", userauth, blogController.blog_delete);

router.get("/myblogs", userauth, blogController.my_blogs);

module.exports = router;
