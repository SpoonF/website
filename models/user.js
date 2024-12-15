const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;

const usersScheme = new Schema({
    username: String,
    password: String,
    email: String,
    role: String,
    created_at: Date,
    update_at: Date,
});
module.exports = mongoose.model("Users", usersScheme);