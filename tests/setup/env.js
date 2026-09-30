import { inject } from "vitest";

process.env.MONGODB_URI = inject("mongoUri");
process.env.LOG_LEVEL = "silent";
