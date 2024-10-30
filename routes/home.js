const express = require("express");
const homeController = require("../controllers/user.js");
const homeRouter = express.Router();

homeRouter.get("/create", homeController.addUser);
homeRouter.get("/", homeController.getUsers);

module.exports = homeRouter;