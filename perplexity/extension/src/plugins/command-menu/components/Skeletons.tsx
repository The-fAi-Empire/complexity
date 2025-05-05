import type { ComponentProps } from "react";

export default function CommandItemSkeleton({
  count,
  className,
  ...props
}: ComponentProps<"div"> & {
  count: number;
}) {
  return (
    <div className="x:flex x:flex-col x:gap-3 x:px-3 x:py-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "x:h-8 x:w-full x:animate-pulse x:rounded-lg x:bg-muted",
            className,
          )}
          {...props}
        />
      ))}
    </div>
  );
}
