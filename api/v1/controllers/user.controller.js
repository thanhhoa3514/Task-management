const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const ForgotPassword = require("../models/forgot-password.model");

const generate = require("../../../helpers/generateStringRandom");
const sendMailHelpers = require("../../../helpers/sendMail");
// const authMiddleware = require("../middlewares/auth.middleware");
// [POST] /api/v1/users/register
module.exports.register = async (req, res, next) => {
  req.body.password = CryptoJS.SHA256(req.body.password).toString();
  // console.log(req.body.password);
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (!existEmail) {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      token:generate.generateStringRandom(30),
    });
    await user.save();

    const token = user.token;
    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered successfully",
      token: token,
    });
  } else {
    return res.status(400).json({
      message: "Email already exists",
    });
  }
  res.json({
    code: 200,
  });
};

// [POST] api/v1/users/login
module.exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = CryptoJS.SHA256(req.body.password).toString();

  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (user) {
    if (user.password === password) {
      const token = user.token;
      res.cookie("token", token);
      return res.status(200).json({
        message: "Login successfully",
        token: token,
      });
    } else {
      return res.status(401).json({
        message: "Wrong password",
      });
    }
  } else {
    return res.status(401).json({ message: "Email is not exist" });
  }
};

// [POST] api/v1/users/password/forgot

module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = User.findOne({ email: email, deleted: false });
  if (!user) {
    res.json({
      code: 404,
      message: "Email not found",
    });
    return;
  }

  const otp = generate.randomDigit(6);

  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now(),
  };

  // console.log(objectForgotPassword);
  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();
  const subject = "Reset Your Account Password";
  const html = `
        <div style="font-family: Arial; max-width: 600px; margin: auto;">  
            <h2>Reset Password</h2>  
            <p>Hello ${email},</p>  
            <p>You requested a password reset for your account. Please use the following OTP to reset your password:   
                <b style="color: blue;">${otp}</b>  
            </p>  
            <p>If you did not request this reset, you can safely ignore this email.Someone might have accidentally entered your email address</p>  
            <p>This OTP will expire in 3 minutes.</p>  
            <p>Thank you,<br>Your Company Support Team</p>  
        </div>
  `;

  sendMailHelpers.sendMail(email, subject, html);

  //  Send mail to the client who need to reset their password
  res.json({
    code: 200,
    message: "Forgot password request sent successfully",
    // email: email,
  });
};

//  POST /api/v1/users/password/otp

module.exports.forgotPasswordOTP = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
    // expireAt: { $gt: Date.now() }
  });

  if (!result) {
    res.json({
      code: 404,
      message: "OTP not found or expired",
    });
    return;
  }
  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  const token = user.token;
  res.cookie("token", token);
  res.json({
    code: 200,
    message: "Authentication your account successfully",
    token: token,
  });
};

// [POST] /api/v1/users/password/reset
module.exports.resetPassword = async (req, res) => {
  const token = req.body.token;
  const password = CryptoJS.SHA256(req.body.password).toString();

  const user = await User.findOne({
    token: token,
  });
  if (user) {
    await User.updateOne(
      {
        token: token,
      },
      {
        password: password,
      }
    );
    res.json({
      code: 200,
      message: "Reset password successfully",
    });
  } else {
    res.json({
      code: 404,
      message: "Token not found or expired",
    });
    return;
  }
};

// [GET] /api/v1/users/info
module.exports.info = async (req, res, next) => {
  
  res.json({
    code: 200,
    message: "User information",
    info: req.user,
  });
};
