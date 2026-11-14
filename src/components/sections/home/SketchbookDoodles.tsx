import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Hand-drawn doodles scattered around the sketchbook, so the book isn't
 * floating on an empty page. Purely decorative (aria-hidden, no pointer
 * events) and sits *behind* the book.
 *
 * They appear gradually as the reader scrolls: PlaygroundBook writes a
 * single 0–1 `--doodle-p` custom property onto this layer each frame (the
 * book rising in, then the page turns), and each doodle fades/pops in once
 * that passes its own `at` threshold. All of it is CSS on one variable,
 * so scrolling never re-renders React.
 *
 * Placement: the open book covers most of the left half on desktop (its
 * left page runs off-screen), while the right edge and the top/bottom
 * corners stay clear the whole time, so most desktop doodles live there.
 * Left-side ones show while the book is closed and tuck under the left
 * page like doodles on the desk underneath it. Between `lg` and 1400px the
 * book is wider, so only the edge doodles show. Below `lg`, the book spans
 * the width, so doodles move to the bands above and below it instead.
 *
 * PNGs are cut from Alayna's own doodle sheets (public/images/doodles);
 * the SVG ones are drawn to match (same palette, crayon grain filter).
 */

const C = {
  yellow: "#F4C430",
  lemon: "#FFE34D",
  pink: "#FF8DC1",
  blush: "#F8C6E2",
  lavender: "#9C7BDB",
  peach: "#FFAE94",
  brown: "#9A6A3A",
};

type Pos = { left?: string; right?: string; top: string; w: string; rot?: number };
type Doodle = {
  /** PNG in /images/doodles, or an SVG kind below. */
  src?: string;
  svg?: SvgKind;
  /** Natural size, for next/image's aspect ratio. */
  size?: [number, number];
  /** 0–1 point in the scroll where this one appears. */
  at: number;
  /** Placement on large screens (omit to hide there). */
  d?: Pos;
  /** Placement below `lg` (omit to hide there). */
  m?: Pos;
  /** Sits at the very edge or corner, so it stays clear of the wider
   * book on smaller desktops (1024–1399px). Others show from 1400px up. */
  edge?: boolean;
};

type SvgKind = "heart" | "sparkle" | "squiggle" | "dots" | "moon" | "cloud" | "ring" | "zigzag";

const DOODLES: Doodle[] = [
  // ---- right edge: always clear on desktop
  { src: "shooting-stars.png", edge: true, size: [317, 343], at: 0.02, d: { right: "2%", top: "13%", w: "clamp(90px,8.5vw,150px)", rot: 6 }, m: { right: "5%", top: "12%", w: "84px", rot: 6 } },
  { svg: "sparkle", edge: true, at: 0.1, d: { right: "13%", top: "11%", w: "clamp(22px,1.8vw,32px)" }, m: { left: "44%", top: "13%", w: "22px" } },
  { src: "flower-1.png", size: [252, 246], at: 0.16, d: { right: "8.5%", top: "34%", w: "clamp(64px,5.6vw,100px)", rot: -8 } },
  { svg: "squiggle", edge: true, at: 0.24, d: { right: "1.5%", top: "46%", w: "clamp(56px,4.6vw,84px)", rot: -12 }, m: { left: "6%", top: "84%", w: "70px", rot: -6 } },
  { src: "squiggle-flower.png", size: [324, 324], at: 0.3, d: { right: "9%", top: "56%", w: "clamp(70px,6vw,110px)", rot: 12 }, m: { right: "8%", top: "77%", w: "74px", rot: 10 } },
  { src: "star-small.png", edge: true, size: [147, 162], at: 0.38, d: { right: "2.5%", top: "64%", w: "clamp(34px,2.8vw,52px)", rot: -10 } },
  { svg: "heart", at: 0.46, d: { right: "13.5%", top: "75%", w: "clamp(30px,2.6vw,46px)", rot: -8 }, m: { left: "40%", top: "88%", w: "34px", rot: -8 } },
  { src: "flower-5.png", edge: true, size: [253, 251], at: 0.54, d: { right: "3%", top: "79%", w: "clamp(66px,5.4vw,96px)", rot: 6 } },
  { svg: "dots", at: 0.62, d: { right: "8%", top: "90%", w: "clamp(44px,3.6vw,64px)" }, m: { right: "30%", top: "92%", w: "50px" } },
  { src: "star-tiny.png", size: [113, 109], at: 0.7, d: { right: "14.5%", top: "48%", w: "clamp(22px,1.8vw,32px)", rot: 14 } },

  // ---- top and bottom corners on the left: clear except the left page's edge
  { src: "star-big.png", edge: true, size: [304, 317], at: 0.05, d: { left: "2%", top: "10%", w: "clamp(80px,7vw,128px)", rot: -10 }, m: { left: "6%", top: "12%", w: "80px", rot: -10 } },
  { svg: "moon", edge: true, at: 0.2, d: { left: "11%", top: "9%", w: "clamp(30px,2.6vw,46px)", rot: -18 } },
  { src: "spiral", size: [231, 215], at: 0.34, d: { left: "3%", top: "86%", w: "clamp(56px,4.6vw,84px)", rot: 8 }, m: { left: "64%", top: "85%", w: "56px", rot: 8 } },
  { src: "flower-6.png", size: [197, 193], at: 0.5, d: { left: "11%", top: "90%", w: "clamp(40px,3.4vw,60px)", rot: -6 }, m: { left: "26%", top: "79%", w: "44px", rot: -6 } },
  { svg: "zigzag", at: 0.66, d: { right: "15%", top: "93%", w: "clamp(44px,3.4vw,62px)", rot: 4 } },

  // ---- left gutter: shows with the closed book, tucks under the open page
  { src: "flower-3.png", size: [305, 327], at: 0.08, d: { left: "4%", top: "36%", w: "clamp(80px,7vw,124px)", rot: 10 }, m: { right: "30%", top: "15%", w: "62px", rot: 10 } },
  { src: "egg.png", size: [211, 252], at: 0.14, d: { left: "11.5%", top: "58%", w: "clamp(40px,3.4vw,60px)", rot: -14 }, m: { left: "28%", top: "19%", w: "40px", rot: -14 } },
  { svg: "ring", at: 0.22, d: { left: "2%", top: "64%", w: "clamp(28px,2.4vw,42px)" } },
  { src: "flower-2.png", size: [204, 194], at: 0.28, d: { left: "12%", top: "24%", w: "clamp(44px,3.6vw,64px)", rot: 6 } },
  { svg: "cloud", at: 0.4, d: { left: "4%", top: "73%", w: "clamp(60px,5vw,90px)", rot: -4 }, m: { left: "70%", top: "20%", w: "64px", rot: -4 } },
  { src: "flower-4.png", size: [225, 229], at: 0.58, d: { left: "1.5%", top: "50%", w: "clamp(48px,4vw,70px)", rot: 12 } },
];

