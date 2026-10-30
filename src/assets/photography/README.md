# Photography originals

Put web-ready JPG or WebP photographs in this folder. Keep full-resolution RAW
files and archival originals outside the repository. A practical starting point
is 2000–2400 pixels on the long edge, exported in sRGB; inspect fine detail before
settling on compression. Strip GPS metadata before publishing personal photos.

Import each photo in `src/app/photography/photos.ts`:

```ts
import coast from "@/assets/photography/coast.jpg";

export const photographs: Photograph[] = [
  { id: "coast", src: coast, alt: "Waves breaking against a rocky coastline" },
];
```

The list controls order. Images keep their full aspect ratio. On larger screens,
each photo uses the full column width, with varied vertical offsets and spacing. Mobile uses one full-width column. The layout never crops or
overlaps photos. Base gaps are 32px, increasing to 40px on desktop.

Static imports supply dimensions and blur placeholders. The gallery's `sizes`
attribute describes its responsive widths so Next.js can serve suitable image
variants. Only the first image is preloaded; the rest use native lazy loading.
Vercel caches optimized variants. The first request for a new variant may still
need optimization, so image storage alone cannot guarantee an instant load.

For a large or frequently edited library, move originals to an image CDN or
object storage and use a CMS. That migration would need remote image allowlists
and explicit dimensions/blur data instead of static imports.

Until photos are added, development shows neutral layout placeholders;
production shows “Photographs coming soon.”
