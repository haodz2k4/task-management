const express = require("express");
const router = express.Router();
const controller= require("../controller/user.controller");
//require validate here
const userValidate = require("../validates/user.validate");
router.post("/register",userValidate.register,controller.register);
router.post("/login",controller.login);
router.post("/password/forgot",controller.passwordForgot);
router.post("/password/otp",controller.passwordOtp);

module.exports = router;