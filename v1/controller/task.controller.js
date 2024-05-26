const tasks = require("../../models/task.model");

//[GET] "/api/v1/tasks"
module.exports.index = async (req,res) =>{
    const record = await tasks.find();


    res.json(record);
}