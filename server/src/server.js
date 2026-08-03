import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.listen(process.env.PORT || 6021, () => {
  console.log("Server running");
});