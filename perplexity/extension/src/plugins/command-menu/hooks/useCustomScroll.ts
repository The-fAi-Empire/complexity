import { useCommandMenuStore } from "@/plugins/command-menu/store";

export default function useCustomScroll({
  commandListRef,
}: {
  commandListRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { selectingValue, open } = useCommandMenuStore();

  const prevSelectingValueRef = useRef(selectingValue);

  useEffect(() => {
    if (
      open &&
      commandListRef.current &&
      prevSelectingValueRef.current !== selectingValue
    ) {
      prevSelectingValueRef.current = selectingValue;

      requestAnimationFrame(() => {
        const selectedItem = commandListRef.current?.querySelector(
          '[cmdk-item][aria-selected="true"]',
        );
        if (selectedItem && selectedItem instanceof HTMLElement) {
          const container = commandListRef.current;
          if (!container) return;

          const containerRect = container.getBoundingClientRect();
          const selectedRect = selectedItem.getBoundingClientRect();

          if (selectedRect.bottom > containerRect.bottom) {
            container.scrollTop =
              container.scrollTop +
              (selectedRect.bottom - containerRect.bottom) +
              50;
          } else if (selectedRect.top < containerRect.top) {
            container.scrollTop =
              container.scrollTop + (selectedRect.top - containerRect.top);
          }
        }
      });
    }
  }, [commandListRef, open, selectingValue]);
}
