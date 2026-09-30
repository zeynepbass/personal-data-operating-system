import "server-only";
import mongoose from "mongoose";

import { connectDB } from "../db/connect";
import { Note } from "../models/note.model";
import { paginate } from "../pagination";

/** @param {string} value */
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * @param {import("mongoose").Types.ObjectId} userId
 * @param {{ category?: string, q?: string }} filters
 * @param {{ cursor?: string, limit?: number }} page
 */
export async function findNotesByUser(userId, { category, q } = {}, page = {}) {
  await connectDB();
  const filter = { user: userId };
  if (category) filter.category = category;
  if (q) filter.title = { $regex: escapeRegex(q), $options: "i" };
  return paginate(Note, filter, page);
}

/**
 * @param {string} id
 * @param {import("mongoose").Types.ObjectId} userId
 */
export async function findNoteForUser(id, userId) {
  await connectDB();
  if (!mongoose.isValidObjectId(id)) return null;
  return Note.findOne({ _id: id, user: userId }).lean();
}

/**
 * @param {import("mongoose").Types.ObjectId} userId
 * @param {Record<string, unknown>} data
 */
export async function insertNote(userId, data) {
  await connectDB();
  const note = await Note.create({ ...data, user: userId });
  return note.toObject();
}

/**
 * @param {string} id
 * @param {import("mongoose").Types.ObjectId} userId
 * @param {Record<string, unknown>} data
 */
export async function updateNoteForUser(id, userId, data) {
  await connectDB();
  if (!mongoose.isValidObjectId(id)) return null;
  return Note.findOneAndUpdate({ _id: id, user: userId }, data, {
    returnDocument: "after",
    runValidators: true,
  }).lean();
}

/**
 * @param {string} id
 * @param {import("mongoose").Types.ObjectId} userId
 */
export async function deleteNoteForUser(id, userId) {
  await connectDB();
  if (!mongoose.isValidObjectId(id)) return null;
  return Note.findOneAndDelete({ _id: id, user: userId }).lean();
}
