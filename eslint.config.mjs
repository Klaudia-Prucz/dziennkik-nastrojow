import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginTestingLibrary from 'eslint-plugin-testing-library';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
      react: pluginReact,
    },
    extends: ['js/recommended'],
  },

  // TypeScript + React
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // Testing Library - tylko dla testów
  {
    files: ['**/__tests__/**/*.ts', '**/*.test.ts', '**/*.test.tsx'],
    plugins: {
      'testing-library': pluginTestingLibrary,
    },
    rules: {
      ...pluginTestingLibrary.configs['react-native'].rules,
    },
  },

  // Prettier na końcu
  {
    rules: {
      ...prettier,
    },
  },
]);
