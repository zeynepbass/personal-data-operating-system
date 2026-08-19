import express from "express";

import {
  getMeetings,
  getUsers,
  createMeeting,
  updateMeeting,
  updateMeetingDetails,
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
  createMeeting
);

router.put(
  "/:id",
  protect,
  updateMeeting
);

router.put(
  "/:id/details",
  protect,
  updateMeetingDetails
);

router.delete(
  "/:id",
  protect,
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