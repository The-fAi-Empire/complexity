import { ARTIFACT_RENDERERS } from "@/plugins/artifacts/consts";
import type { ArtifactLanguage } from "@/plugins/artifacts/types";

export default function ArtifactPreview({
  language,
}: {
  language: ArtifactLanguage;
}) {
  const Component = ARTIFACT_RENDERERS[language];

  if (Component == null) return null;

  return (
    <div className="x:size-full">
      <Component />
    </div>
  );
}
