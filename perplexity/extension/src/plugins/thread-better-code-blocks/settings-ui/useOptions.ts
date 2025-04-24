import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/data/query-client";
import useExtensionSettings from "@/services/extension-settings/useExtensionSettings";
import { getBetterCodeBlocksFineGrainedOptionsService } from "@/services/indexed-db/better-code-blocks";
import { betterCodeBlocksFineGrainedOptionsQueries } from "@/services/indexed-db/better-code-blocks/query-keys";

type UseOptionsProps = {
  language?: string;
};

export default function useOptions({ language }: UseOptionsProps = {}) {
  const { settings: globalSettings, mutation: globalMutation } =
    useExtensionSettings();

  const { data: fineGrainedSettings } = useQuery({
    ...betterCodeBlocksFineGrainedOptionsQueries.get.detail(language ?? ""),
    enabled: !!language,
  });

  const fineGrainedMutation = useMutation({
    mutationKey: ["better-code-blocks-options", "update", language],
    mutationFn: getBetterCodeBlocksFineGrainedOptionsService().updateDraft,
    onError: (error) => {
      toast({
        title: "❌ Failed to update options",
        description: error.message,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: betterCodeBlocksFineGrainedOptionsQueries.get.detail(
          language ?? "",
        ).queryKey,
      });
    },
  });

  const fineGrainedDeleteMutation = useMutation({
    mutationKey: ["better-code-blocks-options", "delete", language],
    mutationFn: async () => {
      if (!language) return;
      await getBetterCodeBlocksFineGrainedOptionsService().delete(language);
    },
    onError: (error) => {
      toast({
        title: "❌ Failed to delete options",
        description: error.message,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: betterCodeBlocksFineGrainedOptionsQueries.list.all(),
        exact: true,
      });
    },
  });

  return {
    globalSettings,
    globalMutation,
    settings: fineGrainedSettings,
    mutation: fineGrainedMutation,
    delete: fineGrainedDeleteMutation,
  };
}
