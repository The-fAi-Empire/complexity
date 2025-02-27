import { csLoaderRegistry } from "@/utils/cs-loader-registry";
import { getCookie, setCookie } from "@/utils/utils";

csLoaderRegistry.register({
  id: "plugin:cookiesNormalization",
  loader: () => {
    const pplxDeepResearchTooltipImpression = getCookie(
      "pplx.deep-research-tooltip-impressions",
    );

    if (
      pplxDeepResearchTooltipImpression == null ||
      Number(pplxDeepResearchTooltipImpression) < 10
    ) {
      setCookie("pplx.deep-research-tooltip-impressions", "999", 365);
    }
  },
});
