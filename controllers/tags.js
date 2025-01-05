const Tags = require('../models/tags')



const error = [];

exports.postTag = async( request, response ) => {

    const result = await Tags.createOne(request.body);
    console.log(result);
    response.status(201).send(result);
};

exports.getTag = async( request, response ) => {
    const { userId } = request.params;
    const result = await Tags.getOne(userId);

    console.log(result);

    const data = {users: result};

    response.status(200).send(data);
}

exports.getTags = async( request, response ) => {
    console.log(request.query);
    const result = await Tags.getAll(request.query);

    console.log(result);

    const data = {tags: result};

    response.status(200).send(data);
}

// exports.deleteTag = async( request, response ) => {
//     const { userId } = request.params;

//     const result = await Tags.deleteOne(userId);

//     console.log(result);

//     const data = {users: result};

//     response.sendStatus(204);
// }

// exports.putTag = async( request, response ) => {
//     const { userId } = request.params;

//     const result = await Tags.updateOne(userId, request.body);

//     console.log(result);

//     const data = {users: result};

//     response.sendStatus(204);
// }
