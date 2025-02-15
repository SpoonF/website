const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const secret = "i'm_pretty)))";
// Token-base
exports.login = async (request, response) => {
    const { username, password } = request.body;

    let user = await UserModel.getUser({where: { username }});
    console.log(user);
    if(user.password !== password) {
        return response.status(403).send("authentication failed");
    }
    
    const token = jwt.sign(user, secret, { expiresIn: "15m" });

    response.cookie("token", token, {
        httpOnly: true
    })
    
    return response.status(200).send('Successful authentication');

}

exports.logout = async (request, response) => {

    response.clearCookie("token");
    
    return response.status(200).send('Successful logout');

}
