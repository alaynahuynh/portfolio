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
 *
 * Like TwoDSpread, always two columns sized in container units of the
 * page, so it reads the same on a phone as on desktop.
 */
export function ThreeDSpread() {
  return (
    <div
      id="practice-3d"
      className="grid w-full scroll-mt-24 grid-cols-2 items-center gap-[6.5cqw]"
    >
      <div>
        <Heading level={3} size={2} className="font-alayna-handwriting text-[length:clamp(1rem,3.9cqw,2.25rem)] leading-[1.1] text-earth sm:text-[length:clamp(1rem,3.9cqw,2.25rem)]">
          3D Works
        </Heading>
        <p className="font-alayna-handwriting mt-[1.7cqw] text-[length:clamp(0.8125rem,3.2cqw,1.875rem)] leading-[1.25] text-muted-foreground">
          I have always loved working with my hands, and building my own 3D projects.
        </p>
        <Link
          href="/creative-practice/3d"
          data-cursor="explore"
          onClick={rememberBookScrollPosition}
          className="mt-[2.6cqw] inline-flex items-center gap-1.5 text-[length:clamp(0.625rem,1.5cqw,0.875rem)] font-medium text-earth transition-colors hover:text-earth/70"
        >
          Explore 3D Works →
        </Link>
      </div>

      {featured && (
        <div className="w-full">
          <SketchbookArtworkLink
            href="/creative-practice/3d"
            gallery="3D Works"
            accentClassName="text-earth"
            annotationClassName="right-auto left-1/2 mt-[1.2cqw] -translate-x-1/2 text-[length:clamp(0.75rem,2.1cqw,1.25rem)]"
          >
            <Image
              src={featured.images[0].src}
              alt={featured.images[0].alt}
              width={featured.images[0].width}
              height={featured.images[0].height}
              sizes="(min-width: 1024px) 400px, 45vw"
              className="aspect-11/12 h-auto w-full object-cover"
              priority
            />
          </SketchbookArtworkLink>
        </div>
      )}
    </div>
  );
}
