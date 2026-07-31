import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const paragraphs = [
  "Ever since I was a kid, I loved art. What began as drawing and painting eventually grew into curiosity about how objects and interfaces are created and experienced.",
  "I started designing and making thoughtful, intentional handmade products as gifts for my family. Creating with others in mind helped me understand the importance of meaningful designs for the people.",
  "This mindset naturally led me to industrial design and UI/UX at the University of Michigan, where I focus on human centered design and problem solving.",
];

/**
 * "A little bit about me" — an envelope + letter built from CSS (kraft
 * flap + airmail stripe border) so the bio copy stays real, editable
 * text rather than baked into an image.
 */
export function AboutLetter() {
  return (
    <section className="bg-graph-paper py-20 sm:py-28">
      <Container>
        <Heading level={2} className="font-handwriting text-4xl font-normal sm:text-5xl">
          A little bit about me:
        </Heading>

        <div className="mt-14 grid items-center gap-16 sm:grid-cols-2">
          {/* Envelope + letter */}
          <div className="relative mx-auto w-full max-w-md">
            {/* Kraft envelope, peeking out behind the letter */}
            <div
              aria-hidden="true"
              className="absolute top-4 -right-4 h-40 w-full rotate-3 rounded-sm bg-kraft shadow-md"
              style={{
                clipPath:
                  "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)",
              }}
            />

            {/* Letter card with airmail striped border */}
            <div
              className="relative rounded-sm p-1.5 shadow-[0_18px_30px_-12px_rgba(0,0,0,0.25)]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, var(--color-airmail-red) 0 10px, white 10px 20px, var(--color-airmail-blue) 20px 30px, white 30px 40px)",
              }}
            >
              <div className="rounded-sm bg-surface p-6 sm:p-8">
                <p className="font-handwriting text-xl leading-tight text-foreground">
                  From: Syracuse, NY
                  <br />
                  To: Ann Arbor, MI
                </p>
                <div className="mt-5 space-y-4">
                  {paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-handwriting text-xl leading-snug text-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Framed signature illustration */}
          <Image
            src="/images/home/penguin-signature.png"
            alt="A hand-drawn comic of two penguins in the rain, signed by Alayna Huynh"
            width={1434}
            height={1695}
            className="mx-auto w-full max-w-xs rotate-1"
          />
        </div>
      </Container>
    </section>
  );
}
