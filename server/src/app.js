import express from "express";
import cors from "cors";
import morgan from "morgan";

import taskRoutes from "./routes/task.routes.js";
import goalRoutes from "./routes/goal.routes.js";
import documentRoutes from "./routes/document.routes.js";
import profileRoutes from "./routes/profile.routes.js";


const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/uploads", express.static("src/uploads"));
app.use("/api/profile", profileRoutes);
app.use("/api/tasks", taskRoutes);

app.use("/api/goals", goalRoutes);

app.use("/api/documents", documentRoutes);

export default app;