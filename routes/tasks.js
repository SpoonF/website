const express = require("express");
const tasksController = require("../controllers/tasks.js");
const tasksRouter = express.Router();

tasksRouter.post("/", tasksController.postUser);

tasksRouter.get("/", tasksController.getTasks);
tasksRouter.get("/:taskId", tasksController.getTask);

tasksRouter.delete("/:taskId", tasksController.deleteTask);

tasksRouter.put("/:taskId", tasksController.putTask);

module.exports = tasksRouter;