const express = require("express");
const blogController = require("../controllers/blogControllers");
const router = express.Router();
router.get("/", async (req, res) => {
  return res.redirect("/blogs");
});

module.exports = router;
