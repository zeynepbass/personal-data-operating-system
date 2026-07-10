import express from "express";

import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/document.controller.js";

const router = express.Router();


router.get("/:userId", getDocuments);


router.post("/", createDocument);


router.put("/:id", updateDocument);


router.delete("/:id", deleteDocument);

export default router;