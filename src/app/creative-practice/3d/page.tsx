import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ObjectPhotoFan } from "@/components/sections/ObjectPhotoFan";
import { threeDObjects } from "@/data/creative-practice";

export const metadata: Metadata = {
  title: "3D Works",
};

/**
 * The full 3D collection. Intentionally simple for now — a clean display
 * at the size hierarchy the pieces already carry (Eye Table featured,
 * Pig Lamp/Monkey Sculpture supporting). Per-project case-study pages
 * (materials, process, construction) are a later phase; nothing here is
 * invented in the meantime.
 */
export default function ThreeDWorksPage() {
  const [featured, ...rest] = threeDObjects.sort((a, b) => {
    const order = { large: 0, medium: 1, small: 2 };
    return order[a.size] - order[b.size];
  });

  return (
    <section className="overflow-x-hidden bg-desk py-24 sm:py-32">
      <Container>
        <Link
          href="/#creative-practice"
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

        <div
          id={featured.slug}
          className="mt-16 scroll-mt-24 flex justify-center"
        >
          <div className="w-full max-w-2xl">
            <ObjectPhotoFan images={featured.images} />
          </div>
        </div>
        <p className="mt-4 text-center font-heading text-xl">
          {featured.title}
        </p>

        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          {rest.map((object) => (
            <div
              key={object.slug}
              id={object.slug}
              className="flex scroll-mt-24 flex-col items-center"
            >
              <div className="w-full max-w-md">
                <ObjectPhotoFan images={object.images} />
              </div>
              <p className="mt-4 font-heading text-lg">{object.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/#creative-practice"
            className="text-sm font-medium text-sage-deep transition-colors hover:text-mauve-deep"
          >
            ← Return to the book
          </Link>
        </div>
      </Container>
    </section>
  );
}
