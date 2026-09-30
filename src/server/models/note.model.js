import "server-only";
import mongoose from "mongoose";

import { NOTE_SECTION_TYPES } from "@/shared/schemas/note";

const sectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, enum: NOTE_SECTION_TYPES, default: "text" },
    content: { type: String, default: "" },
    language: { type: String, default: null },
    items: { type: [String], default: [] },
  },
  { _id: false },
);

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, required: true, trim: true },
    sections: { type: [sectionSchema], default: [] },
  },
  { timestamps: true },
);

noteSchema.index({ user: 1, createdAt: -1, _id: -1 });
noteSchema.index({ user: 1, category: 1, createdAt: -1 });

export const Note = mongoose.models.Note ?? mongoose.model("Note", noteSchema);
