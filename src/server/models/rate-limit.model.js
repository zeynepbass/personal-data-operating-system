import "server-only";
import mongoose from "mongoose";

const rateLimitSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
});

rateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RateLimit =
  mongoose.models.RateLimit ?? mongoose.model("RateLimit", rateLimitSchema, "rate_limits");
