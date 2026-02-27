// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "path";
import { fileURLToPath } from "url";

// Mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends("xo-space", "plugin:prettier/recommended"),

    plugins: {
      prettier,
    },

    rules: {
      "prettier/prettier": "error",
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
]);
