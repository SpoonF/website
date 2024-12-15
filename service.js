const express = require('express');
const cookieParse = require('cookie-parser');

const mongoose = require("mongoose");



const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParse('alonso'));



const userRouter = require("./routes/user");

app.use("/api/v1/users", userRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});


(async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/task_manager");
        app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }
    catch(err) {
        return console.log(err);
    }
})()


process.on("SIGINT", async() =>{
    await mongoose.disconnect();
    console.log("Приложение завершило работу");
    process.exit();
})
