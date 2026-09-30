import "server-only";
import mongoose from "mongoose";

import { connectDB } from "../db/connect";
import { Document } from "../models/document.model";
import { paginate } from "../pagination";

/** @param {string} value */
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * @param {import("mongoose").Types.ObjectId} userId
 * @param {{ q?: string }} filters
 * @param {{ cursor?: string, limit?: number }} page
 */
export async function findVisibleDocuments(userId, { q } = {}, page = {}) {
  await connectDB();
  const filter = { $and: [{ $or: [{ user: userId }, { shared: true }] }] };
  if (q) filter.$and.push({ name: { $regex: escapeRegex(q), $options: "i" } });
  return paginate(Document, filter, page);
}

/** @param {Record<string, unknown>} data */
export async function insertDocument(data) {
  await connectDB();
  const document = await Document.create(data);
  return document.toObject();
}

/** @param {string} id */
export async function findDocumentById(id) {
  await connectDB();
  if (!mongoose.isValidObjectId(id)) return null;
  return Document.findById(id).lean();
}

/** @param {string} id */
export async function deleteDocumentById(id) {
  await connectDB();
  await Document.deleteOne({ _id: id });
}
