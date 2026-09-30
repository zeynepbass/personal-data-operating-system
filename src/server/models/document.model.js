import "server-only";
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, default: "pdf" },
    color: { type: String, default: "" },
    file: { type: mongoose.Schema.Types.ObjectId, default: null },
    pdf: { type: String, default: null },
    sizeBytes: { type: Number, default: 0 },
    size: { type: String, default: null },
    favorite: { type: Boolean, default: false },
    shared: { type: Boolean, default: false },
  },
  { timestamps: true },
);

documentSchema.index({ user: 1, createdAt: -1, _id: -1 });
documentSchema.index({ shared: 1, createdAt: -1, _id: -1 });

export const Document = mongoose.models.Document ?? mongoose.model("Document", documentSchema);
