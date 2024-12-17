import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    { languageOptions: { globals: globals.browser } },

    { ignores: [".node_modules/*", "dist"] },
    {
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            prettier: eslintPluginPrettier,
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            "no-unused-vars": "off",
            "prefer-const": ["warn", { ignoreReadBeforeAssign: true }],
            ...eslintConfigPrettier.rules,
            "@typescript-eslint/no-unused-vars": ["error"],
            "@typescript-eslint/no-this-alias": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
        },
    },
];
