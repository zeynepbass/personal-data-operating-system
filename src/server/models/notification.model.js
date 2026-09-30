import "server-only";
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", default: null },
    meeting: { type: mongoose.Schema.Types.ObjectId, ref: "Meeting", default: null },
    type: { type: String, enum: ["task-assigned"], default: "task-assigned" },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

notificationSchema.index({ user: 1, createdAt: -1, _id: -1 });
notificationSchema.index({ task: 1 });

export const Notification =
  mongoose.models.Notification ?? mongoose.model("Notification", notificationSchema);
