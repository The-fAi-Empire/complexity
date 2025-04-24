import type { DialogProps } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import AutoModeOption from "@/plugins/language-model-selector/components/AutoModeOption";
import LanguageModelGroup from "@/plugins/language-model-selector/components/mobile/LanguageModelGroup";
import { PplxLanguageModelsService } from "@/services/cplx-api/remote-resources/pplx-language-models";

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
          models={PplxLanguageModelsService.fastModels}
        />
        <LanguageModelGroup
          title="Reasoning"
          models={PplxLanguageModelsService.reasoningModels}
        />
        <LanguageModelGroup
          title="Research"
          models={PplxLanguageModelsService.deepResearchModels}
        />
      </SheetContent>
    </Sheet>
  );
}
