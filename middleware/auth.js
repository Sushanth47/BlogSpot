const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.checkauth = async (req, res) => {
  if (!req.cookies.token) {
    const si = require("systeminformation");

    // promises style - new since version 3
    var checkdata = { flags: "", vendor: "" };
    await si
      .cpu()
      .then(
        (data) => (checkdata.flags = data.flags),
        (checkdata.vendor = data.vendor)
      )
      .catch((error) => console.error(error));
    var guest = await Guest.findOne({
      flags: checkdata.flags,
      vendor: checkdata.vendor,
    });
    req.user = guest;
    res.locals.currentUser = req.user;
    next();
  } else {
    await userauth();
    next();
  }
};

async function userauth() {
  try {
    const token = req.cookies.token.token;

    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    var user = await User.findOne({ _id: decoded._id });
    req.user = user;
    res.locals.currentUser = req.user;
    //  user.save();
    // next();
  } catch (err) {
    console.log(err);
  }
}
