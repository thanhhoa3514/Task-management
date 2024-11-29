const express = require("express");

const router=express.Router();

const controller=require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/register",controller.register);
router.post("/login",controller.login);
router.post("/password/forgot",controller.forgotPassword);
router.post("/password/otp",controller.forgotPasswordOTP);
router.post("/password/reset",controller.resetPassword);
router.get("/info",authMiddleware.requireAuth,controller.info);
router.get("/list-user",authMiddleware.requireAuth,controller.listUser);









module.exports = router;