const express = require("express");
const loginController = require("../controllers/login.js");
const { jwtMiddleware } = require("../tools/jwtMiddleware.js");
const loginRouter = express.Router();

loginRouter.post("/", loginController.login);
loginRouter.post("/out",jwtMiddleware, loginController.logout);


// tagsRouter.delete("/:taskId", tagsController.deleteTag);

// tagsRouter.put("/:taskId", tagsController.putTag);

module.exports = loginRouter;