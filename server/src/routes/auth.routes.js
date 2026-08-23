import express from "express";
import upload from "../middleware/auth.upload.js";
import {
  register,
  login,
  forgotPassword,
  updateProfile
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put(
  "/:id/profile",
  upload.single("profileImage"),
  updateProfile
);
export default router;