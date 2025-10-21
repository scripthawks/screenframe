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
    env: {
      amd: true,
      browser: true,
      es2025: true,
      node: true,
    },
    plugins: {
      js,
      prettier: prettierPlugin,
      tseslint
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'prettier/prettier',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:prettier/recommended',
      prettierConfig
    ],
    parser: tseslint / parser,
    parserOptions: {
      project: "./tsconfig.json",
      ecmaFeatures: { "jsx": true },
      ecmaVersion: latest,
      sourceType: 'module',
    },
    overrides: [
      {
        files: ['**/*.stories.tsx'],
        rules: {
          'no-console': 'off',
          'react-hooks/rules-of-hooks': 'off',
        },
      },
    ],
    languageOptions: { globals: globals.browser },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      'arrow-parens': 'off',
      'consistent-return': 'off',
      curly: ['error', 'all'],
      'import/extensions': [
        'error',
        { css: 'always', json: 'always', scss: 'always', svg: 'always' },
      ],
      'import/no-duplicates': 'off',
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'max-lines': ['error', 300],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'off',
      'no-duplicate-imports': 'error',
      'no-empty-pattern': 'off',
      'no-nested-ternary': 'error',
      'no-undef': 'warn',
      'no-unused-vars': 'off',
      'no-var': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var'],
        },
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          'custom-groups': {
            type: {
              react: 'react',
            },
            value: {
              react: ['react', 'react-*'],
            },
          },
          groups: [
            'type',
            'react',
            'builtin',
            'external',
            'internal-type',
            'internal',
            'side-effect',
            'style',
          ],
          'newlines-between': 'always',
          order: 'asc',
          type: 'natural',
        },
      ],
      'prefer-const': 'error',
      'react/button-has-type': 'error',
      'react/display-name': 'off',
      'react/jsx-boolean-value': ['error'],
      'react/jsx-curly-brace-presence': [
        'error',
        { children: 'ignore', propElementValues: 'always', props: 'always' },
      ],
      'react/jsx-fragments': ['error'],
      'react/prop-types': 'off',
      'react/void-dom-elements-no-children': ['error'],
    },
    settings: {
    'import/parsers': {
      tseslint: ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },

    react: {
      version: 'detect',
    },
  },
    ignorePatterns: ["**/node_modules/*", "dist/*", "build", "*.html", "*.css"]
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);