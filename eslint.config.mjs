import js from "@eslint/js";
import globals from "globals";
import tseslint, { parser } from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    parser: tseslint / parser,
    parserOptions: {
      project: "./tsconfig.json",
      ecmaFeatures: { "jsx": true },
      ecmaVersion: latest
    },
    plugins: {
      js,
      prettier: prettierPlugin,
      tseslint
    },
    extends: [
      "js/recommended",
      "next/core-web-vatals",
      prettierConfig
    ],
    languageOptions: { globals: globals.browser },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      'no-console': 'warn',
      'eqeqeq': 'warn',
      'curly': 'warn',
      'no-else-return': 'warn'
    },
    ignorePatterns: ["**/node_modules/*", "dist/*", "build", "*.html", "*.css"]
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);