import express from "express";

import {
  getNotes,
  createNote,
} from "../controllers/notes.controller.js";

const router = express.Router();

router.get("/", getNotes);
router.post("/", createNote);

export default router;