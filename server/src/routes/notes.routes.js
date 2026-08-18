import express from "express";

import {
  getNotes,
  createNote,
  deleteNote,
} from "../controllers/notes.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getNotes
);

router.post(
  "/",
  protect,
  createNote
);

router.delete(
  "/:id",
  protect,
  deleteNote
);

export default router;