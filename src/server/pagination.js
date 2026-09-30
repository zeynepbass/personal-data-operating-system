import mongoose from "mongoose";
import { z } from "zod";

import { AppError } from "./errors";

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export const pageQuerySchema = z.object({
  cursor: z.string().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
});

/**
 * @param {{ createdAt: Date, _id: import("mongoose").Types.ObjectId }} doc
 * @returns {string}
 */
export function encodeCursor(doc) {
  return Buffer.from(
    JSON.stringify({ t: new Date(doc.createdAt).toISOString(), id: String(doc._id) }),
  ).toString("base64url");
}

/**
 * @param {string} cursor
 * @returns {{ createdAt: Date, _id: import("mongoose").Types.ObjectId }}
 */
export function decodeCursor(cursor) {
  try {
    const { t, id } = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
    const createdAt = new Date(t);
    if (Number.isNaN(createdAt.getTime()) || !mongoose.isValidObjectId(id)) throw new Error();
    return { createdAt, _id: new mongoose.Types.ObjectId(id) };
  } catch {
    throw new AppError("VALIDATION", "Geçersiz sayfalama imleci.", {
      fieldErrors: { cursor: ["Geçersiz imleç."] },
    });
  }
}

/**
 * @template T
 * @param {import("mongoose").Model<T>} model
 * @param {Record<string, unknown>} filter
 * @param {{ cursor?: string, limit?: number }} page
 * @returns {Promise<{ items: any[], nextCursor: string | null }>}
 */
export async function paginate(model, filter, { cursor, limit = DEFAULT_PAGE_SIZE } = {}) {
  const query = { ...filter };

  if (cursor) {
    const { createdAt, _id } = decodeCursor(cursor);
    query.$or = [{ createdAt: { $lt: createdAt } }, { createdAt, _id: { $lt: _id } }];
  }

  const docs = await model
    .find(query)
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit + 1)
    .lean();

  const hasMore = docs.length > limit;
  const items = hasMore ? docs.slice(0, limit) : docs;

  return { items, nextCursor: hasMore ? encodeCursor(items[items.length - 1]) : null };
}
