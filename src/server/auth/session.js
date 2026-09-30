import "server-only";

import { connectDB } from "../db/connect";
import { Session } from "../models/session.model";
import { User } from "../models/user.model";

import { generateToken, hashToken } from "./tokens";

const DAY_MS = 24 * 60 * 60 * 1000;
export const SESSION_ABSOLUTE_TTL_MS = 30 * DAY_MS;
export const SESSION_IDLE_TTL_MS = 7 * DAY_MS;
const TOUCH_INTERVAL_MS = DAY_MS;

/**
 * @typedef {{ userAgent?: string, ip?: string }} SessionMeta
 * @typedef {{ token: string, expiresAt: Date }} CreatedSession
 */

/**
 * @param {import("mongoose").Types.ObjectId | string} userId
 * @param {SessionMeta} [meta]
 * @param {Date} [now]
 * @returns {Promise<CreatedSession>}
 */
export async function createSession(userId, meta = {}, now = new Date()) {
  await connectDB();

  const token = generateToken();
  const absoluteExpiresAt = new Date(now.getTime() + SESSION_ABSOLUTE_TTL_MS);

  await Session.create({
    tokenHash: hashToken(token),
    user: userId,
    createdAt: now,
    lastUsedAt: now,
    expiresAt: new Date(now.getTime() + SESSION_IDLE_TTL_MS),
    absoluteExpiresAt,
    userAgent: meta.userAgent?.slice(0, 256) ?? "",
    ip: meta.ip ?? "",
  });

  return { token, expiresAt: absoluteExpiresAt };
}

/**
 * @param {string | undefined | null} token
 * @param {Date} [now]
 * @returns {Promise<{ sessionId: string, user: import("mongoose").HydratedDocument<any> } | null>}
 */
export async function validateSessionToken(token, now = new Date()) {
  if (!token) return null;

  await connectDB();

  const session = await Session.findOne({ tokenHash: hashToken(token) }).lean();
  if (!session || session.expiresAt <= now) return null;

  const user = await User.findById(session.user);
  if (!user) {
    await Session.deleteOne({ _id: session._id });
    return null;
  }

  if (user.passwordChangedAt && session.createdAt < user.passwordChangedAt) {
    await Session.deleteOne({ _id: session._id });
    return null;
  }

  if (now.getTime() - session.lastUsedAt.getTime() > TOUCH_INTERVAL_MS) {
    const idleExpiry = new Date(now.getTime() + SESSION_IDLE_TTL_MS);
    await Session.updateOne(
      { _id: session._id },
      {
        lastUsedAt: now,
        expiresAt: idleExpiry < session.absoluteExpiresAt ? idleExpiry : session.absoluteExpiresAt,
      },
    );
  }

  return { sessionId: String(session._id), user };
}

/**
 * @param {string | undefined | null} token
 * @returns {Promise<void>}
 */
export async function revokeSession(token) {
  if (!token) return;
  await connectDB();
  await Session.deleteOne({ tokenHash: hashToken(token) });
}

/**
 * @param {import("mongoose").Types.ObjectId | string} userId
 * @param {{ exceptSessionId?: string }} [options]
 * @returns {Promise<void>}
 */
export async function revokeUserSessions(userId, { exceptSessionId } = {}) {
  await connectDB();
  const filter = exceptSessionId ? { user: userId, _id: { $ne: exceptSessionId } } : { user: userId };
  await Session.deleteMany(filter);
}
