import type { ProjectAccent } from "@/types";

const ACCENT_COLORS: Record<ProjectAccent, { light: string; deep: string }> = {
  mauve: { light: "#e9c6ce", deep: "#8c5d78" },
  "lake-blue-deep": { light: "#c7d7e7", deep: "#3e6e96" },
  "sage-deep": { light: "#9bb27b", deep: "#5f7a45" },
};

// Three loose blob arrangements so the three cards don't read as one
// image recolored three times.
const VARIANTS = [
  { blobs: [{ cx: 130, cy: 110, r: 90 }, { cx: 280, cy: 190, r: 60 }], stroke: "M40,220 C140,160 220,240 360,140" },
  { blobs: [{ cx: 260, cy: 90, r: 85 }, { cx: 120, cy: 210, r: 65 }], stroke: "M30,90 C130,150 250,60 370,180" },
  { blobs: [{ cx: 200, cy: 150, r: 100 }, { cx: 320, cy: 90, r: 45 }], stroke: "M30,150 C120,90 280,220 370,110" },
];

/**
 * Abstract painterly placeholder imagery for an in-progress case study —
 * soft blurred forms plus a single brush-like gesture line, deliberately
 * non-representational so it can't be mistaken for a real interface or
 * finished screenshot.
 */
export function ProjectPlaceholderArt({
  accent,
  variant,
  className,
}: {
  accent: ProjectAccent;
  variant: 0 | 1 | 2;
  className?: string;
}) {
  const colors = ACCENT_COLORS[accent];
  const { blobs, stroke } = VARIANTS[variant];
  const filterId = `placeholder-blur-${accent}-${variant}`;

  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" focusable="false">
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
      </defs>
      <rect x="0" y="0" width="400" height="300" fill="#faf6ec" />
      <g fill={colors.light} opacity="0.8" filter={`url(#${filterId})`}>
        {blobs.map((b, i) => (
          <circle key={i} cx={b.cx} cy={b.cy} r={b.r} />
        ))}
      </g>
      <path d={stroke} fill="none" stroke={colors.deep} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
