const Task = require('../models/tasks');
const Tags = require('../models/tags');
const Session = require('../models/session');





exports.postTask = async( request, response ) => {
    let info = {
        taskId: "",
        tags: []
    };
    let result;
    result = await Task.createOne( request.body );
    info['taskId'] = result;
    
    if('tags' in request.body){
        for(let value of request.body['tags']){
            result = await Tags.createOne( value );
            info['tags'].push(result[0]);
        }
    }
    
    result = await Task.addTags(info['taskId']['insertId'], info['tags']);
    console.log( result );

    response.status(201).send( info );
};

exports.getTask = async( request, response ) => {
    const { userId } = request.params;
    const result = await Task.getOne( userId );

    console.log( result );

    const data = { users: result };

    response.status(200).send( data );
}

exports.getTasks = async( request, response ) => {
    const result = await Task.getAll();

    console.log( result );

    const data = { users: result };

    response.status(200).send( data );
}

exports.deleteTask = async( request, response ) => {
    const { userId } = request.params;

    const result = await Task.deleteOne( userId );

    console.log( result );

    const data = { users: result };

    response.sendStatus(204);
}

exports.putTask = async( request, response ) => {
    const { userId } = request.params;

    const result = await User.updateOne( userId, request.body );

    console.log( result );

    const data = { users: result };

    response.sendStatus(204);
}


exports.authorize = async (request, response, next) => {
    const sessionId = request.headers.cookie?.split("=")[1];

    if(!sessionId){
        return response.status(403).send('not authecation request');
    }

    let result = await Session.getSessionByToken(sessionId);

    if(Object.keys(result[0]).length) {
        next();
    }else {
        return response.status(403).send('not authecation request');
    }
}
