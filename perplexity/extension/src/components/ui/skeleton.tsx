import type { ComponentProps } from "react";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("x:animate-pulse x:rounded-md x:bg-muted", className)}
      {...props}
    />
  );
}
