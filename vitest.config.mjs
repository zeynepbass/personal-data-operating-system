import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const src = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": src,
      "server-only": fileURLToPath(new URL("./tests/setup/server-only.js", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.js", "tests/**/*.test.js"],
    globalSetup: ["tests/setup/mongo.global.js"],
    setupFiles: ["tests/setup/env.js"],
    restoreMocks: true,
  },
});
