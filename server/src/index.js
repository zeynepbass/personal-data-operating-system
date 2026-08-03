import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import eventRoutes from "./routes/event.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import documentRoutes from "./routes/document.routes.js";
import goalRoutes from "./routes/goal.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/goals", goalRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Server
const PORT = process.env.PORT || 6021;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});