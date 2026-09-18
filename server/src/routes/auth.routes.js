import express from "express";
import upload from "../middleware/auth.upload.js";
import { protect } from "../middleware/auth.middleware.js";
import {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  updateProfile,
  getPasswordInfo,
  deleteAccount
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getMe);
router.post("/forgot-password", forgotPassword);
router.put(
  "/:id/profile",
  protect,
  upload.single("profileImage"),
  updateProfile
);
router.get(
  "/:id/password-info",
  protect,
  getPasswordInfo
);
router.delete("/:id", protect, deleteAccount);
export default router;
