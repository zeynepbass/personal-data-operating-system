import { beforeEach, describe, expect, it, vi } from "vitest";

import { clearDatabase, createTestUser } from "@tests/helpers/db";

import { createSession, validateSessionToken } from "../auth/session";
import { hashToken } from "../auth/tokens";
import { sendMail } from "../mail/mailer";
import { PasswordResetToken } from "../models/password-reset-token.model";

import { authenticate } from "./auth.service";
import { RESET_TOKEN_TTL_MS, createPasswordReset, resetPassword } from "./password-reset.service";

vi.mock("../mail/mailer", () => ({ sendMail: vi.fn().mockResolvedValue(undefined) }));

const NEW_PASSWORD = "brand-new-password";

beforeEach(async () => {
  await clearDatabase();
  vi.mocked(sendMail).mockClear();
});

describe("createPasswordReset", () => {
  it("returns nothing and sends no mail for an unknown email", async () => {
    await expect(createPasswordReset({ email: "ghost@example.com" })).resolves.toBeNull();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("stores a hashed token and mails a link containing the raw token", async () => {
    const { user } = await createTestUser({ email: "reset@example.com" });

    const { token } = await createPasswordReset({ email: "Reset@Example.com" });

    const stored = await PasswordResetToken.findOne({ user: user._id }).lean();
    expect(stored.tokenHash).toBe(hashToken(token));
    expect(stored.tokenHash).not.toBe(token);

    expect(sendMail).toHaveBeenCalledTimes(1);
    const mail = vi.mocked(sendMail).mock.calls[0][0];
    expect(mail.to).toBe("reset@example.com");
    expect(mail.text).toContain(`/reset-password/${token}`);
  });

  it("invalidates older tokens when a new one is requested", async () => {
    await createTestUser({ email: "reset@example.com" });

    const first = await createPasswordReset({ email: "reset@example.com" });
    await createPasswordReset({ email: "reset@example.com" });

    await expect(
      resetPassword({ token: first.token, password: NEW_PASSWORD, passwordAgain: NEW_PASSWORD }),
    ).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("escapes the user's name in the HTML mail", async () => {
    await createTestUser({ email: "xss@example.com", fullName: "<img src=x onerror=alert(1)>" });

    await createPasswordReset({ email: "xss@example.com" });

    const mail = vi.mocked(sendMail).mock.calls[0][0];
    expect(mail.html).not.toContain("<img");
  });
});

describe("resetPassword", () => {
  it("changes the password, stamps passwordChangedAt and ends every session", async () => {
    const { user, password } = await createTestUser({ email: "reset@example.com" });
    const session = await createSession(user._id, {}, new Date(Date.now() - 1000));
    const { token } = await createPasswordReset({ email: "reset@example.com" });

    await resetPassword({ token, password: NEW_PASSWORD, passwordAgain: NEW_PASSWORD });

    await expect(validateSessionToken(session.token)).resolves.toBeNull();
    await expect(authenticate({ email: "reset@example.com", password })).rejects.toMatchObject({
      code: "UNAUTHENTICATED",
    });
    await expect(
      authenticate({ email: "reset@example.com", password: NEW_PASSWORD }),
    ).resolves.toMatchObject({ email: "reset@example.com", passwordChangedAt: expect.any(String) });
  });

  it("accepts a token only once", async () => {
    await createTestUser({ email: "reset@example.com" });
    const { token } = await createPasswordReset({ email: "reset@example.com" });
    const input = { token, password: NEW_PASSWORD, passwordAgain: NEW_PASSWORD };

    await resetPassword(input);
    await expect(resetPassword(input)).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("rejects an expired token", async () => {
    await createTestUser({ email: "reset@example.com" });
    const issuedAt = new Date("2026-01-01T00:00:00Z");
    const { token } = await createPasswordReset({ email: "reset@example.com" }, { now: issuedAt });

    await expect(
      resetPassword(
        { token, password: NEW_PASSWORD, passwordAgain: NEW_PASSWORD },
        { now: new Date(issuedAt.getTime() + RESET_TOKEN_TTL_MS + 1) },
      ),
    ).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it.each([
    ["an unknown token", { token: "made-up", password: NEW_PASSWORD, passwordAgain: NEW_PASSWORD }],
    ["an empty token", { token: "", password: NEW_PASSWORD, passwordAgain: NEW_PASSWORD }],
    ["a weak password", { token: "x", password: "short", passwordAgain: "short" }],
    ["mismatched passwords", { token: "x", password: NEW_PASSWORD, passwordAgain: "other-password" }],
    ["a null body", null],
  ])("rejects %s", async (_label, input) => {
    await expect(resetPassword(input)).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("the old email-only flow can no longer change a password", async () => {
    const { password } = await createTestUser({ email: "victim@example.com" });

    await expect(
      resetPassword({ email: "victim@example.com", password: NEW_PASSWORD, passwordAgain: NEW_PASSWORD }),
    ).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(
      authenticate({ email: "victim@example.com", password }),
    ).resolves.toBeTruthy();
  });
});
