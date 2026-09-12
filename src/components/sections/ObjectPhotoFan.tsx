"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Object3DImage } from "@/data/creative-practice";

/**
 * Multi-angle viewer for a single 3D piece. Shows the raw cover photo at
 * rest — no background, border, or rounding, just the image. Hovering (or
 * tapping, for touch) fans every photo in the collection out from the same
 * center point so all of them are visible and none sits fully behind
 * another. Falls back to a plain static photo when there's only one angle.
 */
export function ObjectPhotoFan({
  images,
  className,
}: {
  images: Object3DImage[];
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const [main, ...rest] = images;

  if (!main) return null;

  const hasMore = rest.length > 0;
  const count = images.length;

  return (
    <div
      className={cn("group relative w-full", className)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => hasMore && setActive((a) => !a)}
      tabIndex={hasMore ? 0 : undefined}
      role={hasMore ? "button" : undefined}
      aria-expanded={hasMore ? active : undefined}
      aria-label={
        hasMore
          ? `Show all ${count} angles of ${main.alt}`
          : undefined
      }
    >
      <div className="relative aspect-square w-full">
        {images.map((image, i) => {
          const offset = i - (count - 1) / 2;
          const x = active ? offset * 22 : 0;
          const y = active ? Math.abs(offset) * 5 : 0;
          const rotate = active ? offset * 11 : 0;

          return (
            <div
              key={image.src}
              className={cn(
                "absolute inset-0 origin-center transition-transform duration-500 ease-out",
                hasMore && "cursor-pointer",
              )}
              style={{
                transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)`,
                zIndex: active ? Math.round((count - Math.abs(offset)) * 10) : count - i,
                transitionDelay: active ? `${i * 40}ms` : "0ms",
              }}
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 480px, 80vw"
                  className="object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
