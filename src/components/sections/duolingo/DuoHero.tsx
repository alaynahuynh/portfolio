import Image from "next/image";
import { Gaegu } from "next/font/google";
import { cn } from "@/lib/utils";

/**
 * Hero pieces for /duolingo, drawn in Duolingo's colors and chunky,
 * rounded style but made from Alayna's own story: rising "level" bars that
 * are her steps so far (from joining Duolingo in 2017 to, hopefully, a
 * Duolingo internship), her photo hopping up them, an arc of stars, and a
 * crown on the last step. Every shape is drawn here; no Duolingo artwork,
 * owl, or logo is used.
 *
 * Animation is CSS only (see the "Duolingo hero" block in globals.css) and
 * switches off under prefers-reduced-motion. Sizes use container query
 * units (cqw), so the whole scene scales as one picture.
 */

/** Alayna's handwriting font has no numerals, so digits in her notes fall
 * back to a generic font. Gaegu's thin, rounded print is a close match. */
const handDigits = Gaegu({ subsets: ["latin"], weight: "300" });

export const DUO = {
  green: "#58CC02",
  greenText: "#58A700",
  blue: "#1CB0F6",
  purple: "#CE82FF",
  orange: "#FF9600",
  yellow: "#FFC800",
  red: "#FF4B4B",
};

/** Her steps, shortest to tallest. Positions are % of the square scene. */
const STEPS = [
  { year: "2017", label: "Joined Duolingo", color: DUO.purple, h: 26 },
  { year: "2025", label: "First client site", color: DUO.blue, h: 36 },
  { year: "2026", label: "CoursePilot", color: DUO.green, h: 46 },
  { year: "2026", label: "MyMuseum", color: DUO.orange, h: 57 },
  { year: "2027", label: "Duolingo?", color: DUO.yellow, h: 68 },
];
const BAR_W = 17.5;
const GAP = 2.6;
const LEFT0 = 1.5;
const barLeft = (i: number) => LEFT0 + i * (BAR_W + GAP);

/** A chunky five-point star: an orange drop below a yellow face, with a
 * light streak. */
function Star({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const pts = "50,8 62,36 93,38 69,58 77,90 50,73 23,90 31,58 7,38 38,36";
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <polygon
        points={pts}
        transform="translate(0 7)"
        fill={DUO.orange}
        stroke={DUO.orange}
        strokeWidth={12}
        strokeLinejoin="round"
      />
      <polygon
        points={pts}
        fill={DUO.yellow}
        stroke={DUO.yellow}
        strokeWidth={12}
        strokeLinejoin="round"
      />
      <path
        d="M40 30 L58 62"
        stroke="#FFE57A"
        strokeWidth={8}
        strokeLinecap="round"
      />
    </svg>
  );
}

function Crown({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 120 90"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d="M14 66 L8 22 L36 42 L60 10 L84 42 L112 22 L106 66 Z"
        fill={DUO.yellow}
        stroke="#FFB100"
        strokeWidth={7}
        strokeLinejoin="round"
      />
      <rect x="12" y="62" width="96" height="18" rx="9" fill="#FFB100" />
      <rect x="24" y="67" width="34" height="6" rx="3" fill="#FFE57A" />
      <circle cx="60" cy="46" r="10" fill={DUO.red} />
      <circle cx="57" cy="43" r="3" fill="#FF9A9A" />
    </svg>
  );
}

/** Small rotated rounded squares, the confetti around the scene. */
const SPARKLES = [
  { left: "6%", top: "30%", size: "3.4cqw", color: "#DDF4FF" },
  { left: "70%", top: "6%", size: "4cqw", color: "#DDF4FF" },
  { left: "63%", top: "17%", size: "2.6cqw", color: "#FFDFE0" },
  { left: "95%", top: "21%", size: "3cqw", color: "#FFF1C2" },
  { left: "14%", top: "12%", size: "2.4cqw", color: "#FFF1C2" },
];

/** Stars arcing over her photo, small → big → small. */
const STARS = [
  { left: "14%", top: "17%", w: "8cqw", rot: -18 },
  { left: "22.5%", top: "7%", w: "10.5cqw", rot: -9 },
  { left: "34.5%", top: "2%", w: "13cqw", rot: 0 },
  { left: "49%", top: "7%", w: "10.5cqw", rot: 9 },
  { left: "59%", top: "17%", w: "8cqw", rot: 18 },
];

