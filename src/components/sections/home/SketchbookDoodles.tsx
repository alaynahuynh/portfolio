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
  lemon: "#FFE34D",
  pink: "#FF8DC1",
  blush: "#F8C6E2",
  lavender: "#9C7BDB",
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

type SvgKind = "heart" | "squiggle" | "dots";

const DOODLES: Doodle[] = [
  // Balanced on large screens: one in each left corner, a column down the
  // right edge (the side the open book always leaves clear), and one low
  // near the middle. They alternate sides as they arrive.
  // On phones: three above the book and three below, mirrored.
  { src: "flower-3.png", edge: true, size: [305, 327], at: 0.04, d: { left: "4%", top: "13%", w: "clamp(76px,6.4vw,112px)", rot: 10 }, m: { left: "8%", top: "15%", w: "64px", rot: 10 } },
  { src: "flower-1.png", edge: true, size: [252, 246], at: 0.12, d: { right: "4%", top: "15%", w: "clamp(64px,5.4vw,96px)", rot: -8 }, m: { right: "9%", top: "14%", w: "58px", rot: -8 } },
  { svg: "squiggle", at: 0.22, d: { right: "11%", top: "36%", w: "clamp(56px,4.4vw,80px)", rot: -12 }, m: { left: "44%", top: "20%", w: "56px", rot: -8 } },
  { src: "spiral.png", size: [231, 215], at: 0.32, d: { left: "4%", top: "52%", w: "clamp(56px,4.6vw,84px)", rot: 8 } },
  { src: "squiggle-flower.png", size: [324, 324], at: 0.42, d: { right: "3.5%", top: "55%", w: "clamp(68px,5.6vw,104px)", rot: 12 }, m: { right: "8%", top: "80%", w: "66px", rot: 10 } },
  { svg: "heart", at: 0.52, d: { right: "12%", top: "74%", w: "clamp(30px,2.6vw,46px)", rot: -8 }, m: { left: "45%", top: "87%", w: "32px", rot: -8 } },
  { src: "flower-6.png", size: [197, 193], at: 0.62, d: { left: "4%", top: "95.5%", w: "clamp(40px,3.2vw,58px)", rot: -6 }, m: { left: "9%", top: "82%", w: "48px", rot: -6 } },
  { src: "flower-5.png", size: [253, 251], at: 0.72, d: { right: "4%", top: "86%", w: "clamp(60px,5vw,90px)", rot: 6 } },
  { svg: "dots", at: 0.82, d: { left: "50%", top: "96%", w: "clamp(44px,3.4vw,60px)" } },
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
    case "squiggle":
      return (
        <svg {...common} viewBox="0 0 120 60">
          <path d="M6 34 Q18 8 30 34 T54 34 T78 34 T102 34 T114 26" stroke={C.lavender} strokeWidth={7} />
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
            src={`/images/doodles/${d.src}`}
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
