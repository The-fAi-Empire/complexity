import { initializeDayjsLocale } from "@/data/dayjs";
import { initializeI18next } from "@/data/i18next";
import { asyncLoaderRegistry } from "@/plugins/_core/async-dep-registry";

declare module "@/plugins/_core/async-dep-registry" {
  interface AsyncLoadersRegistry {
    "lib:i18next": void;
    "lib:dayjs": void;
  }
}

export default function loader() {
  asyncLoaderRegistry.register({
    dependencies: [],
    id: "lib:i18next",
    loader: initializeI18next,
  });

  asyncLoaderRegistry.register({
    dependencies: [],
    id: "lib:dayjs",
    loader: initializeDayjsLocale,
  });
}