export function DuoPath() {
  const label =
    "My path so far, as rising steps: joined Duolingo in 2017, my first client site in 2025, CoursePilot and MyMuseum in 2026, and, I hope, Duolingo in 2027.";
  return (
    <div
      role="img"
      aria-label={label}
      className="duo-scene relative mx-auto aspect-square w-full max-w-[34rem] select-none [container-type:inline-size]"
    >
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="duo-pop absolute rotate-45 rounded-[0.8cqw]"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            ["--d" as string]: `${0.9 + i * 0.08}s`,
          }}
        />
      ))}

      {/* Steps */}
      {STEPS.map((s, i) => (
        <div
          key={s.year + s.label}
          className="duo-grow absolute bottom-[1.5%] flex flex-col items-center rounded-[3cqw] px-[0.5cqw] pt-[2.4cqw] text-center text-white"
          style={{
            left: `${barLeft(i)}%`,
            width: `${BAR_W}%`,
            height: `${s.h}%`,
            backgroundColor: s.color,
            boxShadow: "inset 0 -1.4cqw 0 rgb(0 0 0 / 0.12)",
            ["--d" as string]: `${0.1 + i * 0.09}s`,
          }}
        >
          <span className="text-[5.4cqw] leading-none font-black">
            {s.year}
          </span>
          <span className="mt-[1.4cqw] text-[2.45cqw] leading-tight font-extrabold">
            {s.label}
          </span>
        </div>
      ))}

      {/* Crown on the last step */}
      <Crown
        className="duo-pop absolute w-[15cqw]"
        style={{
          left: `${barLeft(4) + BAR_W / 2 - 7.5}%`,
          top: "17.5%",
          ["--d" as string]: "0.85s",
          ["--r" as string]: "8deg",
        }}
      />

      {/* Stars over her photo */}
      {STARS.map((s, i) => (
        <Star
          key={i}
          className="duo-pop absolute"
          style={{
            left: s.left,
            top: s.top,
            width: s.w,
            ["--r" as string]: `${s.rot}deg`,
            ["--d" as string]: `${0.95 + i * 0.07}s`,
          }}
        />
      ))}

      {/* Her photo, mid-hop up the steps, with little motion drops */}
      <div
        className="duo-hop absolute"
        style={{ left: "25%", top: "21%", width: "29cqw" }}
      >
        <span
          aria-hidden="true"
          className="absolute -left-[3.5cqw] top-[52%] h-[3cqw] w-[2cqw] -rotate-[30deg] rounded-full bg-[#BDEBFF]"
        />
        <span
          aria-hidden="true"
          className="absolute -left-[1cqw] top-[72%] h-[2.2cqw] w-[1.5cqw] -rotate-[45deg] rounded-full bg-[#BDEBFF]"
        />
        <div className="relative aspect-square overflow-hidden rounded-full border-[1.6cqw] border-white bg-white shadow-[0_1.4cqw_0_rgb(0_0_0/0.12)] ring-[0.7cqw] ring-[#58CC02]">
          <Image
            src="/images/about/08-cafe.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 160px, 30vw"
            className="object-cover object-[55%_30%]"
          />
        </div>
      </div>
    </div>
  );
}

/** A tiny taegeuk, for the Korean course on her profile card. */
function KoreanCourse() {
  return (
    <svg viewBox="-10 -10 20 20" aria-hidden="true" className="size-5 shrink-0">
      <circle r="10" fill="#0047A0" />
      <path
        d="M-10 0 A10 10 0 0 1 10 0 A5 5 0 0 1 0 0 A5 5 0 0 0 -10 0Z"
        fill="#CD2E3A"
      />
    </svg>
  );
}

/** Her real Duolingo profile, as a small card. */
export function DuoProfileCard({ fontClassName }: { fontClassName: string }) {
  return (
    <div className="inline-block text-left">
      <div
        className={cn(
          fontClassName,
          "inline-flex items-center gap-4 rounded-2xl border-2 border-[#E5E5E5] bg-white px-4 py-3 text-left shadow-[0_4px_0_#E5E5E5] dark:border-[#37464F] dark:bg-[#131F24] dark:shadow-[0_4px_0_#37464F]",
        )}
      >
        <div className="relative size-14 shrink-0 rounded-full bg-[#DDF4FF] p-1 outline-2 outline-offset-2 outline-[#1CB0F6] outline-dashed dark:bg-[#1A3A4A]">
          <div className="relative size-full overflow-hidden rounded-full">
            <Image
              src="/images/duolingo/me-2017.jpg"
              alt="Alayna in 2017, the year she joined Duolingo"
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-lg leading-tight font-extrabold text-[#4B4B4B] dark:text-[#F1F7FB]">
            Alayna Huynh
          </p>
          <p className="text-sm font-bold text-[#AFAFAF] dark:text-[#8B9CA5]">
            AlaynaHuyn · Joined April 2017
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-extrabold text-[#1CB0F6]">
            <KoreanCourse />
            Learning Korean
          </p>
        </div>
      </div>
      {/* Handwritten note pointing up at the avatar: it really is 2017 her. */}
      <p className="mt-1 ml-5 flex items-start gap-1.5 font-alayna-handwriting text-xl text-[#777] sm:text-2xl dark:text-[#AFC0C9]">
        <svg
          aria-hidden="true"
          viewBox="0 0 28 30"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 h-7 w-auto shrink-0"
        >
          <path d="M22 27c-9-1-15-7-14-21" />
          <path d="M3.5 10c1.6-2 3-4 4.3-6.3 1.5 2.1 3.2 4 5.2 5.6" />
        </svg>
        actually me, back in{" "}
        <span className={cn(handDigits.className, "relative top-[0.14em] text-[1.02em] leading-none")}>
          2017!
        </span>
      </p>
    </div>
  );
}
