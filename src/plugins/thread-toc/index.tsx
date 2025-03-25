import { LuX } from "react-icons/lu";

import { useInsertCss } from "@/hooks/useInsertCss";
import { useSpaRouter } from "@/plugins/_api/spa-router/listeners";
import { useThreadDomObserverStore } from "@/plugins/_core/dom-observers/thread/store";
import FloatingToggle from "@/plugins/thread-toc/FloatingToggle";
import normalizeCss from "@/plugins/thread-toc/normalize.css?inline";
import { useHandleTouch } from "@/plugins/thread-toc/useHandleTouch";
import { usePanelPosition } from "@/plugins/thread-toc/usePanelPosition";
import {
  TocItem as TocItemType,
  useThreadTocItems,
} from "@/plugins/thread-toc/useThreadTocItems";
import { INTERNAL_ATTRIBUTES } from "@/utils/dom-selectors";
import { PPLX_SCROLLBAR_CLASSES } from "@/utils/pplx-scrollbar-classes";
import { scrollToElement, whereAmI } from "@/utils/utils";

export const PANEL_WIDTH = 230;

export default function ThreadTocWrapper() {
  const threadWrapper = useThreadDomObserverStore(
    (store) => store.$wrapper?.[0],
    deepEqual,
  );

  const [isOpen, setIsOpen] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useHandleTouch({
    containerRef,
    isOpen,
    setIsOpen,
  });

  const tocItems = useThreadTocItems();
  const { position, isFloating } = usePanelPosition() ?? {};
  const { top, left } = position ?? {};

  useInsertCss({
    css: normalizeCss,
    id: "thread-toc-normalize",
    inject: isOpen,
  });

  const handleToggleOpen = useCallback(() => setIsOpen(true), []);
  const handleToggleClose = useCallback(() => setIsOpen(false), []);

  const shouldShowToc = tocItems.length > 1 && !!position;

  const { url } = useSpaRouter();

  useEffect(() => {
    setIsOpen(whereAmI(url) === "thread");
  }, [url]);

  if (!shouldShowToc || threadWrapper == null) return null;

  return (
    <>
      {isFloating && (
        <FloatingToggle isOpen={isOpen} onClick={handleToggleOpen} />
      )}
      <div
        ref={containerRef}
        id="thread-toc-container"
        className={cn(
          PPLX_SCROLLBAR_CLASSES,
          "x:group x:fixed x:top-(--panel-top) x:flex x:flex-row-reverse x:justify-end",
          "x:w-(--panel-width)",
          {
            "x:z-10 x:max-h-[60vh]": isFloating,
            "x:max-h-[80vh]": !isFloating,
          },
          "x:transition-all x:animate-in x:fade-in",
          {
            "x:left-(--panel-left)": !isFloating,
            "x:right-3 x:rounded-md x:border x:border-border/50 x:bg-secondary x:p-4 x:shadow-lg x:md:right-8":
              isFloating,
            "x:hidden": isFloating && !isOpen,
          },
        )}
        style={
          {
            ["--panel-width"]: `${PANEL_WIDTH}px`,
            ["--panel-top"]: top != null ? `${top}px` : undefined,
            ["--panel-left"]:
              !isFloating && left != null ? `${left}px` : undefined,
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "x:cursor-pointer x:rounded-full x:p-1 x:text-muted-foreground x:transition-colors x:hover:text-foreground",
            {
              "x:absolute x:top-2 x:right-2": isFloating,
              "x:invisible x:transition-all x:group-hover:visible x:group-hover:opacity-100":
                !isFloating,
            },
          )}
          onClick={handleToggleClose}
        >
          <LuX className="x:size-4" />
        </div>
        {isOpen && (
          <div className="x:flex x:flex-col x:gap-2">
            {tocItems.map((item, idx) => (
              <TocItem
                key={idx}
                item={item}
                onClick={() => {
                  const $element = $(
                    `[data-cplx-component="${INTERNAL_ATTRIBUTES.THREAD.MESSAGE.BLOCK}"][data-index="${item.id}"]`,
                  );
                  if ($element.length) scrollToElement($element, 0, 300);
                }}
                onContextMenu={() => {
                  const $element = $(
                    `[data-cplx-component="${INTERNAL_ATTRIBUTES.THREAD.MESSAGE.BLOCK}"][data-index="${item.id}"]`,
                  );
                  if ($element.length && $element.height() != null)
                    scrollToElement(
                      $element,
                      $element.height()! - window.innerHeight / 2,
                      300,
                    );
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const TocItem = memo(function TocItem({
  item,
  onClick,
  onContextMenu,
}: {
  item: TocItemType;
  onClick: () => void;
  onContextMenu: () => void;
}) {
  const title = useMemo(() => {
    return (
      item.title.trim().slice(0, 300) + (item.title.length > 300 ? "..." : "")
    );
  }, [item.title]);

  return (
    <div
      className="x:flex x:cursor-pointer x:gap-4"
      title={title}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu();
      }}
    >
      <div
        className={cn("x:min-h-5 x:min-w-[2px] x:rounded-full", {
          "x:bg-foreground": item.isActive,
          "x:bg-muted-foreground": !item.isActive,
        })}
      />
      <div
        className={cn("x:line-clamp-2 x:text-sm x:transition-colors", {
          "x:font-medium x:text-foreground": item.isActive,
          "x:text-muted-foreground x:hover:text-foreground": !item.isActive,
        })}
      >
        {title}
      </div>
    </div>
  );
});
