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

const buildTimeSchema = envSchema.extend({ MONGODB_URI: z.string().optional() });

/**
 * @param {Record<string, string | undefined>} source
 * @param {{ skipRequired?: boolean }} [options]
 * @returns {Env}
 */
export function parseEnv(source, { skipRequired = false } = {}) {
  const schema = skipRequired ? buildTimeSchema : envSchema;
  const result = schema.safeParse(source);

  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(`Invalid environment variables:\n${problems}`);
  }

  return result.data;
}

/** @type {Env} */
export const env = parseEnv(process.env, {
  skipRequired: Boolean(process.env.SKIP_ENV_VALIDATION),
});
