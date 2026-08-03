import express from "express";
import {getDocuments} from "../controllers/document.controller.js";

const router = express.Router();

router.get("/", getDocuments);

export default router;