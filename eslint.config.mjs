import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

const asWarnings = (rules) =>
  Object.fromEntries(Object.entries(rules).map(([name]) => [name, "warn"]));

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    name: "pdos/base",
    settings: {
      "import/resolver": {
        typescript: { project: "./jsconfig.json" },
        node: true,
      },
    },
    rules: {
      ...asWarnings(jsxA11y.flatConfigs.recommended.rules),
      ...asWarnings(importPlugin.flatConfigs.recommended.rules),
      "import/no-unresolved": "error",
      "import/no-cycle": "warn",
      "import/no-duplicates": "error",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [{ pattern: "@/**", group: "internal" }],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", ignoreRestSiblings: true }],
      eqeqeq: ["error", "smart"],
    },
  },
  {
    name: "pdos/client-boundary",
    files: [
      "src/**/components/**/*.js",
      "src/**/hooks/**/*.js",
      "src/shared/store/**/*.js",
      "src/providers/**/*.js",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/server", "@/server/*"],
              message: "Client code must not import server modules. Use a Server Action instead.",
            },
          ],
        },
      ],
    },
  },
  {
    name: "pdos/server",
    files: ["src/server/**/*.js"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-console": "error",
    },
  },
  {
    name: "pdos/tests",
    files: ["**/*.test.js", "tests/**/*.js"],
    languageOptions: { globals: globals.node },
  },
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "coverage/**", "server/**"]),
]);

export default eslintConfig;
