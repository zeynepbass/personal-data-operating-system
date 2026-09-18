import "dotenv/config";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import notesRoutes from "./routes/notes.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import documentRoutes from "./routes/document.routes.js";
import goalRoutes from "./routes/goal.routes.js";
import authRouter from "./routes/auth.routes.js"
import notificationRoutes from "./routes/notification.routes.js"
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRouter);
app.use("/api/meetings", meetingRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/goals", goalRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {})
  .catch(() => {});


const PORT = process.env.PORT || 6021;

app.listen(PORT, () => {});