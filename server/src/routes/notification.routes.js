import express from "express";

import {
    getNotifications
} from "../controllers/notification.controller.js";

import {protect} from "../middleware/auth.middleware.js";
const router = express.Router();
router.get(
    "/",
    protect,
    getNotifications
  );
  export default router;