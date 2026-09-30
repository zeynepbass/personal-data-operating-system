import bcrypt from "bcryptjs";
import { describe, expect, it } from "vitest";

import { hashPassword, needsRehash, verifyPassword } from "./password";

describe("password hashing", () => {
  it("verifies the original password and rejects others", async () => {
    const hash = await hashPassword("s3cret-pass");

    expect(hash).not.toContain("s3cret-pass");
    await expect(verifyPassword("s3cret-pass", hash)).resolves.toBe(true);
    await expect(verifyPassword("wrong-pass", hash)).resolves.toBe(false);
  });

  it("returns false instead of throwing when there is no stored hash", async () => {
    await expect(verifyPassword("anything", null)).resolves.toBe(false);
    await expect(verifyPassword("anything", undefined)).resolves.toBe(false);
  });

  it("flags legacy low-cost hashes for rehashing", async () => {
    const legacy = await bcrypt.hash("s3cret-pass", 10);
    const current = await hashPassword("s3cret-pass");

    expect(needsRehash(legacy)).toBe(true);
    expect(needsRehash(current)).toBe(false);
  });
});
