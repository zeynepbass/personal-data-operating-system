import express from "express";

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Documents" }));

export default router;