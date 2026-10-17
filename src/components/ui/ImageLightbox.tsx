"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LightboxImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  label?: string;
}

/**
 * Full-screen viewer for a set of photos (same look as the 2D gallery's
 * lightbox). Escape / backdrop closes; arrow keys and the side buttons
 * step through the set when there's more than one photo.
 */
export function ImageLightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: LightboxImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const image = images[index];
  const count = images.length;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (count < 2) return;
      if (e.key === "ArrowRight") onIndexChange((index + 1) % count);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + count) % count);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, count, onClose, onIndexChange]);

  if (!image) return null;

  const navButton =
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/75 p-6"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <X className="size-6" />
      </button>

      <Image
        key={image.src}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="90vw"
        className="max-h-[80vh] w-auto max-w-[85vw] rounded-sm object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {count > 1 && (
        <>
          <p className="text-sm text-white/80">
            {image.label ? `${image.label} · ` : ""}
            {index + 1}/{count}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index - 1 + count) % count);
            }}
            aria-label="Previous photo"
            className={`${navButton} left-3 sm:left-6`}
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index + 1) % count);
            }}
            aria-label="Next photo"
            className={`${navButton} right-3 sm:right-6`}
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}
    </div>
  );
}
