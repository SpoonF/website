const express = require("express");
const userController = require("../controllers/user.js");
const userRouter = express.Router();

userRouter.post("/", userController.postUser);

userRouter.get("/", userController.getUsers);
userRouter.get("/:userId", userController.getUser);

userRouter.delete("/:userId", userController.deleteUser);

userRouter.put("/:userId", userController.putUser);

module.exports = userRouter;