import "server-only";
import mongoose from "mongoose";

const passwordResetTokenSchema = new mongoose.Schema({
  tokenHash: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  expiresAt: { type: Date, required: true },
  usedAt: { type: Date, default: null },
  createdAt: { type: Date, required: true, default: Date.now },
});

passwordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const PasswordResetToken =
  mongoose.models.PasswordResetToken ??
  mongoose.model("PasswordResetToken", passwordResetTokenSchema, "password_reset_tokens");
