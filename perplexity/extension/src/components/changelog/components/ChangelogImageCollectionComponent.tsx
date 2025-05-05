import type { ReactNode } from "react";

import { ImageCollectionContext } from "@/components/changelog/utils/ImageCollectionContext";

export function ChangelogImageCollectionComponent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ImageCollectionContext value={true}>
      <div className="x:my-4 x:flex x:flex-row x:flex-wrap x:justify-start x:gap-4">
        {children}
      </div>
    </ImageCollectionContext>
  );
}
