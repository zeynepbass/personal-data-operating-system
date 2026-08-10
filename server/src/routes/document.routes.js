import express from "express";
import {getDocuments,createDocument} from "../controllers/document.controller.js";

const router = express.Router();

router.get("/", getDocuments);
router.post("/", createDocument);
export default router;