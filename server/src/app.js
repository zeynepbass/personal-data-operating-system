import express from "express";

import eventRoutes from "./routes/event.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import documentRoutes from "./routes/document.routes.js";
import goalRoutes from "./routes/goal.routes.js";

const app = express();

app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/goals", goalRoutes);

export default app;