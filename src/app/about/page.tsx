import type { Metadata } from "next";
import { AboutPhotoBrowser } from "@/components/sections/AboutPhotoBrowser";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { HintArrow } from "@/components/ui/HintArrow";

export const metadata: Metadata = {
  title: "About",
};

/**
 * A clean, editorial About page — significantly simpler than the
 * Playground, since illustrated personality is meant to concentrate
 * there (and in the hero/closing scene), not here. The bio paragraphs
 * below are the same real story that used to live as a scrapbook page
 * inside the sketchbook (see the old AboutScrapbookPage.tsx) — now
 * standalone, at its own reachable URL, rather than only found by
 * flipping all the way through the book.
 */
export default function AboutPage() {
  return (
    <div className="bg-background">
      <Container className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="mx-auto grid max-w-3xl gap-10 sm:grid-cols-[15rem_1fr] sm:gap-12 lg:max-w-5xl lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-[15rem] sm:mx-0 lg:max-w-none">
            {/* Handwritten hint, like the hero's, with the arrow pointing
                down at the photo window's own reload button. In flow on
                mobile; floated above the window (sm+) so the window still
                lines up with the heading. */}
            <p className="pointer-events-none mb-1 ml-15 flex -rotate-2 items-center gap-1.5 font-alayna-handwriting text-[1.125rem] leading-none whitespace-nowrap text-sage-deep select-none sm:absolute sm:bottom-full sm:left-0 sm:text-[1.1875rem]">
              <HintArrow className="h-[1.1em] w-auto shrink-0 translate-y-[0.35em] -scale-y-100" />
              Reload here to see more
            </p>
            <AboutPhotoBrowser />
          </div>

          <div>
            <Heading level={1} className="font-alayna-handwriting font-normal text-4xl sm:text-5xl">
              Hi, I&apos;m Alayna.
            </Heading>

            <div className="mt-6 space-y-4 text-lg text-muted-foreground">
              <p>
                Ever since I was a kid, I&apos;ve loved making things — drawing, painting, and building with my hands.
              </p>
              <p>
                Somewhere along the way, I became curious about why certain products and interfaces just feel right to
                use. That curiosity led me to product design, where I get to combine creativity, problem-solving, and
                an understanding of people.
              </p>
              <p>
                I still paint and make things outside of a screen, and that hands-on way of thinking shapes how I
                design digitally.
              </p>
              <p>
                I&apos;m currently studying UX design at the University of Michigan, and I&apos;m happiest when
                I&apos;m creating something that feels thoughtful, useful, and human.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
