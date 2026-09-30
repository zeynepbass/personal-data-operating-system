import { describe, expect, it } from "vitest";

import { loginSchema, passwordSchema, profileSchema, registerSchema } from "./auth";

describe("auth schemas", () => {
  it("normalizes email casing and whitespace", () => {
    expect(loginSchema.parse({ email: "  Foo@Bar.COM ", password: "x" }).email).toBe("foo@bar.com");
  });

  it("enforces the password length in characters and bytes", () => {
    expect(passwordSchema.safeParse("1234567").success).toBe(false);
    expect(passwordSchema.safeParse("12345678").success).toBe(true);
    expect(passwordSchema.safeParse("a".repeat(72)).success).toBe(true);
    expect(passwordSchema.safeParse("ğ".repeat(37)).success).toBe(false);
  });

  it("reports mismatched passwords on the confirmation field", () => {
    const result = registerSchema.safeParse({
      fullName: "Ada",
      email: "ada@example.com",
      password: "long-enough",
      passwordAgain: "different!",
    });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].path).toEqual(["passwordAgain"]);
  });

  it.each([null, undefined, 42, "string", []])("rejects %j as login input", (input) => {
    expect(loginSchema.safeParse(input).success).toBe(false);
  });

  it("strips unknown keys such as role", () => {
    const parsed = profileSchema.parse({
      fullName: "Ada",
      email: "ada@example.com",
      role: "admin",
    });
    expect(parsed).not.toHaveProperty("role");
    expect(parsed.about).toBe("");
  });
});
