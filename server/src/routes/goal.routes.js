import express from "express";

import {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
} from "../controllers/goal.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getGoals
);

router.post(
  "/",
  protect,
  createGoal
);

router.delete(
  "/:id",
  protect,
  deleteGoal
);

router.patch(
  "/:id",
  protect,
  updateGoal
);

export default router;