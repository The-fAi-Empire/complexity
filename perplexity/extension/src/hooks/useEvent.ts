import { useLayoutEffect, useMemo, useRef } from "react";

type Fn<ARGS extends any[], R> = (...args: ARGS) => R;

export function useEvent<A extends any[], R>(fn: Fn<A, R>): Fn<A, R> {
  const fnRef = useRef<Fn<A, R>>(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  });

  return useMemo(
    () =>
      (...args: A): R => {
        return fnRef.current(...args);
      },
    [],
  );
}
