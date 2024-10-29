const express = require("express");
const db = require("./database");
const cookieParse = require('cookie-parser');


const app = express();
const fs = require("fs");
const jsonParser = express.json();

app.use(express.static("public/html"));
app.use(express.static("public/styles"));
app.use("script",express.static("public/scripts"));
app.use(cookieParse('grishagey'));


const _db = new db();
_db.connection();



app.post("/authorization", jsonParser, async(request, response) => {
    if(request.body.login == "" && request.body.password == ""){
        response.json({error: "Введите данные"});
    }

    let data = {
        login: request.body.login,
        password: request.body.pass,
        useragent: request.headers["user-agent"],
        token: request.cookies.token
    }

    await _db.authorizationUser(data, (result) => {
        if(result["token"]){
            response.cookie("token",result["token"]);
        }
        response.json(result);
    })
})
app.listen(3000);
process.on("SIGINT", async() =>{
    await _db.close();
    console.log("Приложение завершило работу");
    process.exit();
})