function Svg({ kind }: { kind: SvgKind }) {
  const common = {
    viewBox: "0 0 100 100",
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    filter: "url(#doodle-crayon)",
    className: "block h-auto w-full overflow-visible",
  };
  switch (kind) {
    case "heart":
      return (
        <svg {...common}>
          <path
            d="M50 84 C22 64 10 46 18 30 C26 15 44 18 50 34 C56 18 74 15 82 30 C90 46 78 64 50 84Z"
            fill={C.blush}
            stroke={C.pink}
            strokeWidth={7}
          />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M50 6 Q55 44 94 50 Q55 56 50 94 Q45 56 6 50 Q45 44 50 6Z" fill={C.yellow} />
        </svg>
      );
    case "squiggle":
      return (
        <svg {...common} viewBox="0 0 120 60">
          <path d="M6 34 Q18 8 30 34 T54 34 T78 34 T102 34 T114 26" stroke={C.lavender} strokeWidth={7} />
        </svg>
      );
    case "zigzag":
      return (
        <svg {...common} viewBox="0 0 120 50">
          <path d="M6 36 L22 14 L38 36 L54 14 L70 36 L86 14 L102 36 L114 20" stroke={C.pink} strokeWidth={7} />
        </svg>
      );
    case "dots":
      return (
        <svg {...common} viewBox="0 0 100 60">
          <circle cx="16" cy="38" r="11" fill={C.pink} />
          <circle cx="50" cy="20" r="9" fill={C.lemon} />
          <circle cx="82" cy="40" r="12" fill={C.lavender} />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M62 10 A42 42 0 1 0 90 72 A33 33 0 1 1 62 10Z" fill={C.lemon} stroke={C.yellow} strokeWidth={5} />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common} viewBox="0 0 100 70">
          <path
            d="M24 58 Q8 58 10 44 Q12 32 26 34 Q28 16 46 18 Q58 6 70 20 Q88 18 88 36 Q96 56 76 58 Z"
            stroke={C.pink}
            strokeWidth={6}
          />
        </svg>
      );
    case "ring":
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="32" stroke={C.peach} strokeWidth={9} />
        </svg>
      );
  }
}

/** Crayon grain: a slightly wobbly edge plus speckled coverage. */
function CrayonFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <filter id="doodle-crayon" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="wobble" />
          <feDisplacementMap in="SourceGraphic" in2="wobble" scale="3" xChannelSelector="R" yChannelSelector="G" result="shaky" />
          <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="1" seed="11" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.3 0 0 0 1.45" result="mask" />
          <feComposite in="shaky" in2="mask" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

function placement(p: Pos): React.CSSProperties {
  return {
    left: p.left,
    right: p.right,
    top: p.top,
    width: p.w,
    ["--rot" as string]: `${p.rot ?? 0}deg`,
  };
}

function Piece({ d, pos, className }: { d: Doodle; pos: Pos; className: string }) {
  return (
    <div
      className={cn("doodle absolute", className)}
      style={{ ...placement(pos), ["--at" as string]: d.at }}
    >
      <div className="doodle-sway">
        {d.svg ? (
          <Svg kind={d.svg} />
        ) : (
          <Image
            src={`/images/doodles/${d.src!.endsWith(".png") ? d.src : `${d.src}.png`}`}
            alt=""
            width={d.size![0]}
            height={d.size![1]}
            sizes="130px"
            className="block h-auto w-full"
          />
        )}
      </div>
    </div>
  );
}

export function SketchbookDoodles({ layerRef }: { layerRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="sketchbook-doodles pointer-events-none absolute inset-0 overflow-hidden select-none"
      style={{ ["--doodle-p" as string]: 0 }}
    >
      <CrayonFilter />
      {DOODLES.map((d, i) => (
        <span key={i}>
          {d.d && <Piece d={d} pos={d.d} className={d.edge ? "hidden lg:block" : "hidden min-[1400px]:block"} />}
          {d.m && <Piece d={d} pos={d.m} className="lg:hidden" />}
        </span>
      ))}
    </div>
  );
}
