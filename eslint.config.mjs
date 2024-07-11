import eslintPlugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import pkg from "@eslint/js";

const { configs: eslintRecommended } = pkg;

export default [
  eslintRecommended.recommended,
  {
    files: ["src/**/*.{js,ts}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: {
        // Define Node.js and ES6 globals
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
        console: "readonly",
        exports: "readonly",
        global: "readonly",
        setImmediate: "readonly",
        clearImmediate: "readonly",
        Buffer: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": eslintPlugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error", // Treat the use of `any` as an error
      "@typescript-eslint/explicit-module-boundary-types": "error", // Enforce explicit return types on functions
    },
    ignores: ["node_modules/", "dist/"],
  },
];
