const express = require("express");
const userController = require("../controllers/user.js");
const userRouter = express.Router();

userRouter.post("/create", userController.addUser);
userRouter.use("/", userController.getUsers);

module.exports = userRouter;