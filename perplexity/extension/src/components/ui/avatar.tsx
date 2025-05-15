import { Avatar as ArkAvatar } from "@ark-ui/react/avatar";

export function Avatar({ className, ...props }: ArkAvatar.RootProps) {
  return (
    <ArkAvatar.Root
      className={cn(
        "x:relative x:flex x:h-10 x:w-10 x:shrink-0 x:overflow-hidden x:rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export function AvatarImage({ className, ...props }: ArkAvatar.ImageProps) {
  return (
    <ArkAvatar.Image
      className={cn("x:aspect-square x:h-full x:w-full", className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: ArkAvatar.FallbackProps) {
  return (
    <ArkAvatar.Fallback
      className={cn(
        "x:flex x:h-full x:w-full x:items-center x:justify-center x:rounded-full x:bg-muted",
        className,
      )}
      {...props}
    />
  );
}
