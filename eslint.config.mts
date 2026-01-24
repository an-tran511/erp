import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Root ESLint configuration for the entire monorepo.
 * Apps can extend this config.
 */
export default defineConfig([
  // Global ignores - applies to all files
  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.vite/**',
    '**/.next/**',
    '**/coverage/**',
    '**/*.min.js',
    '**/pnpm-lock.yaml',
    '**/package-lock.json',
    '**/yarn.lock',
  ]),
  // Base JavaScript recommended rules
  js.configs.recommended,
  // Config files - exclude from type checking
  {
    files: ['**/eslint.config.*'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: null,
      },
    },
  },
  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,
  // Prettier config - disables ESLint rules that conflict with Prettier
  prettier,
]);
