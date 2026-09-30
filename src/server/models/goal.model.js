import "server-only";
import mongoose from "mongoose";

import { GOAL_STATUSES } from "@/shared/schemas/goal";

const goalItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    value: { type: Number, default: 0, min: 0, max: 100 },
  },
  { _id: false },
);

const goalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: GOAL_STATUSES, default: "active" },
    category: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    items: { type: [goalItemSchema], default: [] },
  },
  { timestamps: true },
);

goalSchema.index({ user: 1, createdAt: -1, _id: -1 });
goalSchema.index({ user: 1, status: 1, createdAt: -1 });

export const Goal = mongoose.models.Goal ?? mongoose.model("Goal", goalSchema);
