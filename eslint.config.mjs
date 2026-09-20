// Minimal ESLint 9 flat config with TypeScript parsing only. We rely on
// `npm run typecheck` and Next.js's own build-time TS check for real type
// safety; ESLint here is only a syntax sanity net so the script exits 0
// on green code.
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,mjs,js}"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-undef": "off",
    },
  },
];
