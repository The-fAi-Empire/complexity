import { Steps as ArkSteps } from "@ark-ui/react/steps";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

export const Steps = ArkSteps.Root;
export const StepsContext = ArkSteps.Context;

export function StepsList({
  className,
  ...props
}: ComponentProps<typeof ArkSteps.List>) {
  return (
    <ArkSteps.List
      className={cn(
        "x:flex x:w-full x:items-center x:gap-2",
        "x:data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

export function StepsItem({ className, ...props }: ArkSteps.ItemProps) {
  return (
    <ArkSteps.Item
      className={cn(
        "x:flex x:flex-1 x:items-center x:gap-2",
        "x:data-[orientation=vertical]:w-full",
        className,
      )}
      {...props}
    />
  );
}

export function StepsTrigger({ className, ...props }: ArkSteps.TriggerProps) {
  return (
    <ArkSteps.Trigger
      className={cn(
        "x:group x:flex x:w-full x:items-center x:gap-2 x:text-sm x:font-medium",
        "x:transition-colors x:hover:text-foreground/80",
        "x:disabled:cursor-not-allowed x:disabled:opacity-50",
        "x:focus-visible:ring-2 x:focus-visible:ring-ring x:focus-visible:ring-offset-2 x:focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function StepsIndicator({
  className,
  ...props
}: ArkSteps.IndicatorProps) {
  return (
    <ArkSteps.Indicator
      className={cn(
        "x:flex x:h-8 x:w-8 x:items-center x:justify-center x:rounded-full x:border-2 x:bg-background x:text-sm x:font-medium",
        "x:self-start x:transition-colors",
        "x:group-data-[state=complete]:border-primary x:group-data-[state=complete]:text-primary",
        "x:group-data-[state=current]:border-primary x:group-data-[state=current]:text-primary",
        "x:group-data-[state=upcoming]:border-muted-foreground x:group-data-[state=upcoming]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function StepsSeparator({
  className,
  ...props
}: ArkSteps.SeparatorProps) {
  return (
    <ArkSteps.Separator
      className={cn(
        "x:h-[2px] x:flex-1 x:bg-border",
        "x:data-[orientation=vertical]:h-8 x:data-[orientation=vertical]:w-[2px]",
        "x:group-data-[state=complete]:bg-primary",
        className,
      )}
      {...props}
    />
  );
}

export function StepsContent({ className, ...props }: ArkSteps.ContentProps) {
  return (
    <ArkSteps.Content
      className={cn("x:mt-4 x:text-sm", className)}
      {...props}
    />
  );
}

export function StepsCompletedContent({
  className,
  ...props
}: ArkSteps.CompletedContentProps) {
  return (
    <ArkSteps.CompletedContent
      className={cn("x:mt-4 x:text-sm", className)}
      {...props}
    />
  );
}

export function StepsPrevTrigger({
  children,
  ...props
}: ArkSteps.PrevTriggerProps) {
  return (
    <ArkSteps.PrevTrigger {...props} asChild>
      <Button variant="ghost" size="lg">
        {children}
      </Button>
    </ArkSteps.PrevTrigger>
  );
}

export function StepsNextTrigger({
  children,
  ...props
}: ArkSteps.NextTriggerProps) {
  return (
    <ArkSteps.NextTrigger {...props} asChild>
      <Button variant="default" size="lg">
        {children}
      </Button>
    </ArkSteps.NextTrigger>
  );
}
