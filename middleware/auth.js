const jwt = require("jsonwebtoken");

exports.checkauth = async(req, res)=>{
   if(!req.cookies.token){
      var guest = await Guest.findOne({});
      
   }
}

async function userauth() {
  try {
    
   const token = req.cookies.token.token;

    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    var user = await User.findOne({ _id: decoded._id });
    req.user = user;
    res.locals.currentUser = req.user;
    user.save();
    next();
  } catch (err) {
    console.log(err);   
  }
};
