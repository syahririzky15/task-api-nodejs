const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const auth = require("../middleware/auth");

router.get("/", auth, tasksController.getAllTasks);
router.get("/:id", auth, tasksController.getTaskById);
router.post("/", auth, tasksController.createTask);
router.put("/:id", auth, tasksController.updateTask);
router.delete("/:id", auth, tasksController.deleteTask);

module.exports = router;