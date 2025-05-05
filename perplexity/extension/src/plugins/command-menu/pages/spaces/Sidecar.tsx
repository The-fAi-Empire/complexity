import SpacePreview from "@/plugins/command-menu/pages/spaces/SpacePreview";
import {
  commandMenuStore,
  useCommandMenuStore,
} from "@/plugins/command-menu/store";
import usePplxSpaces from "@/services/pplx-api/hooks/usePplxSpaces";

export default function SpacesSearchItemsSidecar() {
  const { data: spaces } = usePplxSpaces();

  const selectingValue = useCommandMenuStore((store) => store.selectingValue);

  useEffect(() => {
    if (!selectingValue || !spaces) return;

    const space = spaces.find((space) => space.uuid === selectingValue);

    if (!space) return;

    commandMenuStore.getState().setSidecarItems(<SpacePreview space={space} />);

    return () => {
      commandMenuStore.getState().setSidecarItems(null);
    };
  }, [selectingValue, spaces]);

  return null;
}
