import express from "express";

import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller.js";

const router = express.Router();

router.get("/:userId", getGoals);

router.post("/", createGoal);

router.put("/:id", updateGoal);

router.delete("/:id", deleteGoal);

export default router;
