import "server-only";
import mongoose from "mongoose";

import { TASK_PRIORITIES, TASK_STATUSES } from "@/shared/schemas/task";

const taskSchema = new mongoose.Schema(
  {
    meeting: { type: mongoose.Schema.Types.ObjectId, ref: "Meeting", required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    legacyId: { type: String, default: null },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    label: { type: String, default: "" },
    priority: { type: String, enum: TASK_PRIORITIES, default: "medium" },
    status: { type: String, enum: TASK_STATUSES, default: "todo" },
    date: { type: Date, default: null },
    startDate: { type: Date, default: null },
    dueDate: { type: Date, default: null },
    estimatedHours: { type: Number, default: 0, min: 0 },
    spentHours: { type: Number, default: 0, min: 0 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    storyPoints: { type: Number, default: 0, min: 0 },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

taskSchema.index({ assignee: 1, status: 1, date: 1 });
taskSchema.index({ meeting: 1 });
taskSchema.index({ legacyId: 1 }, { sparse: true });

export const Task = mongoose.models.Task ?? mongoose.model("Task", taskSchema);
