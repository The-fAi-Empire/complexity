import type { ZodSchema } from "zod";

import type { RemoteResourceType } from "@/services/cplx-api/types";

export type RemoteResource<T> = {
  resourcePath: string;
  type: RemoteResourceType;
  fallback: T;
  zodSchema: ZodSchema<T>;
};

export type RemoteResourceReturnType<T> = RemoteResource<T>;
