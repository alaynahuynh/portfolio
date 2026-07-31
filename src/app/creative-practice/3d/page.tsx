import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
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
    <section className="bg-desk py-24 sm:py-32">
      <Container>
        <Link
          href="/#creative-practice"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to the workspace
        </Link>
        <Heading level={1} className="mt-4">
          3D Works
        </Heading>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">
          Objects, models, sculpture, furniture, and physical experiments.
        </p>

        <div id={featured.slug} className="mt-16 scroll-mt-24 flex justify-center">
          <div className="relative aspect-4/3 w-full max-w-2xl">
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              sizes="(min-width: 768px) 640px, 90vw"
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
        <p className="mt-4 text-center font-heading text-xl">{featured.title}</p>

        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          {rest.map((object) => (
            <div key={object.slug} id={object.slug} className="flex scroll-mt-24 flex-col items-center">
              <div className="relative aspect-square w-full max-w-xs">
                <Image
                  src={object.src}
                  alt={object.alt}
                  fill
                  sizes="320px"
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <p className="mt-4 font-heading text-lg">{object.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
