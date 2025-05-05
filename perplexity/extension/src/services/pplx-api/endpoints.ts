import type { Space } from "@/services/pplx-api/pplx-api.types";

export const ENDPOINTS = {
  HOME: "https://www.perplexity.ai/",
  AUTH_SESSION: "https://www.perplexity.ai/api/auth/session",
  USER_SETTINGS:
    "https://www.perplexity.ai/rest/user/settings?version=2.18&source=default",
  USER_SETTINGS_FALLBACK: "https://www.perplexity.ai/rest/user/settings",
  ORG_SETTINGS:
    "https://www.perplexity.ai/rest/enterprise/user/organization?version=2.15&source=default",
  SAVE_SETTINGS:
    "https://www.perplexity.ai/rest/user/save-settings?version=2.18&source=default",
  THREAD: (threadSlug: string) =>
    `https://www.perplexity.ai/rest/thread/${threadSlug}&version=2.18&source=default`,
  THREADS:
    "https://www.perplexity.ai/rest/thread/list_ask_threads?version=2.18&source=default",
  SPACE: (spaceUuid: Space["uuid"]) =>
    `https://www.perplexity.ai/rest/collections/get_collection?collection_slug=${spaceUuid}&version=2.18&source=default`,
  SPACES:
    "https://www.perplexity.ai/rest/collections/list_user_collections?limit=50&offset=0&version=2.13&source=default",
  // This api doesnt support search term
  // TODO: add access state filter
  SPACE_THREADS: ({
    spaceSlug,
    limit,
    offset,
  }: {
    spaceSlug: Space["slug"];
    limit: number;
    offset: number;
  }) =>
    `https://www.perplexity.ai/rest/collections/list_collection_threads?collection_slug=${spaceSlug}&limit=${limit}&offset=${offset}&filter_by_user=false&filter_by_shared_threads=false&version=2.13&source=default`,
  MAINTENANCE_STATUS:
    "https://www.perplexity.ai/rest/maintenance?version=2.15&source=default",
  RAW_LIBRARY: "https://www.perplexity.ai/library",
};
