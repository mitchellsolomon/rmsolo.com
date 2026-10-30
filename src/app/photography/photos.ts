import type { StaticImageData } from "next/image";
import { syncedPhotographs } from "./photos.generated";

export type Photograph = {
  id: string;
  src: StaticImageData;
  alt: string;
};

// Import web-ready originals from @/assets/photography, then add them here.
// Static imports provide intrinsic dimensions and automatic blur placeholders.
export const photographs: Photograph[] = [...syncedPhotographs];
