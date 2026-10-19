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
 *
 * Always two columns, sized in container units of the page it sits on
 * (see SketchbookPageContent), so the spread keeps the same balance on a
 * phone as on desktop — just smaller.
 */
export function TwoDSpread() {
  return (
    <div
      id="practice-2d"
      className="grid w-full scroll-mt-24 grid-cols-2 items-center gap-[6.5cqw]"
    >
      <div className="w-full">
        <SketchbookArtworkLink
          href="/creative-practice/2d"
          gallery="2D Works"
          accentClassName="text-earth"
          annotationClassName="text-[length:clamp(0.75rem,2.1cqw,1.25rem)]"
        >
          <Image
            src={featured.src}
            alt={featured.alt}
            width={featured.width}
            height={featured.height}
            sizes="(min-width: 1024px) 400px, 45vw"
            className="h-auto w-full"
          />
        </SketchbookArtworkLink>
      </div>

      <div>
        <Heading level={3} size={2} className="font-alayna-handwriting text-[length:clamp(1rem,3.9cqw,2.25rem)] leading-[1.1] text-earth sm:text-[length:clamp(1rem,3.9cqw,2.25rem)]">
          2D Works
        </Heading>
        <p className="font-alayna-handwriting mt-[1.7cqw] text-[length:clamp(0.8125rem,3.2cqw,1.875rem)] leading-[1.25] text-muted-foreground">
          Paintings, drawings, and illustrations.
        </p>
        <Link
          href="/creative-practice/2d"
          data-cursor="explore"
          onClick={rememberBookScrollPosition}
          className="mt-[2.6cqw] inline-flex items-center gap-1.5 text-[length:clamp(0.625rem,1.5cqw,0.875rem)] font-medium text-earth transition-colors hover:text-earth/70"
        >
          Explore 2D Works →
        </Link>
      </div>
    </div>
  );
}
