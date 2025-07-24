import { defineManifest, type ManifestV3Export } from "@crxjs/vite-plugin";
import { baseManifest } from "./manifest.base";
import { produce } from "immer";

export type ChromeManifest = ManifestV3Export & {
  background: {
    service_worker: string;
    type: "module";
  };
};

const defineChromeManifest = defineManifest as unknown as (
  manifest: ChromeManifest,
) => ChromeManifest;

export default defineChromeManifest(
  produce(baseManifest as ChromeManifest, (draft) => {
    draft.background = {
      service_worker: "src/entrypoints/background/index.ts",
      type: "module",
    };
  }),
);
