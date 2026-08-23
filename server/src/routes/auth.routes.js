import express from "express";

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
router.put("/:id/profile", updateProfile);
export default router;