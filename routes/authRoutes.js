const express = require("express");
const router = express.Router();

const {
  login,
  logOut,
  userauth,
  signUp,
  signup,
} = require("../controllers/authController");

router.get("/login", login);

router.post("/signin", userauth);

router.get("/logout", logOut);

router.post("/signUp", signUp);

router.get("/signup", signup);

module.exports = router;
