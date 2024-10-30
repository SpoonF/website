const User = require("../models/user.js");

exports.addUser = async(request,response) => {
    console.log(request.body);
    let user = new User(request.body.login, request.body.password);
    try{
        await user.create(request.app.locals.user);
    }catch(error){
        console.log(error);
    }
    response.json({message: "User creation succes"});
};
exports.getUsers = (request, response) => {
    response.send("Список пользователей");
};