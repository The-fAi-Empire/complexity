// @ts-check
import pluginQuery from "@tanstack/eslint-plugin-query";
import tseslint from "typescript-eslint";

export default tseslint.config({
  plugins: {
    "@tanstack/query": pluginQuery,
  },
  rules: {
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/infinite-query-property-order": "warn",
    "@tanstack/query/no-void-query-fn": "error",
    "@tanstack/query/no-rest-destructuring": "warn",
  },
});
