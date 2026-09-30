import "server-only";
import { createHash, randomBytes } from "node:crypto";

/** @returns {string} */
export function generateToken() {
  return randomBytes(32).toString("base64url");
}

/**
 * @param {string} token
 * @returns {string}
 */
export function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}
