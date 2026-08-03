import express from "express";
import {getGoals} from "../controllers/goal.controller.js";

const router = express.Router();

router.get("/", getGoals);

export default router;