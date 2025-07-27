// for Comet-specific pages

import { sendMessage } from "webext-bridge/content-script";

import { InstantCssService } from "@/services/instant-css";
import { whereAmI } from "@/utils/utils";

export default async function loader() {
  if (!(await InstantCssService.hasPermissions())) return;

  const cometPages: ReturnType<typeof whereAmI>[] = [
    "comet_assistant",
    "comet_ntp",
  ];

  if (!cometPages.includes(whereAmI())) return;

  const isInjected = document.documentElement.style.getPropertyValue(
    "--cplx-instant-css-injected",
  );

  if (isInjected) return;

  console.log("[Instant CSS] Not injected, manual injection requested");

  sendMessage("bg:instantCss:requestInjection", undefined, "background");
}
