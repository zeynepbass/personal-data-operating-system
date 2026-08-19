import express from "express";

import {
  getGoalCategories,
  createGoalCategory,
  deleteGoalCategory,
} from "../controllers/goalCategory.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getGoalCategories
);

router.post(
  "/",
  protect,
  createGoalCategory
);

router.delete(
  "/:id",
  protect,
  deleteGoalCategory
);

export default router;
