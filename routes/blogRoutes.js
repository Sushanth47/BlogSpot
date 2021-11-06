const express = require("express");
const blogController = require("../controllers/blogControllers");
const { middlewareasync } = require("../middleware/asyncMiddleware");
const router = express.Router();

router.get("/", blogController.blog_index);

router.post("/", blogController.blog_create_post);

router.get("/create", blogController.blog_create_get);

router.get("/:id", middlewareasync(blogController.blog_details));

router.delete("/delete/:id", blogController.blog_delete);

module.exports = router;
