const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;
// установка схемы
const tasksScheme = new Schema({
    tasktype: String,
    userid: String,
    taskdata: String
});
module.exports = mongoose.model("Tasks", tasksScheme);