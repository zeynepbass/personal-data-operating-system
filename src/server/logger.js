import "server-only";
import pino from "pino";

import { env } from "./env";

export const logger = pino({
  level: env.LOG_LEVEL,
  base: { service: "pdos" },
  redact: {
    paths: ["password", "*.password", "token", "*.token", "headers.cookie", "headers.authorization"],
    censor: "[redacted]",
  },
});
