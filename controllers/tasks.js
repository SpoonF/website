const Tasks = require("../models/tasks.js");
const TaskTypes = require("../models/tasks_types.js");

exports.postTask = async(request,response) => {
    const taskType = await TaskTypes.findOne({rolename : 'User'});
    const task = {
        username: request.body.username,
        password: request.body.password,
        email: request.body.email,
        role: taskType._id,
        created_at: new Date()
    }
    const result = await Tasks.create(task);
    response.status(201).send({task: result});
};

exports.getTask = async(request,response) => {
    if(request.params.userId.length !== 24){
        response.status(404).send('Not found');
        return;
    }
    const result = await Tasks.findById(request.params.userId).exec();
    if(result === null){
        response.status(404).send('Not found');
        return;
    }
    response.status(200).send({user: result});
}

exports.getTasks = async(request,response) => {

    let result = await filter(request.query);
    

    if(result.length){
        response.status(200).send({users: result});
    }else{
        response.sendStatus(404);
    }
}

exports.deleteTask = async(request,response) => {
    if(request.params.taskId.length !== 24){
        response.status(404).send('Not found');
        return;
    }
    const result = await Tasks.findByIdAndDelete(request.params.taskId).exec();
    if(result === null){
        response.status(404).send('Not found');
        return;
    }
    response.sendStatus(204);
}

exports.putTask = async(request,response) => {
    if(request.params.taskId.length !== 24){
        response.status(404).send('Not found');
        return;
    }
    let user = await Tasks.findByIdAndDelete(request.params.taskId);
    if(user === null){
        response.status(404).send('Not found');
        return;
    }
    user = {
        ...user._doc,
        username: request.body.username,
        password: request.body.password,
        email: request.body.email,
        update_at: new Date()
    }
    const result = await Tasks.create(user);
    response.sendStatus(204);
}

async function filter(params){
    if(params.orderby){
        const orderby = {
            "ASC": 1,
            "DESC": -1
        }
        
        let query = params.orderby;
        let key = Object.keys(query)[0];
        query[key] = orderby[query[key]];
        return await Tasks.find().sort(query);
    }

    return await Tasks.find({});
}