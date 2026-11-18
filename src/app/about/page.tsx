import type { Metadata } from "next";
import { AboutContactWindow } from "@/components/sections/AboutContactWindow";
import { AboutMediaPlayer } from "@/components/sections/AboutMediaPlayer";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

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
    <div className="sky-wash bg-background">
      <Container className="pt-28 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto grid max-w-3xl gap-10 sm:grid-cols-[15rem_1fr] sm:gap-12 lg:max-w-5xl lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-[15rem] sm:mx-0 lg:max-w-none">
            <AboutMediaPlayer />
          </div>

          <div>
            <Heading level={1} className="font-alayna-handwriting font-normal text-4xl sm:text-5xl">
              Hi, I&apos;m Alayna.
            </Heading>

            <div className="mt-6 space-y-4 text-lg text-muted-foreground">
              <p>
                I&apos;ve always loved making things. Growing up, that meant drawing, painting, and building whatever I
                could with my hands. These days, that same curiosity has found its way into digital experiences.
              </p>
              <p>
                What I love about product design is getting to think about both how something feels and how it works. I
                enjoy experimenting, figuring out what makes an interaction intuitive, and turning ideas into things
                people can actually use.
              </p>
              <p>
                Outside of designing for screens, I still love painting and making things by hand. I think working
                across physical and digital mediums has made me more curious about the little details that shape an
                experience.
              </p>
              <p>
                I&apos;m currently studying UX Design, with a minor in Industrial Design, at the University of Michigan, and I&apos;m especially drawn to
                projects where art and technology meet.
              </p>
            </div>
          </div>
        </div>

        <section
          aria-labelledby="about-contact"
          className="mx-auto mt-10 grid max-w-3xl items-center gap-10 border-t border-border pt-10 sm:mt-12 sm:pt-12 lg:max-w-5xl lg:grid-cols-[1fr_1.15fr] lg:gap-12"
        >
          <div>
            <Heading level={2} id="about-contact" className="font-alayna-handwriting font-normal text-4xl sm:text-5xl">
              Let&apos;s make something together.
            </Heading>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              Whether it&apos;s a role, a project, or just to say hi, my inbox is open. Write a note here and it&apos;ll open
              in your email app.
            </p>
          </div>
          <AboutContactWindow />
        </section>
      </Container>
    </div>
  );
}
