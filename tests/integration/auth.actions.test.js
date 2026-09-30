import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  deleteAccountAction,
  loginAction,
  logoutAction,
  registerAction,
  requestPasswordResetAction,
  updateProfileAction,
} from "@/features/auth/actions/auth.actions";
import { createNoteAction } from "@/features/notes/actions/note.actions";
import { getCurrentUser } from "@/server/auth/dal";
import { sendMail } from "@/server/mail/mailer";
import { clearDatabase, createTestUser } from "@tests/helpers/db";
import {
  catchRedirect,
  flushAfter,
  nextCacheMock,
  nextHeadersMock,
  nextNavigationMock,
  nextServerMock,
  requestState,
  resetRequestState,
} from "@tests/helpers/next";

vi.mock("next/headers", async () => (await import("@tests/helpers/next")).nextHeadersMock());
vi.mock("next/navigation", async () => (await import("@tests/helpers/next")).nextNavigationMock());
vi.mock("next/server", async () => (await import("@tests/helpers/next")).nextServerMock());
vi.mock("next/cache", async () => (await import("@tests/helpers/next")).nextCacheMock());
vi.mock("@/server/mail/mailer", () => ({ sendMail: vi.fn().mockResolvedValue(undefined) }));

const SESSION = "pdos_session";

const registration = {
  fullName: "Grace Hopper",
  email: "grace@example.com",
  password: "cobol-forever",
  passwordAgain: "cobol-forever",
};

beforeEach(async () => {
  await clearDatabase();
  resetRequestState();
  vi.mocked(sendMail).mockClear();
});

describe("auth server actions", () => {
  it("registers, sets a hardened session cookie and resolves the current user", async () => {
    const target = await catchRedirect(registerAction(registration));

    expect(target).toBe("/dashboard");
    expect(requestState.cookies.get(SESSION)).toMatch(/^[\w-]{43}$/);
    expect(requestState.cookieOptions.get(SESSION)).toMatchObject({
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    const user = await getCurrentUser();
    expect(user.email).toBe("grace@example.com");
  });

  it("returns field errors instead of throwing for invalid input", async () => {
    const result = await registerAction({ ...registration, passwordAgain: "different" });

    expect(result).toMatchObject({ ok: false, code: "VALIDATION" });
    expect(result.fieldErrors.passwordAgain).toBeDefined();
    expect(requestState.cookies.has(SESSION)).toBe(false);
  });

  it("does not follow open redirects after login", async () => {
    const { password, user } = await createTestUser();

    await expect(
      catchRedirect(loginAction({ email: user.email, password, next: "//evil.example" })),
    ).resolves.toBe("/dashboard");
    await expect(
      catchRedirect(loginAction({ email: user.email, password, next: "/notes?x=1" })),
    ).resolves.toBe("/notes?x=1");
  });

  it("rate limits repeated failed logins even when the password is finally right", async () => {
    const { user, password } = await createTestUser();

    for (let i = 0; i < 5; i += 1) {
      const result = await loginAction({ email: user.email, password: "wrong-password" });
      expect(result.code).toBe("UNAUTHENTICATED");
    }

    const blocked = await loginAction({ email: user.email, password });
    expect(blocked).toMatchObject({ ok: false, code: "RATE_LIMITED" });

    resetRequestState({ ip: "198.51.100.7" });
    await expect(catchRedirect(loginAction({ email: user.email, password }))).resolves.toBe(
      "/dashboard",
    );
  });

  it("logout revokes the session server-side", async () => {
    await catchRedirect(registerAction(registration));
    const token = requestState.cookies.get(SESSION);

    await catchRedirect(logoutAction());
    expect(requestState.cookies.has(SESSION)).toBe(false);

    requestState.cookies.set(SESSION, token);
    await expect(getCurrentUser()).resolves.toBeNull();
  });

  it("answers password reset requests identically for known and unknown emails", async () => {
    await createTestUser({ email: "known@example.com" });

    const known = await requestPasswordResetAction({ email: "known@example.com" });
    const unknown = await requestPasswordResetAction({ email: "unknown@example.com" });
    await flushAfter();

    expect(known).toEqual(unknown);
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it("requires a session for protected actions", async () => {
    const note = {
      title: "t",
      description: "d",
      category: "c",
      subCategory: "s",
    };

    await expect(createNoteAction(note)).resolves.toMatchObject({
      ok: false,
      code: "UNAUTHENTICATED",
    });

    await catchRedirect(registerAction(registration));
    await expect(createNoteAction(note)).resolves.toMatchObject({ ok: true });
  });

  it("updates the profile from form data and deletes the account with the password", async () => {
    await catchRedirect(registerAction(registration));

    const form = new FormData();
    form.set("fullName", "Rear Admiral Hopper");
    form.set("email", registration.email);
    form.set("about", "Compiler pioneer");
    await expect(updateProfileAction(form)).resolves.toMatchObject({
      ok: true,
      data: { fullName: "Rear Admiral Hopper", about: "Compiler pioneer" },
    });

    await expect(deleteAccountAction({ password: "nope" })).resolves.toMatchObject({ ok: false });
    await expect(
      catchRedirect(deleteAccountAction({ password: registration.password })),
    ).resolves.toBe("/login");
    await expect(getCurrentUser()).resolves.toBeNull();
  });
});
