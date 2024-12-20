const Users = require("../models/user.js");
const Roles = require("../models/roles.js");

const error = [];

exports.postUser = async(request,response) => {
    const userRole = await Roles.findOne({rolename : 'User'});
    const user = {
        username: request.body.username,
        password: request.body.password,
        email: request.body.email,
        role: userRole._id,
        created_at: new Date()
    }
    const result = await Users.create(user);
    response.status(201).send({user: result});
};

exports.getUser = async(request,response) => {
    if(request.params.userId.length !== 24){
        response.status(404).send('Not found');
        return;
    }
    const result = await Users.findById(request.params.userId).exec();
    if(result === null){
        response.status(404).send('Not found');
        return;
    }
    response.status(200).send({user: result});
}

exports.getUsers = async(request,response) => {

    let result = await filter(request.query);
    

    if(result.length){
        response.status(200).send({users: result});
    }else{
        response.sendStatus(404);
    }
}

exports.deleteUser = async(request,response) => {
    if(request.params.userId.length !== 24){
        response.status(404).send('Not found');
        return;
    }
    const result = await Users.findByIdAndDelete(request.params.userId).exec();
    if(result === null){
        response.status(404).send('Not found');
        return;
    }
    response.sendStatus(204);
}

exports.putUser = async(request,response) => {
    if(request.params.userId.length !== 24){
        response.status(404).send('Not found');
        return;
    }
    let user = await Users.findByIdAndDelete(request.params.userId);
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
    const result = await Users.create(user);
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
        return await Users.find().sort(query);
    }

    return await Users.find({});
}