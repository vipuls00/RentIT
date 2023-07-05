const jwt = require("jsonwebtoken");
const User = require("../models/register");


const authenticate = async (req, res, next) => {
  
  try {
    const token =await req.cookies.userToken;
    const verifyToken = jwt.verify(token,"This is my secret key now it should work");
    
    const rootUser = await User.findOne({ _id: verifyToken._id });
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (err) {
    res.json({ error: err.message });
    console.log(err);
  }
};

module.exports = authenticate;
