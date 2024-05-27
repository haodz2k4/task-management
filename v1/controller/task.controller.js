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
    const {id, type} = req.body;

    switch(type){
        case 'initial-multi':
            await tasks.updateMany({
                _id: {$in: id}
            },{
                status: "initial"
            })
    
            res.json({
                code: 200,
                status: "Thay đổi trạng thái thành công"
            })
            break;
        case 'doing-multi':
            await tasks.updateMany({
                _id: {$in: id}
            },{
                status: "doing"
            })
    
            res.json({
                code: 200,
                status: "Thay đổi trạng thái thành công"
            })
            break;
        case 'finish-multi':
            await tasks.updateMany({
                _id: {$in: id}
            },{
                status: "finish"
            })
    
            res.json({
                code: 200,
                status: "Thay đổi trạng thái thành công"
            })
            break;
        case 'pending-multi':
            await tasks.updateMany({
                _id: {$in: id}
            },{
                status: "finish"
            })
    
            res.json({
                code: 200,
                status: "Thay đổi trạng thái thành công"
            })
            break;
        case 'notFinish-multi':
            await tasks.updateMany({
                _id: {$in: id}
            },{
                status: "notFinish"
            })
    
            res.json({
                code: 200,
                status: "Thay đổi trạng thái thành công"
            })
            break;
        case 'delete-multi':
            await tasks.updateMany({
                _id: {$in: id}
            },{
                deleted: true
            })
    
            res.json({
                code: 200,
                status: "Xóa nhiệm vụ thành công"
            })
            break;
        
        
        
    }
    
}
//[POST] "api/v1/tasks/add"
module.exports.add = async (req,res) =>{
    try {
        const record = new tasks(req.body);
        await record.save();

        res.json({
            code: 200,
            message: "add tasks successfull"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "add tasks failed"
        })
    }
}
//[PATCH] "api/v1/tasks/edit/:id"
module.exports.edit = async (req,res) =>{
    try {
        await tasks.updateOne({_id: req.params.id},req.body);

        res.json({
            code: 200,
            message: "Chỉnh sửa thành công"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Chỉnh sửa thất bại"
        })
    }
}
//[PATCH] " api/v1/tasks/deletes/:id"
module.exports.deleted = async (req,res) =>{
    try {
        await tasks.updateOne({
            _id: req.params.id
        },{
            deleted: true
        })
        res.json({
            code: 200,
            messgae: "deleted successfull"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "deleted failed"
        })
    }
}
