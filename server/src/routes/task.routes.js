import express from "express";

import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();


router.get("/:userId", getTasks);


router.get("/task/:id", getTaskById);


router.post("/", createTask);


router.put("/:id", updateTask);


router.delete("/:id", deleteTask);

export default router;