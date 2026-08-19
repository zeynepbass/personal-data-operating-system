import "dotenv/config";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import notesRoutes from "./routes/notes.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import documentRoutes from "./routes/document.routes.js";
import goalRoutes from "./routes/goal.routes.js";
import goalCategoryRoutes from "./routes/goalCategory.routes.js";
import taskStageRoutes from "./routes/taskStage.routes.js";
import authRouter from "./routes/auth.routes.js"
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRouter);
app.use("/api/meetings", meetingRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/goal-categories", goalCategoryRoutes);
app.use("/api/task-stages", taskStageRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


const PORT = process.env.PORT || 6021;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});