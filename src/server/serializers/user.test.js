import { describe, expect, it } from "vitest";

import { toPublicUser } from "./user";

describe("toPublicUser", () => {
  it("keeps only whitelisted fields", () => {
    const result = toPublicUser({
      _id: "507f1f77bcf86cd799439011",
      fullName: "Ada",
      email: "ada@example.com",
      role: "user",
      password: "$2b$12$hash",
      __v: 3,
      resetToken: "secret",
      passwordChangedAt: new Date("2026-01-02T03:04:05Z"),
    });

    expect(result).toEqual({
      id: "507f1f77bcf86cd799439011",
      fullName: "Ada",
      email: "ada@example.com",
      role: "user",
      about: "",
      profileImage: "",
      passwordChangedAt: "2026-01-02T03:04:05.000Z",
    });
  });

  it("returns null for a missing user", () => {
    expect(toPublicUser(null)).toBeNull();
    expect(toPublicUser(undefined)).toBeNull();
  });
});
