const express = require("express");
const tasksController = require("../controllers/tasks.js");
const { jwtMiddleware } = require("../tools/jwtMiddleware.js");
const tasksRouter = express.Router();

// tasksRouter.use("/", tasksController.authorize);

tasksRouter.post("/", jwtMiddleware, tasksController.postTask);

tasksRouter.get("/", jwtMiddleware, tasksController.getTasks);
tasksRouter.get("/:taskId", jwtMiddleware, tasksController.getTask);

tasksRouter.delete("/:taskId", jwtMiddleware, tasksController.deleteTask);

tasksRouter.put("/:taskId", jwtMiddleware, tasksController.putTask);

module.exports = tasksRouter;