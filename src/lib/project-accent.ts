import type { ProjectAccent } from "@/types";

/** Tailwind classes for each project accent — shared by the homepage
 * placeholder cards and /projects so the palette mapping can't drift. */
export const ACCENT_CLASSES: Record<ProjectAccent, { pillBg: string; pillText: string; pillDot: string }> = {
  mauve: { pillBg: "bg-blush", pillText: "text-mauve-deep", pillDot: "bg-mauve-deep" },
  "lake-blue-deep": { pillBg: "bg-mist-blue", pillText: "text-lake-blue-deep", pillDot: "bg-lake-blue-deep" },
  "sage-deep": { pillBg: "bg-sage/30", pillText: "text-sage-deep", pillDot: "bg-sage-deep" },
};
