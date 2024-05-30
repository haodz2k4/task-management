//require model here
const user = require("../../models/user.model");
const forgotPassword = require("../../models/forgot-password.model");
const md5 = require('md5');
//require helper here
const generateHelper = require("../../helpers/generate.helper");
const sendMailHelper = require("../../helpers/sendEmail.helper");
//[POST] "/api/v1/users/register"
module.exports.register = async (req,res) =>{
    req.body.password = md5(req.body.password)
    req.body.token = generateHelper.generateString(30);
    try {
        const newUser = new user(req.body);
        await newUser.save();
        res.json({
            code: 200,
            message: "Register succesfull"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Register failed"
        })
    }

    
}
//[POST] "/api/v1/users/login"
module.exports.login = async (req,res) =>{
    const isExistsUser = await user.findOne({deleted: false, email: req.body.email});
    console.log(isExistsUser);
    if(isExistsUser == null){
        res.json({
            code: 400,
            message: "Email không tồn tại"
        })
        return;
    }
    if(md5(req.body.password) != isExistsUser.password){
        res.json({
            code: 400,
            message: "Password không tồn tại"
        })
        return;
    }
    const token = isExistsUser.token;

    res.json({
        code: 200,
            message: "Đăng nhập thành công",
            token: token
    })
}
//[POST] "/api/v1/users/password/forgot"
module.exports.passwordForgot = async (req,res) =>{
    const emailIsExists = await user.findOne({
        email: req.body.email
    });
    
    if(!emailIsExists){
        res.json({
            code: 400,
            message: "Email không tồn tại"
        })
        return;
    }
    
    const otp = generateHelper.generateRandomNumber(6);
    //save otp to database 
    const newForgotPass = new forgotPassword({
        email: req.body.email,
        otp: otp,
        expireAt: Date.now() + 3*60*1000
    })
    await newForgotPass.save();
    sendMailHelper(req.body.email,"Mã OTP của bạn là: "," Đây là mã OTP của bạn vui lòng không được chia sẽ cho người khác: "+otp);

    res.json({
        code: 200,
        message: "Gửi mã OTP thành công"
    })


}
//[POST] "/api/v1/users/password/otp"
module.exports.passwordOtp = async (req,res) =>{
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await forgotPassword.findOne({
        email: email,
        otp: otp
    })
    if(!result){
        res.status(400).json({success: false, message: "Mã otp không hợp lệ"})
        return;
    }
    const infoUser = await user.findOne({
        email: req.body.email
    })

    res.status(200).json({success: true, message: "Mã otp hợp lệ", token: infoUser.token})


}
