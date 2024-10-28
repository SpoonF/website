const express = require("express");
const dbconnect = require("./database");
const cookieParse = require('cookie-parser');
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;

const app = express();
const fs = require("fs");
const jsonParser = express.json();

app.use(express.static("public/html"));
app.use(express.static("public/styles"));
app.use("script",express.static("public/scripts"));
app.use(cookieParse('grishagey'));

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");

(async () => {
    try {
        await mongoClient.connect();
        app.locals.db = mongoClient.db("taskm_manager");
        app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }catch(err){
        return console.log(err);
    }
})()





app.post("/authorization", jsonParser, async(req, res) => {
    var json = [];
    
    if(!req.body) return res.json({error: "Ошибка"});

    let data = {
        login: req.body.login,
        password: req.body.pass,
        useragent: req.headers["user-agent"],
        token: req.cookies.token
    }
    const db = req.app.locals.db
    try{
        const users = db.collection("users");
        const users_token = db.collection("users_token");

        const user_data = await users_token.findOne({user_agent: data["user_agent"], token: data["token"]});
        if(user_data){
            console.log(user_data);
            console.log("Авторизация по токену прошла успешно");
            json["href"] = "/";
            res.set('connection', 'close');
            res.send(json);
        }else if(!user_data){
            const user = await users.findOne({login: data["login"], password: data["password"]});
            if(user){
                const token = createToken();
                await users_token.insertOne({user_id: user["_id"],token: token, user_agent: data["useragent"]});
                console.log("Авторизация с созданием токена прошла успещно");
                json["token"] = token;
                res.cookie("token", json['token']);
                res.set('connection', 'close');
                res.send(json);
            }else{
                console.log("Авторизация провалена");
                json["error"] = "Пользователь с такими данными не найден";
                res.set('connection', 'close');
                res.send(json);
            }
        }
        
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

process.on("SIGINT", async() =>{
    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
})
