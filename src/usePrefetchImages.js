// usePrefetchImages.ts
import { useEffect } from "react";

export function usePrefetchImages(imageUrls) {
  useEffect(() => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);
}
