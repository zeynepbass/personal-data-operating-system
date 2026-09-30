import "server-only";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  MONGODB_URI: z
    .string({ error: "is required" })
    .regex(/^mongodb(\+srv)?:\/\//, "must be a mongodb:// or mongodb+srv:// connection string"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
});

/**
 * @typedef {z.infer<typeof envSchema>} Env
 */

/**
 * @param {Record<string, string | undefined>} source
 * @returns {Env}
 */
export function parseEnv(source) {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(`Invalid environment variables:\n${problems}`);
  }

  return result.data;
}

/** @type {Env} */
export const env = process.env.SKIP_ENV_VALIDATION
  ? /** @type {Env} */ (/** @type {unknown} */ (process.env))
  : parseEnv(process.env);
