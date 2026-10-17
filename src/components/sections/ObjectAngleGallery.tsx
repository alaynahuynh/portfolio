"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { JustifiedRow } from "@/components/ui/JustifiedRow";
import type { Object3D, Object3DImage } from "@/data/creative-practice";

/**
 * How a piece's photos are grouped:
 * - "pair": two photos side by side, the rest in a second full-width row
 * - "feature": one large photo beside a column of supporting angles
 * - "row": every photo in one aligned row
 */
export type ObjectGalleryLayout = "pair" | "feature" | "row";

const aspect = (image: Object3DImage) => image.width / image.height;

/**
 * One 3D piece's group of photos, with no text of its own: the page
 * stacks the groups at the same gutter as the photos inside them, so the
 * whole collection reads as one continuous gallery. Photos sit straight
 * on the page at their own proportions; clicking one opens the lightbox.
 */
export function ObjectAngleGallery({
  object,
  layout,
}: {
  object: Object3D;
  layout: ObjectGalleryLayout;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const { images } = object;

  function photo(image: Object3DImage, sizes: string, className?: string) {
    return (
      <button
        type="button"
        onClick={() => setLightboxIndex(images.indexOf(image))}
        aria-label={`Enlarge photo: ${image.alt}`}
        className="block h-full w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mauve-deep"
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          className={cn("h-auto w-full transition-opacity duration-300 hover:opacity-90", className)}
        />
      </button>
    );
  }

  const [lead, ...rest] = images;
  if (!lead) return null;

  let spread: React.ReactNode;

  if (layout === "pair") {
    spread = (
      <div className="space-y-4 sm:space-y-5">
        <JustifiedRow
          images={images.slice(0, 2)}
          stackOnMobile
          render={(image) => photo(image, "(min-width: 1024px) 760px, 92vw")}
        />
        {images.length > 2 && (
          <JustifiedRow
            images={images.slice(2)}
            render={(image) => photo(image, "(min-width: 1024px) 600px, 46vw")}
          />
        )}
      </div>
    );
  } else if (layout === "feature") {
    // Size the lead column so its photo comes out as tall as the stacked
    // supporting photos beside it: at equal column widths, the lead's
    // 1/aspect must match the sum of the supports' 1/aspect.
    const leadRatio =
      aspect(lead) * rest.reduce((sum, image) => sum + 1 / aspect(image), 0);
    spread = (
      <div
        className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-(--cols)"
        style={{ "--cols": `${leadRatio || 2}fr 1fr` } as React.CSSProperties}
      >
        {photo(lead, "(min-width: 1024px) 800px, 92vw", "lg:h-full lg:object-cover")}
        {rest.length > 0 && (
          <div className="grid grid-cols-2 items-end gap-4 sm:gap-5 lg:grid-cols-1">
            {rest.map((image) => (
              <div key={image.src}>
                {photo(image, "(min-width: 1024px) 380px, 46vw")}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    spread = (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
        {images.map((image, i) => (
          <div key={image.src} className={cn(i === 0 && "col-span-2 sm:col-span-1")}>
            {photo(image, "(min-width: 1024px) 400px, (min-width: 640px) 31vw, 92vw")}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div id={object.slug} aria-label={object.title} role="group" className="scroll-mt-24">
      {spread}

      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
