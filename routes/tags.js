const express = require("express");
const tagsController = require("../controllers/tags.js");
const tagsRouter = express.Router();

tagsRouter.post("/", tagsController.postTag);

tagsRouter.get("/", tagsController.getTags);
tagsRouter.get("/:taskId", tagsController.getTag);

// tagsRouter.delete("/:taskId", tagsController.deleteTag);

// tagsRouter.put("/:taskId", tagsController.putTag);

module.exports = tagsRouter;