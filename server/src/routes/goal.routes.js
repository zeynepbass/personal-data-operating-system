import express from "express";
import {getGoals,createGoal,deleteGoal,updateGoal} from "../controllers/goal.controller.js";

const router = express.Router();

router.get("/", getGoals);
router.post("/", createGoal);
router.delete("/:id",deleteGoal);
router.patch("/:id", updateGoal);
export default router;