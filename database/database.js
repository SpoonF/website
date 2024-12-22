const mysql = require("mysql2");


const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "taskmanager",
    password: "123456"
}).promise();
const dbConnection = () => {
    connection.connect((error) => {
        if(error){
            return console.log("Ошибка: " + error.message)
        }
        console.log("Подключение к базе данных произошло успешно")
    })
}
const dbDisconection = () => {
    connection.end((err) => {
        if (err) {
          return console.log("Ошибка: " + err.message);
        }
        console.log("Подключение закрыто");
    });
}

module.exports = { dbConnection, dbDisconection, connection };
