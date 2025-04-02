import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
  prettier,
]);
