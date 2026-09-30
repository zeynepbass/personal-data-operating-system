import { z } from "zod";

import { AppError } from "./errors";

/**
 * @template {z.ZodType} T
 * @param {T} schema
 * @param {unknown} input
 * @returns {z.output<T>}
 */
export function parseInput(schema, input) {
  const result = schema.safeParse(input);

  if (!result.success) {
    throw new AppError("VALIDATION", "Lütfen formdaki hataları düzeltin.", {
      fieldErrors: z.flattenError(result.error).fieldErrors,
    });
  }

  return result.data;
}
