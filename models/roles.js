const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;
// установка схемы
const rolesScheme = new Schema({
    rolename: String
});
module.exports = mongoose.model("Roles", rolesScheme);