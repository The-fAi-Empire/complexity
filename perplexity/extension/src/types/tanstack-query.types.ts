import type { UseQueryOptions } from "@tanstack/react-query";

export type QueryOptionsWithout<
  ValueType,
  TQueryKey extends readonly unknown[],
  TOmitKeys extends keyof UseQueryOptions<
    ValueType,
    Error,
    ValueType,
    TQueryKey
  > = "queryKey" | "queryFn" | "enabled",
> = Omit<UseQueryOptions<ValueType, Error, ValueType, TQueryKey>, TOmitKeys>;

export type ControlledQueryOptions<
  T,
  TQueryKey extends readonly unknown[],
  TOmitKeys extends keyof UseQueryOptions<T, Error, T, TQueryKey> = never,
> = QueryOptionsWithout<T, TQueryKey, "queryKey" | "queryFn" | TOmitKeys>;
