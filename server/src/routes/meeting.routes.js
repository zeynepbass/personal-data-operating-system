import express from "express";

import {
  getMeetings,
  getUsers,
  createMeeting,
  updateMeeting,
  deleteMeeting,
  updateTaskStatus,
  updateTaskCompleted,
} from "../controllers/meeting.controller.js";

import {protect} from "../middleware/auth.middleware.js";
import {adminOnly} from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getMeetings
);

router.get(
  "/users",
  protect,
  adminOnly,
  getUsers
);

router.post(
  "/",
  protect,
  adminOnly,
  createMeeting
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateMeeting
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteMeeting
);

router.patch(
  "/:id/status",
  protect,
  updateTaskStatus
);

router.patch(
  "/:id/completed",
  protect,
  updateTaskCompleted
);

export default router;