const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const auth = require("../middleware/auth");
const { body } = require("express-validator");
const validate = require("../middleware/validation");

router.get("/", auth, tasksController.getAllTasks);
router.get("/:id", auth, tasksController.getTaskById);

router.post(
  "/",
  auth,
  body("title").notEmpty().withMessage("Title wajib diisi"),
  validate,
  tasksController.createTask
);

router.put(
  "/:id",
  auth,
  body("title").notEmpty(),
  body("status").isIn(["pending", "completed"]),
  validate,
  tasksController.updateTask
);

router.delete("/:id", auth, tasksController.deleteTask);

module.exports = router;