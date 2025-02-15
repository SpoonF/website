const express = require('express');
const cookieParse = require('cookie-parser');
const { dbConnection, dbDisconection } = require('./database/database')

const http = require('http');
const https = require('https');



const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParse('alonso'));

app.use("/api/v1/users", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'access-control-allow-origin']);
    res.header('Access-Control-Allow-Methods', 'GET')
    next()
});

const userRouter = require("./routes/user");
const tasksRouter = require("./routes/tasks");
const tagsRouter = require("./routes/tags");
const loginRouter = require("./routes/login");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/tags", tagsRouter);
app.use("/api/v1/login", loginRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});




(async () => {
    try{
        dbConnection();
        app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }
    catch(err) {
        return console.log(err);
    }
})()




process.on("SIGINT", async() =>{
    dbDisconection();
    console.log("Приложение завершило работу");
    process.exit();
})
