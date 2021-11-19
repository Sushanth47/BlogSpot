const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Guest = require("../models/guest");

exports.checkauth = async (req, res, next) => {
  const token = JSON.stringify(req.cookies);
  // console.log(token, "cookies");
  if (token == "{}") {
    const si = require("systeminformation");
    var checkdata = { flags: "", vendor: "" };
    await si
      .cpu()
      .then((data) => {
        (checkdata.flags = data.flags), (checkdata.vendor = data.vendor);
      })
      .catch((error) => console.error(error));
    var guest = await Guest.findOne({
      flags: checkdata.flags,
      vendor: checkdata.vendor,
    });

    res.locals.currentUser = guest;
    next();
  } else {
    await userauth(req, res, next);
    next();
  }
};

async function userauth(req, res, next) {
  try {
    var token = req.cookies.token.token;
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    var user = await User.findOne({ _id: decoded._id }, "name _id tags");
    req.user = user;
    res.locals.currentUser = req.user;
  } catch (err) {
    console.log(err);
  }
}

exports.userauth = async (req, res, next) => {
  try {
    var token = req.cookies.token.token;
    if (!token) return res.redirect("/auth/login");
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    var user = await User.findOne({ _id: decoded._id }, "_id token name");
    req.user = user;
    res.locals.currentUser = req.user;
    next();
  } catch (err) {
    console.log(err);
  }
};
