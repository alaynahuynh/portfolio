"use client";

import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/Heading";
import { threeDObjects } from "@/data/creative-practice";
import { rememberBookScrollPosition } from "@/lib/book-return";

const bySize = Object.fromEntries(threeDObjects.map((o) => [o.size, o]));
const featured = bySize.large;

/**
 * "3D Works" spread — a single featured photo (Eye Table). The image
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
        <Heading level={3} size={2} className="font-alayna-handwriting text-sky">
          3D Works
        </Heading>
        <p className="font-alayna-handwriting mt-4 max-w-md text-3xl text-muted-foreground">
          I have always loved working with my hands, and building my own 3D projects.
        </p>
        <Link
          href="/creative-practice/3d"
          data-cursor="explore"
          onClick={rememberBookScrollPosition}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-sky transition-colors hover:text-sky/70"
        >
          Explore 3D Works →
        </Link>
      </div>

      {featured && (
        <div className="order-1 mx-auto w-full max-w-sm sm:order-2">
          <Image
            src={featured.images[0].src}
            alt={featured.images[0].alt}
            width={featured.images[0].width}
            height={featured.images[0].height}
            sizes="(min-width: 640px) 380px, 80vw"
            className="h-auto w-full"
            priority
          />
        </div>
      )}
    </div>
  );
}
