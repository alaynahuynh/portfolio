"use client";

import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/Heading";
import { SketchbookArtworkLink } from "@/components/sections/home/SketchbookArtworkLink";
import { threeDObjects } from "@/data/creative-practice";
import { rememberBookScrollPosition } from "@/lib/book-return";

const bySize = Object.fromEntries(threeDObjects.map((o) => [o.size, o]));
const featured = bySize.large;

/**
 * "3D Works" spread — a single featured photo (Eye Table), which links
 * into the 3D gallery like the "Explore" text link does. The landscape
 * shot is cropped at the sides (object-cover, 11:12) so the table fills
 * about as much of the page as the 2D spread's waterfall. The image
 * itself is expected to already be styled (framed, taped, whatever look
 * is wanted) before it's uploaded — this just places it, no code-drawn
 * frame/tape/rotation on top.
 */
export function ThreeDSpread() {
  return (
    <div
      id="practice-3d"
      className="grid scroll-mt-24 items-center gap-10 sm:grid-cols-2 sm:gap-16"
    >
      <div className="order-2 sm:order-1">
        <Heading level={3} size={2} className="font-alayna-handwriting text-earth">
          3D Works
        </Heading>
        <p className="font-alayna-handwriting mt-4 max-w-md text-3xl text-muted-foreground">
          I have always loved working with my hands, and building my own 3D projects.
        </p>
        <Link
          href="/creative-practice/3d"
          data-cursor="explore"
          onClick={rememberBookScrollPosition}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-earth transition-colors hover:text-earth/70"
        >
          Explore 3D Works →
        </Link>
      </div>

      {featured && (
        <div className="order-1 mx-auto w-full max-w-sm sm:order-2">
          <SketchbookArtworkLink
            href="/creative-practice/3d"
            gallery="3D Works"
            accentClassName="text-earth"
            annotationClassName="right-auto left-1/2 mt-3 -translate-x-1/2"
          >
            <Image
              src={featured.images[0].src}
              alt={featured.images[0].alt}
              width={featured.images[0].width}
              height={featured.images[0].height}
              sizes="(min-width: 640px) 380px, 80vw"
              className="aspect-11/12 h-auto w-full object-cover"
              priority
            />
          </SketchbookArtworkLink>
        </div>
      )}
    </div>
  );
}
