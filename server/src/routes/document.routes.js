
import express from "express";

import {
  getDocuments,
  createDocument,
  deletedDocument
} from "../controllers/document.controller.js";

import upload from "../middleware/upload.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getDocuments
);

router.post(
  "/",
  protect,
  upload.single("pdf"),
  createDocument
);

router.delete(
  "/:id",
  protect,
  deletedDocument
);

export default router;