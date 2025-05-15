import type { ComponentProps } from "react";
import { LuLoaderCircle } from "react-icons/lu";

export default function LoadingOverlay({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "x:fixed x:inset-0 x:z-50 x:flex x:items-center x:justify-center x:bg-background/80",
        className,
      )}
      {...props}
    >
      <LuLoaderCircle className="x:size-8 x:animate-spin x:text-primary" />
    </div>
  );
}
