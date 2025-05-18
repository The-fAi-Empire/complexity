import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  ColorSchemeBadge,
  CompatibilityBadge,
} from "@/entrypoints/options-page/dashboard/pages/themes/components/ThemeCard/Badges";
import ThemeCardBanner from "@/entrypoints/options-page/dashboard/pages/themes/components/ThemeCard/Banner";
import DisableThemeButton from "@/entrypoints/options-page/dashboard/pages/themes/components/ThemeCard/DisableThemeButton";
import ThemeCardEditButton from "@/entrypoints/options-page/dashboard/pages/themes/components/ThemeCard/EditThemeButton";
import type { Theme } from "@/plugins/_core/custom-theme/themes/theme-registry.types";
import useExtensionSettings from "@/services/extension-settings/useExtensionSettings";

type ThemeCardProps = {
  theme?: Theme;
  type: "local" | "built-in";
};

export default function ThemeCard({ theme, type }: ThemeCardProps) {
  const { settings, mutation } = useExtensionSettings();

  const isChosenTheme = settings?.theme === theme?.id;

  if (!theme) return null;

  return (
    <Card
      className={cn(
        "x:group x:relative x:flex x:cursor-pointer x:flex-col x:overflow-hidden x:border-border/50 x:bg-secondary x:transition-all",
        { "x:border-primary/50 x:bg-primary/10": isChosenTheme },
      )}
      onClick={() => {
        mutation.mutate((draft) => {
          draft.theme = theme.id;
        });
      }}
    >
      <div className="x:relative x:aspect-[16/9] x:overflow-hidden">
        <ThemeCardBanner theme={theme} />
      </div>

      <CardHeader className="x:space-y-0">
        <CardTitle className="x:text-lg">{theme.title}</CardTitle>
        <CardDescription>{theme.description}</CardDescription>
      </CardHeader>

      <CardContent className="x:grow">
        <div className="x:flex x:flex-wrap x:gap-2">
          {theme.colorScheme?.includes("light") && (
            <ColorSchemeBadge type="light" />
          )}
          {theme.colorScheme?.includes("dark") && (
            <ColorSchemeBadge type="dark" />
          )}
          {theme.compatibleWith?.includes("desktop") && (
            <CompatibilityBadge type="desktop" />
          )}
          {theme.compatibleWith?.includes("mobile") && (
            <CompatibilityBadge type="mobile" />
          )}
        </div>
      </CardContent>

      <CardFooter className="x:flex x:flex-row x:justify-end x:gap-2">
        <DisableThemeButton theme={theme} />
        {type === "local" && <ThemeCardEditButton theme={theme} />}
      </CardFooter>
    </Card>
  );
}
