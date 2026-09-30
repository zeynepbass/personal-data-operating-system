import "server-only";
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  tokenHash: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  expiresAt: { type: Date, required: true },
  absoluteExpiresAt: { type: Date, required: true },
  lastUsedAt: { type: Date, required: true },
  userAgent: { type: String, default: "" },
  ip: { type: String, default: "" },
  createdAt: { type: Date, required: true, default: Date.now },
});

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = mongoose.models.Session ?? mongoose.model("Session", sessionSchema);
