import Image from "next/image";
import type { CSSProperties } from "react";
import type { Photograph } from "./photos";

type GalleryItem = {
  id: string;
  width: number;
  height: number;
  photo?: Photograph;
};

type Position = { column: number; ratio: number; gaps: number };

// Each height is a multiple of column width plus fixed gaps. Intrinsic image
// dimensions let the server calculate positions without measuring the DOM.
function layout(items: GalleryItem[], columns: number) {
  const firstRatio = items.length ? items[0].height / items[0].width : 0;
  const cursors = Array.from({ length: columns }, (_, column) => ({
    column,
    ratio: column === 1 ? firstRatio / 2 : 0,
    gaps: column === 1 ? 0.5 : 0,
  }));
  const positions = items.map((item, index) => {
    const cursor = cursors[index % columns];
    const position = { ...cursor };
    cursor.ratio += item.height / item.width;
    cursor.gaps += 1;
    return position;
  });
  const ends = cursors
    .filter((_, column) => column < items.length)
    .map((cursor) => distance({ ...cursor, gaps: cursor.gaps - 1 }));
  return { positions, height: ends.length ? `max(${ends.join(", ")})` : "0px" };
}

function distance({ ratio, gaps }: Position) {
  return `calc(var(--column-width) * ${ratio} + var(--gallery-gap) * ${gaps})`;
}

// Neutral layout samples are shown only in development until photos are added.
const previewItems: GalleryItem[] = [
  [3, 2], [2, 3], [4, 3], [3, 4], [3, 2], [1, 1], [3, 2], [4, 5], [3, 4],
].map(([width, height], index) => ({ id: `preview-${index}`, width, height }));

export default function Gallery({ photos }: { photos: Photograph[] }) {
  const preview = photos.length === 0 && process.env.NODE_ENV === "development";
  const items: GalleryItem[] = preview ? previewItems : photos.map((photo) => ({
    id: photo.id,
    width: photo.src.width,
    height: photo.src.height,
    photo,
  }));
  const two = layout(items, 2);
  const three = layout(items, 3);

  if (items.length === 0) {
    return <p className="py-20 text-sm text-neutral-500">Photographs coming soon.</p>;
  }

  return (
    <div className="@container">
      {preview && <p className="mb-6 text-xs text-neutral-500">Layout preview · placeholder frames</p>}
      <div
        role="list"
        aria-label={preview ? "Gallery layout preview" : "Photographs"}
        className="relative flex flex-col gap-6 [--gallery-gap:24px] sm:block sm:h-[var(--height-2)] sm:[--column-width:calc((100cqw-24px)/2)] lg:h-[var(--height-3)] lg:[--column-width:calc((100cqw-48px)/3)]"
        style={{ "--height-2": two.height, "--height-3": three.height } as CSSProperties}
      >
        {items.map((item, index) => (
          <figure
            key={item.id}
            role="listitem"
            className="m-0 w-full sm:absolute sm:top-[var(--top-2)] sm:left-[var(--left-2)] sm:w-[var(--column-width)] lg:top-[var(--top-3)] lg:left-[var(--left-3)]"
            style={{
              "--top-2": distance(two.positions[index]),
              "--top-3": distance(three.positions[index]),
              "--left-2": `calc((var(--column-width) + var(--gallery-gap)) * ${two.positions[index].column})`,
              "--left-3": `calc((var(--column-width) + var(--gallery-gap)) * ${three.positions[index].column})`,
            } as CSSProperties}
          >
            {item.photo ? (
              <Image
                src={item.photo.src}
                alt={item.photo.alt}
                placeholder={item.photo.src.blurDataURL ? "blur" : "empty"}
                sizes="(min-width: 1440px) 432px, (min-width: 1024px) calc((100vw - 144px) / 3), (min-width: 640px) calc((100vw - 88px) / 2), calc(100vw - 40px)"
                preload={index === 0}
                className="block h-auto w-full"
              />
            ) : (
              <div
                className="flex items-center justify-center bg-neutral-100 text-xs text-neutral-400"
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              >
                {String(index + 1).padStart(2, "0")} · {item.width}:{item.height}
              </div>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
