export const ErrorCode = Object.freeze({
  VALIDATION: "VALIDATION",
  UNAUTHENTICATED: "UNAUTHENTICATED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  RATE_LIMITED: "RATE_LIMITED",
  INTERNAL: "INTERNAL",
});

const STATUS_BY_CODE = {
  VALIDATION: 400,
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  INTERNAL: 500,
};

/**
 * @typedef {keyof typeof ErrorCode} ErrorCodeName
 * @typedef {Record<string, string[] | undefined>} FieldErrors
 */

export class AppError extends Error {
  /**
   * @param {ErrorCodeName} code
   * @param {string} message
   * @param {{ fieldErrors?: FieldErrors, cause?: unknown }} [options]
   */
  constructor(code, message, { fieldErrors, cause } = {}) {
    super(message, { cause });
    this.name = "AppError";
    this.code = code;
    this.status = STATUS_BY_CODE[code];
    this.fieldErrors = fieldErrors;
  }
}

/**
 * @param {unknown} error
 * @returns {error is AppError}
 */
export function isAppError(error) {
  return error instanceof AppError;
}
