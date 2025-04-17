import { storage } from "@wxt-dev/storage";

import { APP_CONFIG } from "@/app.config";
import { jsonUtils } from "@/utils/utils";

/**
 * Returns a timestamp that is used to forcefully invalidate the endpoint cache.
 * @param interval - The interval in minutes.
 * @returns The timestamp.
 */
export function getTParam({ interval = 0 }: { interval?: number } = {}) {
  if (interval <= 0 || APP_CONFIG.IS_DEV) return Date.now();

  const nowInMilliseconds = Date.now();
  const cacheResetIntervalMs = 1000 * 60 * interval;

  return (
    Math.floor(nowInMilliseconds / cacheResetIntervalMs) * cacheResetIntervalMs
  );
}

/**
 * Fetches data with caching support.
 *
 * This function attempts to retrieve data from local storage cache first.
 * If valid cache exists, it returns the cached data immediately while refreshing
 * the cache in the background. If no valid cache exists, it fetches fresh data.
 *
 * @template T - The type of data being fetched
 * @param {Object} options - The options for fetching with cache
 * @param {string} options.cacheKey - The key to use for storing in local storage
 * @param {() => Promise<T>} options.fetchFn - The function that fetches the data
 * @param {(data: unknown) => { success: boolean; data?: T }} [options.cacheValidator] - Optional function to validate cached data
 * @returns {Promise<T>} The fetched or cached data
 */
export async function fetchWithCache<T>({
  cacheKey,
  fetchFn,
  cacheValidator: validator,
}: {
  cacheKey: string;
  fetchFn: () => Promise<T>;
  cacheValidator?: (data: unknown) => { success: boolean; data?: T };
}): Promise<T> {
  const rawCache = await storage.getItem(`local:${cacheKey}`);
  const parsedCache = jsonUtils.safeParse(
    typeof rawCache === "string" ? rawCache : "",
  );

  const cache = validator
    ? validator(parsedCache)
    : { success: parsedCache != null, data: parsedCache as T };

  const refreshCachePromise = fetchFn()
    .then((data) => {
      if (
        data != null &&
        (!cache.success || !deepEqual(cache.data as T, data))
      ) {
        storage.setItem(`local:${cacheKey}`, JSON.stringify(data));
      }
      return data;
    })
    .catch((error) => {
      if (cache.success) {
        return cache.data as T;
      }
      throw error;
    });

  if (cache.success) {
    return cache.data as T;
  }

  return refreshCachePromise as Promise<T>;
}
