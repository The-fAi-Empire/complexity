import type { DialogProps } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { PplxLanguageModel } from "@/data/plugins/query-box/language-model-selector/language-models";
import AutoModeOption from "@/plugins/language-model-selector/components/AutoModeOption";
import LanguageModelGroup from "@/plugins/language-model-selector/components/mobile/LanguageModelGroup";

export default function MobileContent({ ...props }: DialogProps) {
  return (
    <Sheet lazyMount unmountOnExit {...props}>
      <SheetContent
        side="bottom"
        closeButton={false}
        className="x:flex x:flex-col x:gap-2"
      >
        <AutoModeOption />
        <LanguageModelGroup
          title="Standard"
          models={PplxLanguageModel.fastModels}
        />
        <LanguageModelGroup
          title="Reasoning"
          models={PplxLanguageModel.reasoningModels}
        />
        <LanguageModelGroup
          title="Research"
          models={PplxLanguageModel.deepResearchModels}
        />
      </SheetContent>
    </Sheet>
  );
}
