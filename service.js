const express = require('express');
const cookieParse = require('cookie-parser');
const { dbConnection, dbDisconection } = require('./database/database')




const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParse('alonso'));



const userRouter = require("./routes/user");
const tasksRouter = require("./routes/tasks");
const tagsRouter = require("./routes/tags");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/tags", tagsRouter);

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
