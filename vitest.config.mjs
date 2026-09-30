import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const resolvePath = (relative) => fileURLToPath(new URL(relative, import.meta.url));

const alias = {
  "@": resolvePath("./src"),
  "@tests": resolvePath("./tests"),
  "server-only": resolvePath("./tests/setup/server-only.js"),
};

export default defineConfig({
  plugins: [react()],
  oxc: {
    include: /\/(src|tests)\/.*\.js$/,
    lang: "jsx",
    jsx: { runtime: "automatic" },
  },
  resolve: { alias },
  test: {
    restoreMocks: true,
    coverage: {
      provider: "v8",
      include: ["src/server/**/*.js", "src/shared/**/*.js", "src/features/**/*.js"],
      exclude: ["**/*.test.js", "src/server/models/**", "**/index.js"],
      reporter: ["text-summary", "html", "json-summary"],
    },
    projects: [
      {
        extends: true,
        test: {
          name: "server",
          environment: "node",
          testTimeout: 20_000,
          include: [
            "src/server/**/*.test.js",
            "src/*.test.js",
            "src/app/**/*.test.js",
            "src/shared/schemas/**/*.test.js",
            "tests/**/*.test.js",
          ],
          globalSetup: ["tests/setup/mongo.global.js"],
          setupFiles: ["tests/setup/env.js"],
        },
      },
      {
        extends: true,
        test: {
          name: "ui",
          environment: "jsdom",
          include: [
            "src/features/**/*.test.js",
            "src/shared/components/**/*.test.js",
            "src/shared/helpers/**/*.test.js",
          ],
          setupFiles: ["tests/setup/dom.js"],
        },
      },
    ],
  },
});
