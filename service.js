const express = require("express");
const cookieParse = require('cookie-parser');
const MongoClinet = require('mongodb').MongoClient;

const app = express();

app.use(express.static("public/html"));
app.use(express.static("public/styles"));
app.use("script",express.static("public/scripts"));
app.use(express.json());
app.use(cookieParse('alonso'));

const clientDB = new MongoClinet("mongodb://127.0.0.1:27017/");
(async () => {
    try{
        await clientDB.connect();
        app.locals.users = clientDB.db("task_manager").collection("users");
        app.locals.users_token = clientDB.db("task_manager").collection("users_token");
        app.listen(3000);
        console.log("Сервер ожидает запросов");
    }catch(error){
        console.log(error)
    }

})()


const userRouter = require("./routes/user");
const homeRouter = require("./routes/home");

app.use("/users", userRouter);
app.use("/", homeRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

process.on("SIGINT", async() =>{
    // await _db.close();
    await clientDB.close();
    console.log("Приложение завершило работу");
    process.exit();
})
