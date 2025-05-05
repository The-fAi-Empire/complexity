import { createContext, useContext } from "react";

export const ImageCollectionContext = createContext(false);

export function useImageCollectionContext() {
  return useContext(ImageCollectionContext);
}
