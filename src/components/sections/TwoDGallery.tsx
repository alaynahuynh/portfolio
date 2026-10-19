"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { JustifiedRow } from "@/components/ui/JustifiedRow";
import { paintings, type Painting2D } from "@/data/creative-practice";

/**
 * Rows of the gallery, by slug: grouped so each row's combined
 * proportions come out at a similar height (landscapes paired, portraits
 * in threes). Any painting not listed here is appended in rows of three.
 */
const rowSlugs: string[][] = [
  ["waterfall-gorge", "garden-boat", "lake-geese"],
  ["goldfish-bag", "duckette-comic"],
  ["sunflowers", "portrait-boy", "still-life"],
  ["ah-ma", "australopithecus-sediba", "patchwork-portrait"],
];

const bySlug = new Map(paintings.map((p) => [p.slug, p]));
const listed = new Set(rowSlugs.flat());
const unlisted = paintings.filter((p) => !listed.has(p.slug));
const rows: Painting2D[][] = [
  ...rowSlugs.map((slugs) =>
    slugs.flatMap((slug) => bySlug.get(slug) ?? []),
  ),
  ...Array.from({ length: Math.ceil(unlisted.length / 3) }, (_, i) =>
    unlisted.slice(i * 3, i * 3 + 3),
  ),
].filter((row) => row.length > 0);

/**
 * The full 2D collection as one continuous editorial gallery, matching
 * the 3D works page: paintings in equal-height rows at a consistent
 * gutter, no frames or captions.
 */
export function TwoDGallery() {
  return (
    <section className="overflow-x-hidden bg-sketchbook-paper py-24 sm:py-32">
      <Container>
        <Link
          href="/playground"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Return to the book
        </Link>
        <Heading level={1} className="mt-4 font-alayna-handwriting">
          2D Works
        </Heading>
        <p className="font-alayna-handwriting mt-3 max-w-xl text-2xl md:text-3xl text-muted-foreground">
          Some of my paintings, drawings, and illustrations.
        </p>

        <div className="mx-auto mt-16 max-w-[1200px] space-y-4 sm:mt-20 sm:space-y-5">
          {rows.map((row) => (
            <JustifiedRow
              key={row[0].slug}
              images={row}
              stackOnMobile
              render={(painting) => (
                <div id={painting.slug} className="scroll-mt-24">
                  <Image
                    src={painting.src}
                    alt={painting.alt}
                    width={painting.width}
                    height={painting.height}
                    sizes="(min-width: 1024px) 600px, (min-width: 640px) 45vw, 92vw"
                    className="h-auto w-full"
                  />
                </div>
              )}
            />
          ))}
        </div>

        <div className="mt-20 text-center lg:mt-24">
          <Link
            href="/playground"
            className="text-sm font-medium text-sage-deep transition-colors hover:text-mauve-deep"
          >
            ← Return to the book
          </Link>
        </div>
      </Container>
    </section>
  );
}
