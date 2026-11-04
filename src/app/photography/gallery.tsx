"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import type { Photograph } from "./photos";
import { boardLayout, type BoardPosition } from "./board-layout";

type GalleryItem = {
  id: string;
  width: number;
  height: number;
  photo?: Photograph;
};

function layout(items: GalleryItem[], columns: 2 | 3) {
  const { positions, ends } = boardLayout(items, columns);
  return { positions, height: ends.length ? `max(${ends.map(distance).join(", ")})` : "0px" };
}

function distance({ ratio, gaps }: BoardPosition) {
  return `calc(var(--column-width) * ${ratio} + var(--gallery-gap) * ${gaps})`;
}

// Neutral layout samples are shown only in development until photos are added.
const previewItems: GalleryItem[] = [
  [3, 2], [2, 3], [4, 3], [3, 4], [3, 2], [1, 1], [3, 2], [4, 5], [3, 4],
].map(([width, height], index) => ({ id: `preview-${index}`, width, height }));

export default function Gallery({ photos }: { photos: Photograph[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const preview = photos.length === 0 && process.env.NODE_ENV === "development";
  const items: GalleryItem[] = preview ? previewItems : photos.map((photo) => ({
    id: photo.id,
    width: photo.src.width,
    height: photo.src.height,
    photo,
  }));
  const two = layout(items, 2);
  const three = layout(items, 3);
  const activePhoto = activeIndex === null ? null : items[activeIndex]?.photo;
  const viewerRatio = activePhoto ? activePhoto.src.width / activePhoto.src.height : 1;
  const viewerHeightWidth = `calc(${(viewerRatio * 100).toFixed(2)}dvh - ${(viewerRatio * 4).toFixed(2)}rem)`;
  const viewerSizes = `(max-width: 639px) min(calc(100vw - 2rem), ${viewerHeightWidth}), min(calc(100vw - 4rem), ${viewerHeightWidth})`;

  function openPhoto(index: number) {
    setActiveIndex(index);
    dialogRef.current?.showModal();
    closeRef.current?.focus();
  }

  function closePhoto() {
    dialogRef.current?.close();
  }

  function handleClose() {
    const index = activeIndex;
    setActiveIndex(null);
    if (index !== null) triggers.current[index]?.focus();
  }

  if (items.length === 0) {
    return <p className="py-20 text-sm text-neutral-500">Photographs coming soon.</p>;
  }

  return (
    <div className="@container">
      {preview && <p className="mb-6 text-xs text-neutral-500">Layout preview · placeholder frames</p>}
      <div
        role="list"
        aria-label={preview ? "Gallery layout preview" : "Photographs"}
        className="relative flex flex-col gap-8 [--gallery-gap:32px] sm:block sm:h-[var(--height-2)] sm:[--column-width:calc((100cqw-32px)/2)] lg:h-[var(--height-3)] lg:[--gallery-gap:40px] lg:[--column-width:calc((100cqw-80px)/3)]"
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
              <button
                ref={(node) => { triggers.current[index] = node; }}
                type="button"
                onClick={() => openPhoto(index)}
                aria-label={`View photograph ${index + 1} of ${photos.length}: ${item.photo?.alt}`}
                className="block w-full cursor-zoom-in text-left transition-opacity hover:opacity-90 motion-reduce:transition-none"
              >
                <Image
                  src={item.photo.src}
                  alt=""
                  placeholder={item.photo.src.blurDataURL ? "blur" : "empty"}
                  sizes="(min-width: 1440px) 422px, (min-width: 1024px) calc((100vw - 176px) / 3), (min-width: 640px) calc((100vw - 96px) / 2), calc(100vw - 40px)"
                  preload={index === 0}
                  fetchPriority={index > 2 ? "low" : undefined}
                  className="block h-auto w-full"
                />
              </button>
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
      {!preview && (
        <dialog
          ref={dialogRef}
          aria-labelledby="photo-viewer-title"
          onClose={handleClose}
          onClick={(event) => {
            if (event.target === event.currentTarget) closePhoto();
          }}
          className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none overflow-y-auto border-0 bg-transparent p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={closePhoto}
            aria-label="Close photograph"
            className="fixed top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg hover:bg-neutral-200 sm:top-6 sm:right-6"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2">
              <path d="M5 5 19 19M19 5 5 19" strokeLinecap="round" />
            </svg>
          </button>
          <div
            className="flex min-h-dvh items-center justify-center p-4 sm:p-8"
            onClick={(event) => {
              if (event.target === event.currentTarget) closePhoto();
            }}
          >
            {activePhoto && (
              <>
                <h2 id="photo-viewer-title" className="sr-only">
                  Photograph {activeIndex! + 1} of {photos.length}
                </h2>
                <div
                  className="relative max-w-full shadow-2xl"
                  style={{
                    aspectRatio: `${activePhoto.src.width} / ${activePhoto.src.height}`,
                    width: `min(calc(100vw - 2rem), ${viewerHeightWidth})`,
                  }}
                >
                  <Image
                    fill
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    placeholder={activePhoto.src.blurDataURL ? "blur" : "empty"}
                    sizes={viewerSizes}
                    loading="eager"
                    fetchPriority="high"
                    className="object-contain"
                  />
                </div>
              </>
            )}
          </div>
        </dialog>
      )}
    </div>
  );
}
