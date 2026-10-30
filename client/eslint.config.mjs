import { defineConfig } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import eslintReact from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";

import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
  // Start with the eslint-plugin-react
  {
    files: ["**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}"],
    extends: [
      eslintReact.configs["recommended-typescript"],
    ],
    plugins: {"react-hooks": reactHooks},
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/config': 'error',
        'react-hooks/error-boundaries': 'error',
        'react-hooks/gating': 'error',
        'react-hooks/globals': 'error',
        'react-hooks/immutability': 'error',
        'react-hooks/preserve-manual-memoization': 'error',
        'react-hooks/purity': 'error',
        'react-hooks/refs': 'error',
        'react-hooks/set-state-in-effect': 'error',
        'react-hooks/set-state-in-render': 'error',
        'react-hooks/static-components': 'error',
        'react-hooks/unsupported-syntax': 'warn',
        'react-hooks/use-memo': 'error',
        'react-hooks/incompatible-library': 'warn',
    },
    ignores: [
        "dist/**",
        "node_modules/**"
    ]
  },
]);