import { inject } from "vitest";

const base = inject("mongoUri").replace(/\/?$/, "/");
process.env.MONGODB_URI = `${base}pdos-test-${process.env.VITEST_POOL_ID ?? "0"}`;
process.env.LOG_LEVEL = "silent";
