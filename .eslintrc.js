module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-typescript", "prettier", "prettier/react"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "react-hooks"],
  rules: {
    quotes: ["error", "double"],
    "@typescript-eslint/quotes": ["error", "double"],
    "import/extensions": "off",
    "import/no-unresolved": 0,
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 0,
    "@typescript-eslint/indent": 0,
  },
};
