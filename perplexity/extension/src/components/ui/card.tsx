import type { ComponentProps } from "react";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "x:rounded-xl x:border x:border-border/50 x:bg-card x:text-card-foreground x:shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("x:flex x:flex-col x:space-y-1.5 x:p-4", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "x:text-2xl x:leading-none x:font-semibold x:tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("x:text-sm x:text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("x:p-4 x:pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("x:flex x:items-center x:p-4 x:pt-0", className)}
      {...props}
    />
  );
}
