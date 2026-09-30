import "server-only";
import { notFound } from "next/navigation";

import { isAppError } from "./errors";

/**
 * @template T
 * @param {Promise<T>} promise
 * @returns {Promise<T>}
 */
export async function orNotFound(promise) {
  try {
    return await promise;
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}
