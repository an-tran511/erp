import rootConfig from '../../eslint.config.mts';
import { defineConfig } from 'eslint/config';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  ...rootConfig,
  // Set tsconfigRootDir for TypeScript files in this app
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
]);
