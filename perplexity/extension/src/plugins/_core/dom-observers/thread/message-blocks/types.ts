import type { LanguageModelCode } from "@/services/cplx-api/remote-resources/pplx-language-models/types";
import type { PplxWebResult } from "@/utils/thread-export";

export type MessageBlock = {
  nodes: {
    $wrapper: JQuery<HTMLElement>;
    $query: JQuery<HTMLElement>;
    $queryHoverContainer: JQuery<HTMLElement>;
    $sources: JQuery<HTMLElement>;
    $answer: JQuery<HTMLElement>;
    $bottomBar: JQuery<HTMLElement>;
  };
  content: {
    backendUuid: string;
    title: string;
    answer: string;
    webResults: PplxWebResult[];
    displayModel: LanguageModelCode;
    authorUuid: string | null;
  };
  states: {
    isInFlight: boolean;
    isReadOnly: boolean;
    isEditingQuery: boolean;
    isVirtualized: boolean;
  };
};
