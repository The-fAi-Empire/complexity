import { ChangelogImageComponent } from "@/components/changelog/components/ChangelogImageComponent";
import { ChangelogThumbnailImageComponent } from "@/components/changelog/components/ChangelogThumbnailImageComponent";
import { useImageCollectionContext } from "@/components/changelog/utils/ImageCollectionContext";

export function ChangelogContextAwareImageComponent(props: {
  src?: string;
  alt?: string;
}) {
  const isInCollection = useImageCollectionContext();

  if (isInCollection) {
    return <ChangelogThumbnailImageComponent {...props} />;
  }

  return <ChangelogImageComponent {...props} />;
}
