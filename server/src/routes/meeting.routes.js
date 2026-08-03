import express from "express";
import {getMeetings} from "../controllers/meeting.controller.js";

const router = express.Router();

router.get("/", getMeetings);

export default router;