const mongoose = require("mongoose");
const {Schema} = mongoose;
const forgotPass = new Schema({
    email: String,
    otp: String,
    expireAt: {type: Date, expires: 0}
},{
    timestamps: true
})
module.exports = mongoose.model("forgot-password",forgotPass,"forgot-password");