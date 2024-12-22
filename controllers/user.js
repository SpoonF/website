const User = require('../models/user')



const error = [];

exports.postUser = async(request,response) => {

    const result = await User.createOne(request.body);
    console.log(result);
    response.status(201).send(result);
};

exports.getUser = async(request,response) => {
    const { userId } = request.params;
    const result = await User.getOne(userId);

    console.log(result);

    const data = {users: result};

    response.status(200).send(data);
}

exports.getUsers = async(request,response) => {
    const result = await User.getAll();

    console.log(result);

    const data = {users: result};

    response.status(200).send(data);
}

exports.deleteUser = async(request,response) => {
    const { userId } = request.params;

    const result = await User.deleteOne(userId);

    console.log(result);

    const data = {users: result};

    response.sendStatus(204);
}

exports.putUser = async(request,response) => {
    const { userId } = request.params;

    const result = await User.updateOne(userId, request.body);

    console.log(result);

    const data = {users: result};

    response.sendStatus(204);
}
