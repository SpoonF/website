const http = require("http");
const os = require("os");
const fs = require("fs");
// const db = require("./database");
// const {datee, printMassage} = require("./database");
// const User = require("./user.js");

// const sergey = new User("Сергей", "sergey@mail.ruina");

// sergey.printUserInfo();

// console.log("username: ", username);

// const db_connection = db.connectDB(userName);





// var massage = "This page not found :}";

// fs.readFile("./index.html",function(error, data){
//     if(error){
//         massage = error;
//     }else{
//         massage = data.toString();
//     }
// })



// http.createServer(function(request, response){
//     // console.log(massage);
//     response.end(massage);

// }).listen(3000,"127.0.0.1", function(){
//     console.log("Сервер начал прослушивание запросов на порту 3000");
// });

// const lodash = require("lodash");

// const people = ["Tom", "Sam", "Babay"];
// const employees = ["Tom", "Babay", "Miky"];

// const result1 = lodash.union(people, employees);
// console.log(result1);

// const result2 = lodash.intersection(people, employees);
// console.log(result2);

// const express = require("express");

// const app = express();

// // устанавливаем обработчик для маршрута "/"
// app.get("/", function(_, response){
//     consile.log("hello world :3");
//     response.end("hello world :3");
// })

// app.listen(3000, function(){
//     console.log("Сервер принимает запросы по адресу http://localhost:3000");
// })



const EventEmitter = require("events");


const emitter = new EventEmitter();




const eventName = "greet";

emitter.on(eventName, function(){
    console.log("New World");
})
emitter.on(eventName, function(){
    console.log("New World!");
})
emitter.on(eventName, function(data){
    console.log(data);
})

class User extends EventEmitter {
    constructor(username){
        super();
        this.name = username;
    }
    sayHi(){
        console.log("Привет. Меня зовут ", this.name);
        this.emit(eventName, this.name);
    }

    listenMassage(massage, document){
        const wS = fs.createWriteStream(document);
        wS.write(massage);
        wS.end(":)");
    }
    sayMassage(document){
        const rS = fs.createReadStream(document);
        rS.on("data", function(chunk){
            console.log(chunk.toString());
        })
    }
}
const tom = new User("Trom0");

tom.on(eventName, function(username){
    console.log("Привет,", username);
})
const document = "text.txt";

const document_2 = "3.txt";
const message = "Знаешь чувство будто забуксовал, \nГде-то свернул не туда и путь стал замысловат\n";

tom.sayHi();

tom.listenMassage(message, document);

tom.sayMassage(document);



