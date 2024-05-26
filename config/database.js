const mongoose = require('mongoose');
module.exports.connect = (url) =>{
    try {
        mongoose.connect(url);
        console.log("connect database successfull")
    } catch (error) {
        console.log("connect database failed");
        console.log("error")
    }
}