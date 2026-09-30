import "server-only";
import { cookies, headers } from "next/headers";

import { SESSION_COOKIE } from "./cookie-name";

/**
 * @param {string} token
 * @param {Date} expiresAt
 */
export async function setSessionCookie(token, expiresAt) {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function deleteSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** @returns {Promise<string | undefined>} */
export async function readSessionToken() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value;
}

/** @returns {Promise<{ ip: string, userAgent: string }>} */
export async function getRequestMeta() {
  const list = await headers();
  const forwarded = list.get("x-forwarded-for")?.split(",")[0]?.trim();
  return {
    ip: forwarded || list.get("x-real-ip") || "unknown",
    userAgent: list.get("user-agent") ?? "",
  };
}
