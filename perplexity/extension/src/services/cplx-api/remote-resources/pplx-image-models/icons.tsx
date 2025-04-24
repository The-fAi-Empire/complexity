import { AiOutlineOpenAI } from "react-icons/ai";
import { SiGooglegemini, SiOpenai } from "react-icons/si";

import BlackForestLabs from "@/components/icons/BlackForestLabsIcon";
import type { ImageModel } from "@/services/cplx-api/remote-resources/pplx-image-models/types";

export const imageModelIcons: Record<ImageModel["code"], React.ElementType> = {
  default: SiOpenai,
  flux: BlackForestLabs,
  "dall-e-3": AiOutlineOpenAI,
  "gemini-flash": SiGooglegemini,
};
