//require model here
const user = require("../../models/user.model");

module.exports.requireAuth = async (req,res, next) =>{
    if(!req.headers.authorization){
        res.status(400).json({success: false, message: "Vui lòng gửi kèm token"});
        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    const infoUser = await user.findOne({
        deleted: false,
        token: token

    })
    if(!infoUser){
        res.status(400).json({success: false, messgae: "token không hợp lệ"});
        return;
    }

    res.locals.infoUser = infoUser;
    next();
    
}