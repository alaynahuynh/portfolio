import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import {
  ObjectAngleGallery,
  type ObjectGalleryLayout,
} from "@/components/sections/ObjectAngleGallery";
import { threeDObjects } from "@/data/creative-practice";

const layouts: ObjectGalleryLayout[] = ["pair", "feature", "row"];

export const metadata: Metadata = {
  title: "3D Works",
};

/**
 * The full 3D collection as one continuous editorial gallery: each
 * piece's photos are grouped (see ObjectAngleGallery — pair / feature /
 * row) and the groups stack at the same gutter, with no per-piece text.
 * Per-project case-study pages (materials, process, construction) are a
 * later phase; nothing here is invented in the meantime.
 */
export default function ThreeDWorksPage() {
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
          3D Works
        </Heading>
        <p className="font-alayna-handwriting mt-3 max-w-xl text-lg text-muted-foreground">
          I have always loved working with my hands, and building my own 3D projects.
        </p>

        <div className="mx-auto mt-16 max-w-[1200px] space-y-4 sm:mt-20 sm:space-y-5">
          {threeDObjects.map((object, i) => (
            <ObjectAngleGallery
              key={object.slug}
              object={object}
              layout={layouts[i % layouts.length]}
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
