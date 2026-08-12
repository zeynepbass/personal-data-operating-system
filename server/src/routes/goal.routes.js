import express from "express";
import {getGoals,createGoal} from "../controllers/goal.controller.js";

const router = express.Router();

router.get("/", getGoals);
router.post("/", createGoal);
export default router;