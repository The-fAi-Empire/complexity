import type { SandpackPreviewRef } from "@codesandbox/sandpack-react";
import type { ComponentType, SVGProps } from "react";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";

import type { ArtifactState } from "@/plugins/artifacts/types";

export type CodeBlockLocation = {
  messageBlockIndex: number;
  codeBlockIndex: number;
};

export type ArtifactBlock = {
  Icon: ComponentType<SVGProps<SVGElement>>;
  count: number;
  title: string;
  description: string;
  onClick: () => void;
  isInFlight: boolean;
  location: CodeBlockLocation[];
};

type ArtifactsStoreType = {
  isArtifactsListOpen: boolean;
  openArtifactsList: () => void;
  closeArtifactsList: () => void;
  ArtifactBlocks: Record<string, ArtifactBlock>;
  selectedCodeBlockLocation: CodeBlockLocation | null;
  setselectedCodeBlockLocation: (location: CodeBlockLocation) => void;
  state: ArtifactState;
  setState: (state: ArtifactState) => void;
  isValidArtifactCode: boolean;
  hasAutoPreviewTriggered: boolean;
  lastAutoOpenCodeBlockLocation: CodeBlockLocation | null;
  setHasAutoPreviewTriggered: (value: boolean) => void;
  setLastAutoOpenCodeBlockLocation: (value: CodeBlockLocation | null) => void;
  close: () => void;
  refreshPreviewKey: number;
  refreshPreview: () => void;
  sandpackPreviewRef: SandpackPreviewRef | null;
  setSandpackPreviewRef: (ref: SandpackPreviewRef | null) => void;
};

export const artifactsStore = createWithEqualityFn<ArtifactsStoreType>()(
  subscribeWithSelector(
    immer(
      (set): ArtifactsStoreType => ({
        isArtifactsListOpen: false,
        ArtifactBlocks: {},
        selectedCodeBlockLocation: null,
        state: "code",
        isValidArtifactCode: false,
        hasAutoPreviewTriggered: false,
        lastAutoOpenCodeBlockLocation: null,
        refreshPreviewKey: 0,

        openArtifactsList: () => {
          set({ isArtifactsListOpen: true, selectedCodeBlockLocation: null });
        },
        closeArtifactsList: () => set({ isArtifactsListOpen: false }),
        setselectedCodeBlockLocation: (location) =>
          set({ selectedCodeBlockLocation: location }),
        setState: (state) => set({ state }),
        setHasAutoPreviewTriggered: (value) =>
          set((draft) => {
            draft.hasAutoPreviewTriggered = value;
          }),
        setLastAutoOpenCodeBlockLocation: (value) =>
          set((draft) => {
            draft.lastAutoOpenCodeBlockLocation = value;
          }),
        close: () =>
          set((draft) => {
            draft.selectedCodeBlockLocation = null;
          }),
        refreshPreview: () =>
          set((draft) => {
            draft.refreshPreviewKey++;
          }),
        sandpackPreviewRef: null,
        setSandpackPreviewRef: (ref) => set({ sandpackPreviewRef: ref }),
      }),
    ),
  ),
);

export const useArtifactsStore = artifactsStore;
