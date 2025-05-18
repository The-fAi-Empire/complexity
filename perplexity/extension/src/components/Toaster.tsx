import type { ComponentProps } from "react";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { isReactNode } from "@/types/utils.types";

export function Toaster({
  viewportProps,
}: {
  viewportProps?: ComponentProps<typeof ToastViewport>;
}) {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="x:mt-2 x:w-max x:font-sans">
            <div className="x:grid x:gap-1">
              {isReactNode(title) && <ToastTitle>{title}</ToastTitle>}
              {isReactNode(description) && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport {...viewportProps} />
    </ToastProvider>
  );
}
