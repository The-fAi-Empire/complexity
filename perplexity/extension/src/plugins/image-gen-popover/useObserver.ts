import { DomSelectorsRegistry } from "@/data/dom-selectors-registry";
import { useThreadDomObserverStore } from "@/plugins/_core/dom-observers/thread/store";

export default function useObserver() {
  const popper = useThreadDomObserverStore(
    (state) => state.$popper?.[0] ?? null,
    deepEqual,
  );

  return useMemo(() => findOptionsGridHeader(popper), [popper]);
}

function findOptionsGridHeader(popper: HTMLElement | null) {
  if (!popper) return null;

  const $header = $(popper)
    .find(DomSelectorsRegistry.cachedSync.THREAD.MESSAGE.IMAGE_GEN.OPTIONS_GRID)
    .prev();

  if (!$header.length) return null;

  return $header[0];
}
