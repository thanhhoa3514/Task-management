const Task= require("../models/task.model");


// [GET] /api/v1/tasks
module.exports.index= async (req, res, next) =>{
    const find={
        deleted:false
    }
    if(req.query.status){
       find.status=req.query.status;
        res.json(task);
    }
    const task= await Task.find(find);
    res.json(task);
}


// [GET] /api/v1/tasks/:id

module.exports.detail= async (req, res, next) =>{
    try {
        const id= req.params.id;
        const task= await Task.findOne({
            _id:id,
            deleted:false
        });
        res.json(task);
    } catch (error) {
        res.json(error);
    }
};