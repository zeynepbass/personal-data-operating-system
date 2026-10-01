import { beforeEach, describe, expect, it } from "vitest";

import { clearDatabase, createTestUser } from "@tests/helpers/db";

import { Session } from "../models/session.model";
import { User } from "../models/user.model";

import {
  SESSION_ABSOLUTE_TTL_MS,
  SESSION_IDLE_TTL_MS,
  createSession,
  revokeSession,
  revokeUserSessions,
  validateSessionToken,
} from "./session";
import { hashToken } from "./tokens";

const DAY = 24 * 60 * 60 * 1000;

beforeEach(async () => {
  await clearDatabase();
});

describe("sessions", () => {
  it("stores only a hash of the token", async () => {
    const { user } = await createTestUser();
    const { token } = await createSession(user._id);

    const stored = await Session.findOne({ user: user._id }).lean();
    expect(stored.tokenHash).toBe(hashToken(token));
    expect(JSON.stringify(stored)).not.toContain(token);
  });

  it("resolves a valid token to its user", async () => {
    const { user } = await createTestUser();
    const { token } = await createSession(user._id);

    const result = await validateSessionToken(token);
    expect(String(result.user._id)).toBe(String(user._id));
  });

  it("rejects missing, unknown and malformed tokens", async () => {
    await expect(validateSessionToken(undefined)).resolves.toBeNull();
    await expect(validateSessionToken("")).resolves.toBeNull();
    await expect(validateSessionToken("not-a-real-token")).resolves.toBeNull();
  });

  it("expires after the idle timeout", async () => {
    const { user } = await createTestUser();
    const start = new Date("2026-01-01T00:00:00Z");
    const { token } = await createSession(user._id, {}, start);

    const afterIdle = new Date(start.getTime() + SESSION_IDLE_TTL_MS + 1);
    await expect(validateSessionToken(token, afterIdle)).resolves.toBeNull();
  });

  it("slides the idle window but never past the absolute lifetime", async () => {
    const { user } = await createTestUser();
    const start = new Date("2026-01-01T00:00:00Z");
    const { token } = await createSession(user._id, {}, start);

    let now = start;
    for (let day = 0; day < 29; day += 5) {
      now = new Date(start.getTime() + day * DAY);
      await expect(validateSessionToken(token, now)).resolves.not.toBeNull();
    }

    const pastAbsolute = new Date(start.getTime() + SESSION_ABSOLUTE_TTL_MS + 1);
    await expect(validateSessionToken(token, pastAbsolute)).resolves.toBeNull();
  });

  it("rejects sessions created before the password was changed", async () => {
    const { user } = await createTestUser();
    const { token } = await createSession(user._id, {}, new Date(Date.now() - 1000));

    await User.updateOne({ _id: user._id }, { passwordChangedAt: new Date() });

    await expect(validateSessionToken(token)).resolves.toBeNull();
    await expect(Session.countDocuments({ user: user._id })).resolves.toBe(0);
  });

  it("rejects sessions of deleted users", async () => {
    const { user } = await createTestUser();
    const { token } = await createSession(user._id);
    await User.deleteOne({ _id: user._id });

    await expect(validateSessionToken(token)).resolves.toBeNull();
  });

  it("revokes a single session on logout", async () => {
    const { user } = await createTestUser();
    const first = await createSession(user._id);
    const second = await createSession(user._id);

    await revokeSession(first.token);

    await expect(validateSessionToken(first.token)).resolves.toBeNull();
    await expect(validateSessionToken(second.token)).resolves.not.toBeNull();
  });

  it("revokes every session of a user", async () => {
    const { user } = await createTestUser();
    const { user: other } = await createTestUser();
    const mine = await createSession(user._id);
    const theirs = await createSession(other._id);

    await revokeUserSessions(user._id);

    await expect(validateSessionToken(mine.token)).resolves.toBeNull();
    await expect(validateSessionToken(theirs.token)).resolves.not.toBeNull();
  });

  it("issues a fresh token for every login", async () => {
    const { user } = await createTestUser();
    const first = await createSession(user._id);
    const second = await createSession(user._id);

    expect(first.token).not.toBe(second.token);
  });
});
