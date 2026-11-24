import Image from "next/image";
import Link from "next/link";
import { paintings, threeDObjects, type Object3D, type Painting2D } from "@/data/creative-practice";
import { rememberBookScrollPosition } from "@/lib/book-return";
import { TWO_D_FEATURED } from "@/components/sections/home/TwoDSpread";
import { THREE_D_FEATURED } from "@/components/sections/home/ThreeDSpread";

/**
 * The work itself, as sketchbook pages: after the "2D Works" page come the
 * rest of the paintings two to a page, and after "3D Works" each object
 * gets a page of its own photos. So flipping the book shows everything,
 * and the separate gallery pages are only an optional "see it all at
 * once" view.
 *
 * Like the intro spreads, everything is sized in cqw against the page
 * (see SketchbookPageContent): the page is 4:3, so its usable height is
 * about 75cqw minus padding.
 */

/** Paintings not already on the "2D Works" page, two per page. */
const remainingPaintings = paintings.filter((p) => p.slug !== TWO_D_FEATURED.slug);
export const PAINTING_PAIRS: Painting2D[][] = [];
for (let i = 0; i < remainingPaintings.length; i += 2) {
  PAINTING_PAIRS.push(remainingPaintings.slice(i, i + 2));
}

export function PaintingsPage({ pair }: { pair: Painting2D[] }) {
  return (
    <div className="grid h-full w-full grid-cols-2 items-center justify-items-center gap-[5cqw]">
      {pair.map((painting) => (
        <Image
          key={painting.slug}
          src={painting.src}
          alt={painting.alt}
          width={painting.width}
          height={painting.height}
          sizes="(min-width: 1024px) 380px, 42vw"
          className="h-auto max-h-[58cqw] w-auto max-w-full object-contain shadow-[0_6px_14px_-8px_rgba(46,50,42,0.45)]"
          style={{ rotate: `${painting.rotate * 0.6}deg` }}
        />
      ))}
    </div>
  );
}

/** The object's photos for its page — skipping the one already used on
 * the "3D Works" page, at most three. */
function photosFor(object: Object3D) {
  const photos = object.slug === THREE_D_FEATURED?.slug ? object.images.slice(1) : object.images;
  return photos.slice(0, 3);
}

export function ObjectPage({ object }: { object: Object3D }) {
  const photos = photosFor(object);
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-baseline justify-between gap-[3cqw]">
        <h4 className="font-alayna-handwriting text-[length:clamp(1rem,3.9cqw,2.25rem)] leading-[1.1] text-earth">
          {object.title}
        </h4>
        {object.project && (
          <Link
            href={object.project.href}
            onClick={rememberBookScrollPosition}
            className="text-[length:clamp(0.625rem,1.5cqw,0.875rem)] font-medium whitespace-nowrap text-earth transition-colors hover:text-earth/70"
          >
            Read the case study →
          </Link>
        )}
      </div>
      <div
        className="mt-[3cqw] grid flex-1 items-center gap-[2.5cqw]"
        style={{ gridTemplateColumns: `repeat(${photos.length}, minmax(0, 1fr))` }}
      >
        {photos.map((photo) => (
          <figure key={photo.src} className="flex flex-col items-center">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 280px, 30vw"
              className="h-auto max-h-[48cqw] w-auto max-w-full rounded-[2px] object-contain shadow-[0_6px_14px_-8px_rgba(46,50,42,0.45)]"
            />
            {photo.label && (
              <figcaption className="mt-[1.2cqw] font-alayna-handwriting text-[length:clamp(0.75rem,2.1cqw,1.25rem)] leading-none text-muted-foreground">
                {photo.label}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}

export { threeDObjects as SKETCHBOOK_OBJECTS };
