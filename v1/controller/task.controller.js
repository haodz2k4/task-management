const tasks = require("../../models/task.model");

//[GET] "/api/v1/tasks"
module.exports.index = async (req,res) =>{
    const find = {
        deleted: false
    }
    if(req.query.status){
        find.status = req.query.status
    }
    const record = await tasks.find(find);


    res.json(record);
}
//[GET] "api/v1/tasks/detail/:id"
module.exports.detail = async (req,res) =>{
    const id = req.params.id;
    const record = await tasks.findOne({
        _id: id
    })
    res.json(record)
}