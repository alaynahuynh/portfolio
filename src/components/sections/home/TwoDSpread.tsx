"use client";

import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/Heading";
import { SketchbookArtworkLink } from "@/components/sections/home/SketchbookArtworkLink";
import { paintings } from "@/data/creative-practice";
import { rememberBookScrollPosition } from "@/lib/book-return";

const featured = paintings.find((p) => p.size === "large") ?? paintings[0];

/**
 * "2D Works" spread — a single featured painting, which links into the
 * 2D gallery like the "Explore" text link does. The image itself is
 * expected to already be styled (framed, taped, whatever look is
 * wanted) before it's uploaded — this just places it, no code-drawn
 * frame/tape/rotation on top.
 */
export function TwoDSpread() {
  return (
    <div
      id="practice-2d"
      className="grid scroll-mt-24 items-center gap-10 sm:grid-cols-2 sm:gap-16"
    >
      <div className="mx-auto w-full max-w-sm">
        <SketchbookArtworkLink
          href="/creative-practice/2d"
          gallery="2D Works"
          accentClassName="text-earth"
        >
          <Image
            src={featured.src}
            alt={featured.alt}
            width={featured.width}
            height={featured.height}
            sizes="(min-width: 640px) 380px, 80vw"
            className="h-auto w-full"
          />
        </SketchbookArtworkLink>
      </div>

      <div>
        <Heading level={3} size={2} className="font-alayna-handwriting text-earth">
          2D Works
        </Heading>
        <p className="font-alayna-handwriting mt-4 max-w-md text-3xl text-muted-foreground">
          Painting, drawing, illustration, and visual exploration.
        </p>
        <Link
          href="/creative-practice/2d"
          data-cursor="explore"
          onClick={rememberBookScrollPosition}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-earth transition-colors hover:text-earth/70"
        >
          Explore 2D Works →
        </Link>
      </div>
    </div>
  );
}
