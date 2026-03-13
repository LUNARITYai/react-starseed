import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  // Global ignores
  {
    ignores: ["dist/", "src/routeTree.gen.ts"],
  },

  // Base recommended rules
  eslint.configs.recommended,

  // TypeScript recommended rules (includes parser)
  ...tseslint.configs.recommended,

  // React Hooks
  reactHooks.configs.flat["recommended-latest"],

  // JSX Accessibility
  jsxA11y.flatConfigs.recommended,

  // Project-wide settings
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // TS already enforces via noUnusedLocals/noUnusedParameters
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },

  // Relaxed rules for shadcn/ui generated components
  {
    files: ["src/components/ui/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "jsx-a11y/heading-has-content": "off",
      "jsx-a11y/anchor-has-content": "off",
    },
  },

  // Prettier must be last
  eslintConfigPrettier
);
