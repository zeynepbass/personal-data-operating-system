import express from "express";
import {getGoals,createGoal,deleteGoal} from "../controllers/goal.controller.js";

const router = express.Router();

router.get("/", getGoals);
router.post("/", createGoal);
router.delete("/:id",deleteGoal)
export default router;