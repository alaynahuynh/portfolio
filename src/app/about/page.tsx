import type { Metadata } from "next";
import { AboutPhotoBrowser } from "@/components/sections/AboutPhotoBrowser";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { HintArrow } from "@/components/ui/HintArrow";
import { resumeUrl } from "@/lib/resume";
import { siteConfig, socialLinks } from "@/lib/site-config";

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
                I&apos;m currently studying UX Design at the University of Michigan, and I&apos;m especially drawn to
                projects that bring creativity, technology, and people together.
              </p>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="text-foreground underline underline-offset-4 hover:text-sage-deep">
                    {siteConfig.email}
                  </a>
                </li>
                {resumeUrl && (
                  <li>
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:text-sage-deep">
                      Resume
                    </a>
                  </li>
                )}
                {socialLinks
                  .filter((link) => link.label === "LinkedIn")
                  .map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:text-sage-deep">
                        {link.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
