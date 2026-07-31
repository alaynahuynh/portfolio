import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Tape } from "@/components/sections/home/DeskProps";

const passions = [
  "UI/UX",
  "Creating functional and appealing designs (specifically products that solve problems)",
  "Art, drawing, painting",
  "Music + Piano",
];

/**
 * "Hi, I'm Alayna!" sticky note + taped photo. The note is built with
 * CSS (no image asset) so the bio text stays real, editable, and
 * readable by screen readers — see PROJECT_GUIDE.md.
 */
export function StickyNoteBio() {
  return (
    <section className="bg-graph-paper py-20 sm:py-28">
      <Container className="grid items-center gap-16 sm:grid-cols-2">
        {/* Sticky note */}
        <div className="relative mx-auto max-w-md -rotate-2">
          <span
            aria-hidden="true"
            className="absolute -top-3 left-1/2 z-10 size-6 -translate-x-1/2 rounded-full bg-[#c23b3b] shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]"
          />
          <div className="rounded-sm bg-note-yellow p-8 shadow-[0_18px_30px_-12px_rgba(0,0,0,0.25)]">
            <p className="font-handwriting text-3xl text-[#2f3f8f]">
              Hi, I&apos;m <span className="underline">Alayna</span>!
            </p>
            <p className="mt-6 font-handwriting text-2xl text-[#2f3f8f]">
              I&apos;m passionate about:
            </p>
            <ul className="mt-2 space-y-1">
              {passions.map((passion) => (
                <li
                  key={passion}
                  className="font-handwriting text-2xl leading-snug text-[#2f3f8f]"
                >
                  – {passion}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Taped photo */}
        <div className="relative mx-auto w-full max-w-xs rotate-2">
          <Tape colorIndex={0} className="-top-3 -left-3 -rotate-45" />
          <Tape colorIndex={4} className="-top-3 -right-3 rotate-45" />
          <Image
            src="/images/home/headshot.jpg"
            alt="Portrait of Alayna Huynh"
            width={1120}
            height={1400}
            className="w-full shadow-md"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
