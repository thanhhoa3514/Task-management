const User = require("../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ error: "You must be logged in to access this route" });
  } else {
    // const decodedToken=jwt.verify(token, process.env.JWT_SECRET);
    // if(!decodedToken){
    //     return res.status(403).json({error: 'Access denied'});
    // }
    // req.user=decodedToken.user;
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({ token: token, deleted: false }).select("-password");
    if(!user){

        return res.status(403).json({ error: 'Access denied' });
    }
    req.user = user;
    next();
  }
  // console.log(token);
  // console.log(req.headers.authorization)

};
