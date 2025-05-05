import CsUiPluginsGuard from "@/plugins/_core/plugins-guard/CsUiPluginsGuard";
import ChangeModelActionItem from "@/plugins/slash-command-menu/components/action-items/ChangeModel";

export default function ActionItems() {
  return (
    <CsUiPluginsGuard
      allowedAccountTypes={[["pro"], ["pro", "enterprise"]]}
      dependentPluginIds={["queryBox:languageModelSelector"]}
    >
      <ChangeModelActionItem />
    </CsUiPluginsGuard>
  );
}
