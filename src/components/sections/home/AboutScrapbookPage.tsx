import Image from "next/image";
import { Tape } from "@/components/sections/home/DeskProps";

const paragraphs = [
  "Ever since I was a kid, I've loved making things — drawing, painting, and building with my hands.",
  "Somewhere along the way, I became curious about why certain products and interfaces just feel right to use. That curiosity led me to product design, where I get to combine creativity, problem-solving, and an understanding of people.",
  "I still paint and make things outside of a screen, and that hands-on way of thinking shapes how I design digitally.",
  "I'm currently studying UX design at the University of Michigan, and I'm happiest when I'm creating something that feels thoughtful, useful, and human.",
];

/**
 * A dried, pressed-looking flower — thin stroke rather than a filled
 * blob, muted tones — for the "stuck between the pages" scrapbook
 * detail, distinct from the
 *  fuller meadow flowers used elsewhere.
 */
function PressedFlower({
  size = 34,
  color = "var(--color-mauve)",
  rotate = 0,
}: {
  size?: number;
  color?: string;
  rotate?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <g fill="none" stroke={color} strokeWidth="1.2" opacity="0.7">
        <ellipse cx="20" cy="10" rx="5.5" ry="8" />
        <ellipse cx="20" cy="30" rx="5.5" ry="8" />
        <ellipse cx="10" cy="20" rx="8" ry="5.5" />
        <ellipse cx="30" cy="20" rx="8" ry="5.5" />
      </g>
      <circle cx="20" cy="20" r="4" fill={color} opacity="0.55" />
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="38"
        stroke={color}
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  );
}

/**
 * "About" as a scrapbook page inside the sketchbook itself, rather than
 * a separate webpage section — a taped photo, a hand-drawn doodle, a
 * couple of pressed flowers, and a conversational story. Sits inside
 * BookPage/PageContent, which already supplies the parchment paper
 * texture, so this only lays down content.
 */
export function AboutScrapbookPage() {
  return (
    <div className="relative mx-auto grid w-full max-w-2xl gap-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
      <div className="relative mx-auto w-full max-w-[13rem] shrink-0 rotate-[-2deg] sm:mx-0">
        <Tape colorIndex={0} className="-top-3 -left-3 -rotate-45" />
        <Tape colorIndex={4} className="-top-3 -right-3 rotate-45" />
        <Image
          src="/images/home/headshot.jpg"
          alt="Portrait of Alayna Huynh"
          width={1120}
          height={1400}
          className="w-full shadow-md"
        />
        <div className="absolute -right-4 -bottom-4 rotate-12">
          <PressedFlower size={30} color="var(--color-blush)" />
        </div>
      </div>

      <div className="relative">
        <p className="font-alayna-handwriting text-4xl text-meadow sm:text-5xl">
          About me
        </p>
        <div className="mt-4 space-y-3">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="font-alayna-handwriting text-lg leading-snug text-foreground sm:text-xl"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="absolute top-0 right-2 hidden sm:block">
          <PressedFlower
            size={26}
            color="var(--color-sage-deep)"
            rotate={-15}
          />
        </div>
      </div>
    </div>
  );
}
