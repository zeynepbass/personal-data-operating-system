import express from "express";
import {getMeetings,createMeeting,updateMeeting,deleteMeeting,updateTaskStatus} from "../controllers/meeting.controller.js";

const router = express.Router();

router.get("/", getMeetings);
router.post("/",createMeeting)
router.put("/:id",updateMeeting)
router.delete("/:id",deleteMeeting)
router.patch("/:id/status", updateTaskStatus);
export default router;