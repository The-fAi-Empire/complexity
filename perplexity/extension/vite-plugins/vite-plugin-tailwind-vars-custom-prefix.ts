import type { Plugin } from "vite";

const tailwindVarsCustomPrefix = (): Plugin => {
  const replaceTailwindVars = (code: string): string => {
    return code.replace(/--tw-/g, "--x-");
  };

  return {
    name: "vite-plugin-custom-tailwind-vars-prefix",
    transform(code, id) {
      if (
        id.includes(".css") ||
        id.includes("?inline") ||
        id.includes("tailwind")
      ) {
        return {
          code: replaceTailwindVars(code),
          map: null,
        };
      }
    },
    generateBundle(_options, bundle) {
      for (const fileName in bundle) {
        const asset = bundle[fileName];
        if (
          asset &&
          asset.type === "asset" &&
          fileName.endsWith(".css") &&
          typeof asset["source"] === "string"
        ) {
          asset["source"] = replaceTailwindVars(asset["source"]);
        }
      }
    },
  };
};

export default tailwindVarsCustomPrefix;
