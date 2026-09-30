import { beforeEach, describe, expect, it } from "vitest";

import { clearDatabase } from "@tests/helpers/db";

import { assertWithinLimit, consume, resetLimit } from "./rate-limit";

const rule = { limit: 3, windowMs: 60_000 };

beforeEach(async () => {
  await clearDatabase();
});

describe("rate limiter", () => {
  it("allows requests up to the limit and blocks the next one", async () => {
    const now = new Date("2026-01-01T00:00:00Z");
    const results = [];
    for (let i = 0; i < 4; i += 1) results.push(await consume("login:ip:a", rule, now));

    expect(results.map((r) => r.allowed)).toEqual([true, true, true, false]);
    expect(results[3].retryAfterMs).toBe(60_000);
  });

  it("starts a new window once the previous one expires", async () => {
    const start = new Date("2026-01-01T00:00:00Z");
    for (let i = 0; i < 4; i += 1) await consume("k", rule, start);

    const later = new Date(start.getTime() + rule.windowMs + 1);
    await expect(consume("k", rule, later)).resolves.toMatchObject({ allowed: true, remaining: 2 });
  });

  it("tracks keys independently", async () => {
    const now = new Date();
    for (let i = 0; i < 4; i += 1) await consume("a", rule, now);

    await expect(consume("b", rule, now)).resolves.toMatchObject({ allowed: true });
  });

  it("counts concurrent requests atomically", async () => {
    const now = new Date();
    const results = await Promise.all(
      Array.from({ length: 10 }, () => consume("burst", rule, now)),
    );

    expect(results.filter((r) => r.allowed)).toHaveLength(3);
  });

  it("throws RATE_LIMITED once exhausted and can be reset", async () => {
    for (let i = 0; i < 3; i += 1) await assertWithinLimit("r", rule);
    await expect(assertWithinLimit("r", rule)).rejects.toMatchObject({ code: "RATE_LIMITED" });

    await resetLimit("r");
    await expect(assertWithinLimit("r", rule)).resolves.toBeUndefined();
  });
});
