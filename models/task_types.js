const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;

const tasktypesScheme = new Schema({
    tasktype: String
});
module.exports = mongoose.model("TaskTypes", tasktypesScheme);