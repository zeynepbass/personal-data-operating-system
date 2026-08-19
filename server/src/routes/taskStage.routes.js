import express from "express";

import {
  getTaskStages,
  createTaskStage,
  deleteTaskStage,
} from "../controllers/taskStage.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getTaskStages
);

router.post(
  "/",
  protect,
  createTaskStage
);

router.delete(
  "/:id",
  protect,
  deleteTaskStage
);

export default router;
