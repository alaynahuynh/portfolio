/**
 * Placement data for every layer in the hero painting. Every character
 * part (body/ears/face/tail) and the piano were cropped from the
 * artist's own layered PNGs, each still on the same 4320×2700 canvas the
 * background layers use — so `left`/`top`/`width` here are plain
 * percentages of that canvas and line up exactly, at any viewport size,
 * inside the aspect-ratio-locked wrapper in HeroArtScene.
 *
 * To swap in new artwork later: replace the PNG file (same name) and,
 * only if the new crop's own bounding box moved, adjust its Placement
 * here. To add a new character part (e.g. a second tail frame set), add
 * a Placement and reference it from HeroDog's props in HeroArtScene.
 */
export interface Placement {
  src: string;
  width: number;
  height: number;
  left: string;
  top: string;
  widthPct: string;
}

export const GOBI_BODY: Placement = {
  src: "/images/hero/gobi-body.png",
  width: 225,
  height: 336,
  left: "54.375%",
  top: "73.074%",
  widthPct: "5.208%",
};
export const GOBI_EARS_REST: Placement = {
  src: "/images/hero/gobi-ears-normal.png",
  width: 252,
  height: 177,
  left: "54.097%",
  top: "73.074%",
  widthPct: "5.833%",
};
export const GOBI_EARS_ALERT: Placement = { ...GOBI_EARS_REST, src: "/images/hero/gobi-ears-wide.png" };

const GOBI_FACE_BASE = { width: 124, height: 119, left: "55.394%", top: "74.889%", widthPct: "2.87%" };
export const GOBI_FACE_NORMAL: Placement = { ...GOBI_FACE_BASE, src: "/images/hero/gobi-face-normal.png" };
export const GOBI_FACE_STRAIGHT: Placement = { ...GOBI_FACE_BASE, src: "/images/hero/gobi-face-straight.png" };
export const GOBI_FACE_HAPPY: Placement = { ...GOBI_FACE_BASE, src: "/images/hero/gobi-face-happy.png" };

export const YOSHI_BODY: Placement = {
  src: "/images/hero/yoshi-body.png",
  width: 521,
  height: 552,
  left: "65.394%",
  top: "68.926%",
  widthPct: "12.06%",
};
export const YOSHI_EARS_REST: Placement = {
  src: "/images/hero/yoshi-ears-wide.png",
  width: 220,
  height: 152,
  left: "66.991%",
  top: "67.778%",
  widthPct: "5.093%",
};
export const YOSHI_EARS_ALERT: Placement = { ...YOSHI_EARS_REST, src: "/images/hero/yoshi-ears-high.png" };

const YOSHI_FACE_BASE = { width: 149, height: 192, left: "67.894%", top: "70.444%", widthPct: "3.449%" };
export const YOSHI_FACE_NEUTRAL: Placement = { ...YOSHI_FACE_BASE, src: "/images/hero/yoshi-face-closed.png" };
export const YOSHI_FACE_SMILE: Placement = { ...YOSHI_FACE_BASE, src: "/images/hero/yoshi-face-smile.png" };
export const YOSHI_FACE_TONGUE: Placement = { ...YOSHI_FACE_BASE, src: "/images/hero/yoshi-face-tongue.png" };

const YOSHI_TAIL_BASE = { width: 205, height: 224, left: "74.745%", top: "76.667%", widthPct: "4.745%" };
// Reordered so index 0 (the rest/starting pose — see YOSHI_WAG_SEQUENCE below)
// lands on the curved-left frame (tail-2.png) instead of the sharp diagonal
// one (tail-1.png); the rest of the rotation is unaffected.
export const YOSHI_TAIL_FRAMES: Placement[] = [2, 1, 3, 4, 5].map((n) => ({
  ...YOSHI_TAIL_BASE,
  src: `/images/hero/yoshi-tail-${n}.png`,
}));
/** Sweep order for one wag cycle (indices into YOSHI_TAIL_FRAMES): rest → left → center → right, repeated a few times, → rest. */
export const YOSHI_WAG_SEQUENCE = [0, 3, 1, 0, 2, 4, 0, 3, 1, 0, 2, 4, 0, 3, 1, 0, 2, 4, 0];

const PIANO_BASE = { width: 483, height: 464, left: "85.231%", top: "64.074%", widthPct: "11.181%" };
export const PIANO_REGULAR: Placement = { ...PIANO_BASE, src: "/images/hero/piano-regular.png" };
export const PIANO_TOUCHED: Placement = { ...PIANO_BASE, src: "/images/hero/piano-touched.png" };

export interface HitBox {
  left: string;
  top: string;
  width: string;
  height: string;
}

/** Invisible hover/click target for each dog — the union of that dog's body/ears/face/tail boxes, so hovering the ears or tail (not just the body) still counts. */
export const GOBI_HIT_BOX: HitBox = { left: "54.097%", top: "73.074%", width: "5.833%", height: "12.444%" };
export const YOSHI_HIT_BOX: HitBox = { left: "65.394%", top: "67.778%", width: "14.096%", height: "21.592%" };

/** Background depth layers, back to front. Each is a full 4320×2700 crop (some mostly transparent) so a plain object-cover fill keeps every layer pixel-aligned. */
export const HERO_BACKDROP_LAYERS = [
  { src: "/images/hero/sky.jpg" },
  { src: "/images/hero/cloud-1.png" },
  { src: "/images/hero/cloud-2.png" },
  { src: "/images/hero/distance.png" },
  { src: "/images/hero/foreground.png" },
  { src: "/images/hero/flowers.png" },
] as const;
