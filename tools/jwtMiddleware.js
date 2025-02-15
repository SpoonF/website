const jwt = require("jsonwebtoken");
const secret = "i'm_pretty)))";

exports.jwtMiddleware = (request, response, next) => {
    const token = request.cookies.token;

    try{
        request.user = jwt.verify(token, secret);
        next();
    } catch(err) {
        response.clearCookie("token");
        response.status(401).send('unauthorized');
    }
}