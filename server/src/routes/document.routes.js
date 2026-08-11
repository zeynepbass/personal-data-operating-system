import express from "express";
import {getDocuments,createDocument,deletedDocument} from "../controllers/document.controller.js";
import upload from "../../middleware/upload.js";
const router = express.Router();

router.get("/", getDocuments);
router.post(
  "/",
  upload.single("pdf"),
  createDocument
);
router.delete("/:id", deletedDocument);
export default router;