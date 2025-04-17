import { APP_CONFIG } from "@/app.config";

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
