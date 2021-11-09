require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
async function generateAuthToken(name, _id, res) {
  const expiration = 604800000;
  const token = jwt.sign({ _id: _id, name: name }, process.env.jwtPrivateKey, {
    expiresIn: process.env.DB_ENV === "testing" ? "1d" : "7d",
  });
  const obj = {
    token: token,
    _id: _id,
  };
  res.cookie("token", obj, {
    expires: new Date(Date.now() + expiration),
    httpOnly: true,
    secure: true,
  });
  return token;
}
exports.userauth = async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name: name });
  if (!user) {
    var newuser = await User.create({
      name: name,
      password: password,
      myBlogs: [],
    });
    var string = generateAuthToken(name, newuser._id, res);
    newuser.token = string;
    newuser.save();
    return res.status(200).redirect("/blogs");
  }
  if (user.password != password)
    return res.status(409).json("wrong Username/Password");
  var string = generateAuthToken(name, user._id, res);
  return res.status(200).redirect("blogs");
};

exports.logOut = async (req, res) => {};
