import express from "express";
import {getMeetings,createMeeting,updateMeeting} from "../controllers/meeting.controller.js";

const router = express.Router();

router.get("/", getMeetings);
router.post("/",createMeeting)
router.put("/:id",updateMeeting)

export default router;