import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();

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