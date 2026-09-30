import "server-only";

import { forgotPasswordSchema, resetPasswordSchema } from "@/shared/schemas/auth";

import { hashPassword } from "../auth/password";
import { revokeUserSessions } from "../auth/session";
import { generateToken, hashToken } from "../auth/tokens";
import { connectDB } from "../db/connect";
import { env } from "../env";
import { AppError } from "../errors";
import { logger } from "../logger";
import { sendMail } from "../mail/mailer";
import { PasswordResetToken } from "../models/password-reset-token.model";
import { findUserByEmail, updateUser } from "../repositories/user.repository";
import { parseInput } from "../validation";

export const RESET_TOKEN_TTL_MS = 30 * 60 * 1000;

/**
 * @param {{ fullName: string, email: string }} user
 * @param {string} link
 */
function buildResetMail(user, link) {
  return {
    to: user.email,
    subject: "PDOS şifre sıfırlama",
    text: `Merhaba ${user.fullName},\n\nŞifreni sıfırlamak için bu bağlantıyı 30 dakika içinde aç:\n${link}\n\nBu isteği sen yapmadıysan bu e-postayı yok sayabilirsin.`,
    html: `<p>Merhaba ${escapeHtml(user.fullName)},</p><p>Şifreni sıfırlamak için bu bağlantıyı 30 dakika içinde aç:</p><p><a href="${link}">Şifremi sıfırla</a></p><p>Bu isteği sen yapmadıysan bu e-postayı yok sayabilirsin.</p>`,
  };
}

/** @param {string} value */
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

/**
 * @param {unknown} input
 * @param {{ now?: Date }} [options]
 * @returns {Promise<{ token: string } | null>}
 */
export async function createPasswordReset(input, { now = new Date() } = {}) {
  const { email } = parseInput(forgotPasswordSchema, input);
  await connectDB();

  const user = await findUserByEmail(email);
  if (!user) return null;

  await PasswordResetToken.deleteMany({ user: user._id });

  const token = generateToken();
  await PasswordResetToken.create({
    tokenHash: hashToken(token),
    user: user._id,
    createdAt: now,
    expiresAt: new Date(now.getTime() + RESET_TOKEN_TTL_MS),
  });

  const link = new URL(`/reset-password/${token}`, env.APP_URL).toString();
  sendMail(buildResetMail(user, link)).catch((err) => {
    logger.error({ err, userId: String(user._id) }, "password reset mail failed");
  });

  return { token };
}

/**
 * @param {unknown} input
 * @param {{ now?: Date }} [options]
 */
export async function resetPassword(input, { now = new Date() } = {}) {
  const { token, password } = parseInput(resetPasswordSchema, input);
  await connectDB();

  const record = await PasswordResetToken.findOneAndUpdate(
    { tokenHash: hashToken(token), usedAt: null, expiresAt: { $gt: now } },
    { usedAt: now },
    { returnDocument: "after" },
  );

  if (!record) {
    throw new AppError(
      "VALIDATION",
      "Bağlantı geçersiz veya süresi dolmuş. Lütfen yeni bir bağlantı isteyin.",
    );
  }

  await updateUser(String(record.user), {
    password: await hashPassword(password),
    passwordChangedAt: now,
  });
  await PasswordResetToken.deleteMany({ user: record.user, _id: { $ne: record._id } });
  await revokeUserSessions(record.user);
}
