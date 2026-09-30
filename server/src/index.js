import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import notesRoutes from "./routes/notes.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import documentRoutes from "./routes/document.routes.js";
import goalRoutes from "./routes/goal.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import { protect } from "./middleware/auth.middleware.js";
import { authorizeUpload } from "./middleware/upload-access.middleware.js";

const app = express();

app.disable("x-powered-by");
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  "/uploads",
  protect,
  authorizeUpload,
  express.static("uploads", {
    dotfiles: "deny",
    setHeaders: (res) => {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Content-Security-Policy", "default-src 'none'; sandbox");
    },
  })
);
app.use("/api/notes", notesRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/goals", goalRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  const status = error.status || (error.name === "MulterError" ? 400 : 500);
  return res.status(status).json({
    success: false,
    message: status === 500 ? "Beklenmeyen bir hata oluştu." : error.message,
  });
});

const PORT = process.env.PORT || 6021;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`legacy api listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("mongodb connection failed", error);
    process.exit(1);
  });
