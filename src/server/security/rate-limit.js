import "server-only";

import { connectDB } from "../db/connect";
import { AppError } from "../errors";
import { RateLimit } from "../models/rate-limit.model";

export const LIMITS = Object.freeze({
  login: { limit: 5, windowMs: 15 * 60 * 1000 },
  register: { limit: 5, windowMs: 60 * 60 * 1000 },
  passwordReset: { limit: 3, windowMs: 60 * 60 * 1000 },
});

/**
 * @param {string} key
 * @param {{ limit: number, windowMs: number }} rule
 * @param {Date} [now]
 * @returns {Promise<{ allowed: boolean, remaining: number, retryAfterMs: number }>}
 */
export async function consume(key, { limit, windowMs }, now = new Date()) {
  await connectDB();

  const active = { $gt: ["$expiresAt", now] };
  const doc = await RateLimit.findOneAndUpdate(
    { key },
    [
      {
        $set: {
          count: { $cond: [active, { $add: ["$count", 1] }, 1] },
          expiresAt: { $cond: [active, "$expiresAt", new Date(now.getTime() + windowMs)] },
        },
      },
    ],
    { upsert: true, new: true, updatePipeline: true },
  ).lean();

  return {
    allowed: doc.count <= limit,
    remaining: Math.max(0, limit - doc.count),
    retryAfterMs: Math.max(0, doc.expiresAt.getTime() - now.getTime()),
  };
}

/**
 * @param {string} key
 * @param {{ limit: number, windowMs: number }} rule
 */
export async function assertWithinLimit(key, rule) {
  const result = await consume(key, rule);
  if (!result.allowed) {
    const minutes = Math.max(1, Math.ceil(result.retryAfterMs / 60000));
    throw new AppError(
      "RATE_LIMITED",
      `Çok fazla deneme yapıldı. Lütfen ${minutes} dakika sonra tekrar deneyin.`,
    );
  }
}

/** @param {string} key */
export async function resetLimit(key) {
  await connectDB();
  await RateLimit.deleteOne({ key });
}
