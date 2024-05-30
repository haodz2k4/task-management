//require model 
const user = require("../../models/user.model");

module.exports.register = async (req,res,next) =>{

    if(req.body.fullName.length < 6){
        res.json({
            code: 400,
            message: "Họ và tên phải từ 5 ký tự trở lên"
        })
        return;
    }
    const isExistsEmail = await user.findOne({
        email: req.body.email
    })
    if(isExistsEmail){
        res.json({
            code: 400,
            message: "Email đã tồn tại"
        })
        return;
    }

    next();
}
