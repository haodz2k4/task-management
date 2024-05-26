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