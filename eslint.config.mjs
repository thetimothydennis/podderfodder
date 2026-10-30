import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import prettier from "eslint-plugin-prettier";
import jest from "eslint-plugin-jest";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["**/* React dist directory", "client/dist"]), {
    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "prettier",
    )),

    plugins: {
        prettier,
        jest,
    },

    linterOptions: {
        reportUnusedDisableDirectives: true,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            ...jest.environments.globals.globals,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },

    settings: {
    },

    rules: {
        "no-console": "warn",
        "no-unused-vars": "warn",
        "no-duplicate-imports": "error",
        "no-template-curly-in-string": "warn",
        "no-use-before-define": "error",
        "arrow-body-style": "warn",
        "block-scoped-var": "warn",
        curly: "warn",
        "default-case": "warn",
        "dot-notation": "error",
        eqeqeq: "warn",

        "max-lines-per-function": ["warn", {
            max: 50,
            skipBlankLines: true,
            skipComments: true,
        }],

        "max-lines": ["warn", {
            skipBlankLines: true,
            skipComments: true,
        }],
    },
    ignores: [
        "node_modules/**",
        ".git/**",
        ".github/**"
    ]
}]);