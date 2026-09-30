import "server-only";
import { unstable_rethrow } from "next/navigation";

import { isAppError } from "./errors";
import { logger } from "./logger";

/**
 * @template T
 * @typedef {{ ok: true, data: T, error?: undefined, fieldErrors?: undefined }
 *   | { ok: false, data?: undefined, error: string, code: string, fieldErrors?: import("./errors").FieldErrors }} ActionResult
 */

/**
 * @template T
 * @param {() => Promise<T>} handler
 * @returns {Promise<ActionResult<T>>}
 */
export async function runAction(handler) {
  try {
    const data = await handler();
    return { ok: true, data };
  } catch (error) {
    unstable_rethrow(error);

    if (isAppError(error)) {
      return {
        ok: false,
        code: error.code,
        error: error.message,
        fieldErrors: error.fieldErrors,
      };
    }

    logger.error({ err: error }, "server action failed");
    return { ok: false, code: "INTERNAL", error: "Beklenmeyen bir hata oluştu." };
  }
}
