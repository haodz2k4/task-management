const tasks = require("../../models/task.model");

//[GET] "/api/v1/tasks"
module.exports.index = async (req,res) =>{
    const find = {
        deleted: false
    }
    //filter by status
    if(req.query.status){
        find.status = req.query.status
    }
    //end filter by status 
    //pagination 
    const objectPagination = {
        limitPages: 5,
        currentPages: 0
    }
    if(req.query.pages){
        objectPagination.currentPages = parseInt(req.query.pages);
        objectPagination.skip = objectPagination.limitPages * (objectPagination.currentPages - 1);
    }
    if(req.query.limit){
        
        objectPagination.limitPages = req.query.limit;
    }
    //end pagination
    //search 
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword,"i");
        find.title = regex
    }
    //end search 
    //end search 
    //handle sorting
    const objectSorting = {};
    if(req.query.sortKey && req.query.sortValue){
        objectSorting[req.query.sortKey] = req.query.sortValue;
    }
    //end sorting 
    const record = await tasks.find(find).sort(objectSorting).limit(objectPagination.limitPages).skip(objectPagination.skip);


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
//[PATCH] "api/v1/tasks/change-status/:id"
module.exports.changeStatus = async (req,res) =>{
    const id = req.params.id;
    try {
        await tasks.updateOne({
            _id: id
        },{
            status: req.body.status
        })
        res.json({
            code: 200,
            message: "update status succesfull"
        })
    } catch (error) {
        res.json({
            code: 200,
            message: "update status failed"
        })
    }
}
//[PATCH] "api/v1/tasks/change-multi/:id"
module.exports.changeMulti = async (req,res) =>{
    const {id, status} = req.body;
    const listStatus = ["initial","doing","finish","pending","notFinish"];
    if(listStatus.includes(status)){
        await tasks.updateMany({
            _id: {$in: id}
        },{
            status: status
        })

        res.json({
            code: 200,
            status: "Thay đổi trạng thái thành công"
        })
    }else{
        res.json({
            code: 400,
            status: "Thay đổi trạng thái ko thành công "
        })
    }
}