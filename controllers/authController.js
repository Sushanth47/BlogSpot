require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function generateAuthToken(res, name, _id) {
  const expiration = 604800000;
  const token = jwt.sign(
    { _id: _id, name: name, user: "User" },
    process.env.jwtPrivateKey,
    {
      expiresIn: process.env.DB_ENV === "testing" ? "1d" : "7d",
    }
  );
  // console.log(token, "token");
  var obj = {
    token: token,
    _id: 1,
  };
  res.cookie("token", obj, {
    expires: new Date(Date.now() + expiration),
    httpOnly: true,
    secure: true,
  });
  return token;
}

exports.login = async (req, res) => {
  return res.render("blogs/login", { message: req.flash("message") });
};

exports.signup = async (req, res) => {
  return res.render("blogs/signup", { message: req.flash("message") });
};

exports.userauth = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ name: username });
  if (!user || user.password != password) {
    req.flash("message", "Invalid Username/Password");
    return res.status(409).redirect("/auth/login");
  }
  await generateAuthToken(res, username, user._id);
  user.save();
  req.flash("message", "User Created Successfully");
  return res.status(200).redirect("/");
};

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  var user = await User.findOne({ name: username });
  if (user) {
    req.flash("message", "User Already Exists");
    return res.redirect("/auth/signup");
  }
  var newuser = await User.create({
    name: username,
    password: password,
    myBlogs: [],
  });
  await generateAuthToken(res, username, newuser._id);
  return res.redirect("/");
};

exports.logOut = async (req, res) => {
  res.clearCookie("token");
  return res.redirect("/");
};
