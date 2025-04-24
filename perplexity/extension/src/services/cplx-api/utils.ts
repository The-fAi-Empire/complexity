import type { ZodSchema } from "zod";

import { APP_CONFIG } from "@/app.config";
import { fetchTextResource } from "@/utils/utils";

export function getTParam({ interval = 0 }: { interval?: number } = {}) {
  if (interval <= 0) return Date.now();

  const nowInMilliseconds = Date.now();
  const cacheResetIntervalMs = 1000 * 60 * interval;

  return (
    Math.floor(nowInMilliseconds / cacheResetIntervalMs) * cacheResetIntervalMs
  );
}

export async function fetchResourceWithSchema<T>({
  resourcePath,
  zodSchema,
  pathPrefix,
}: {
  resourcePath: string;
  zodSchema: ZodSchema<T>;
  pathPrefix: string;
}): Promise<T> {
  const text = await fetchTextResource(
    getUrl({
      path: `${pathPrefix}/${resourcePath}`,
    }).toString(),
  );

  try {
    const data = JSON.parse(text);

    if (typeof data === "object" && data !== null) {
      return zodSchema.parse(data);
    }

    return data as T;
  } catch (error) {
    if (typeof text === "string") {
      return text as unknown as T;
    }
    throw error;
  }
}

export function getUrl({
  path,
  passiveCacheBusterInterval: passiveCachingBuster,
}: {
  path: string;
  passiveCacheBusterInterval?: number;
}): URL {
  const url = new URL(APP_CONFIG.CPLX_CDN_URL!);
  url.pathname = path;
  url.searchParams.set(
    "t",
    getTParam({
      interval: passiveCachingBuster ?? 0,
    }).toString(),
  );
  return url;
}
