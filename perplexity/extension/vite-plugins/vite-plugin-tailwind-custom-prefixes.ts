import type { Plugin } from "vite";
import postcss from "postcss";

// @ts-expect-error
import postcssPrefixKeyframe from "postcss-prefix-keyframe";

export default function vitePluginTailwindCustomPrefixes(): Plugin {
  const transformCode = async (code: string): Promise<string> => {
    const keyframeProcessor = postcss([
      postcssPrefixKeyframe({ prefix: "x-" }),
    ]);
    const result = await keyframeProcessor.process(code, { from: undefined });

    let css = result.css;
    css = css.replace(/--tw-/g, "--x-");

    return css;
  };

  return {
    name: "vite-plugin-tailwind-custom-prefixes",
    async transform(code, id) {
      if (
        (id.endsWith(".css") || id.includes(".css?")) &&
        !id.includes(".js") &&
        !id.includes(".mjs") &&
        !id.includes(".ts")
      ) {
        return {
          code: await transformCode(code),
          map: null,
        };
      }
    },
    async generateBundle(_options, bundle) {
      for (const fileName in bundle) {
        const asset = bundle[fileName];
        if (
          asset &&
          asset.type === "asset" &&
          fileName.endsWith(".css") &&
          typeof asset["source"] === "string"
        ) {
          asset["source"] = await transformCode(asset["source"]);
        }
      }
    },
  };
}
