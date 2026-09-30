import "server-only";
import bcrypt from "bcryptjs";

const COST = 12;

const DUMMY_HASH = bcrypt.hashSync("pdos-timing-equalizer", COST);

/**
 * @param {string} plain
 * @returns {Promise<string>}
 */
export function hashPassword(plain) {
  return bcrypt.hash(plain, COST);
}

/**
 * @param {string} plain
 * @param {string | null | undefined} hash
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(plain, hash) {
  if (!hash) {
    await bcrypt.compare(plain, DUMMY_HASH);
    return false;
  }
  return bcrypt.compare(plain, hash);
}

/**
 * @param {string} hash
 * @returns {boolean}
 */
export function needsRehash(hash) {
  return bcrypt.getRounds(hash) < COST;
}
