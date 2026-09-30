"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { runAction } from "@/server/action";
import { deleteSessionCookie, getRequestMeta, readSessionToken, setSessionCookie } from "@/server/auth/cookies";
import { requireUser } from "@/server/auth/dal";
import { createSession, revokeSession } from "@/server/auth/session";
import { logger } from "@/server/logger";
import { assertWithinLimit, LIMITS, resetLimit } from "@/server/security/rate-limit";
import * as authService from "@/server/services/auth.service";
import { createPasswordReset, resetPassword } from "@/server/services/password-reset.service";
import { parseInput } from "@/server/validation";
import { forgotPasswordSchema } from "@/shared/schemas/auth";

/**
 * @param {string} userId
 */
async function startSession(userId) {
  const meta = await getRequestMeta();
  const { token, expiresAt } = await createSession(userId, meta);
  await setSessionCookie(token, expiresAt);
}

/** @param {unknown} value */
function normalizeEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

/** @param {unknown} value */
function safeRedirectPath(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }
  return value;
}

/** @param {unknown} input */
export async function loginAction(input) {
  const result = await runAction(async () => {
    const { ip } = await getRequestMeta();
    const key = `login:${ip}:${normalizeEmail(input?.email)}`;
    await assertWithinLimit(key, LIMITS.login);

    const user = await authService.authenticate(input);
    await resetLimit(key);
    await startSession(user.id);
    return user;
  });

  if (result.ok) redirect(safeRedirectPath(input?.next));
  return result;
}

/** @param {unknown} input */
export async function registerAction(input) {
  const result = await runAction(async () => {
    const { ip } = await getRequestMeta();
    await assertWithinLimit(`register:${ip}`, LIMITS.register);

    const user = await authService.register(input);
    await startSession(user.id);
    return user;
  });

  if (result.ok) redirect("/dashboard");
  return result;
}

export async function logoutAction() {
  await revokeSession(await readSessionToken());
  await deleteSessionCookie();
  redirect("/login");
}

/** @param {FormData} formData */
export async function updateProfileAction(formData) {
  return runAction(async () => {
    const actor = await requireUser();
    const image = formData.get("profileImage");
    const avatar =
      image instanceof File && image.size > 0
        ? { data: new Uint8Array(await image.arrayBuffer()), name: image.name }
        : null;

    const user = await authService.updateProfile(
      actor,
      {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        about: formData.get("about") ?? "",
        currentPassword: formData.get("currentPassword") || undefined,
      },
      { avatar },
    );

    revalidatePath("/", "layout");
    return user;
  });
}

/** @param {unknown} input */
export async function deleteAccountAction(input) {
  const result = await runAction(async () => {
    const actor = await requireUser();
    await authService.deleteAccount(actor, input);
  });

  if (result.ok) {
    await deleteSessionCookie();
    redirect("/login");
  }
  return result;
}

/** @param {unknown} input */
export async function requestPasswordResetAction(input) {
  return runAction(async () => {
    const { email } = parseInput(forgotPasswordSchema, input);
    const { ip } = await getRequestMeta();
    await assertWithinLimit(`password-reset:${ip}`, LIMITS.passwordReset);

    after(() =>
      createPasswordReset({ email }).catch((err) => {
        logger.error({ err }, "password reset request failed");
      }),
    );

    return { message: "Bu e-posta kayıtlıysa şifre sıfırlama bağlantısı gönderildi." };
  });
}

/** @param {unknown} input */
export async function resetPasswordAction(input) {
  const result = await runAction(async () => {
    await resetPassword(input);
  });

  if (result.ok) {
    await deleteSessionCookie();
    redirect("/login?reset=1");
  }
  return result;
}
