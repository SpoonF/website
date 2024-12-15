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
    const result = await Users.find({});
    response.status(200).send({users: result});
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

