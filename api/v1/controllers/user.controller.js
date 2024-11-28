const User = require("../models/user.model");
const CryptoJS = require("crypto-js");

// [POST] /api/v1/users/register
module.exports.register = async (req, res, next) => {
  req.body.password = CryptoJS.SHA256(req.body.password).toString();
  // console.log(req.body.password);
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });

  if(!existEmail){
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
  
    });
    await user.save();

    const token= user.token;
    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered successfully",
      token:token
    });
  }else{
    return res.status(400).json({
      message: "Email already exists",
    });
  }
  res.json({
    code: 200,
  });
};
