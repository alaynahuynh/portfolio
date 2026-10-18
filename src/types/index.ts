export type ProjectAccent = "mauve" | "lake-blue-deep" | "sage-deep";

export interface Project {
  /** Used in the URL: /projects/[slug] */
  slug: string;
  /** Placeholder label (e.g. "Case Study 01") — not a real project name yet. */
  title: string;
  /** Type or role, e.g. "UI/UX Design". */
  role: string;
  /** One honest sentence — no invented outcomes, metrics, or claims. */
  summary: string;
  /** Optional short, punchy lead line shown above `summary` on the
   * homepage preview — only set where real project-specific copy exists;
   * falls back to `summary` alone when unset rather than inventing one. */
  tagline?: string;
  /** Optional short discipline/skill tags (e.g. "Product Design", "UX Research") shown as a metadata row on the homepage preview. */
  tags?: string[];
  /** Optional one-line credibility/proof statement — what was actually
   * designed/built and how, shown between the discipline row and the
   * case-study CTA. Only real, verifiable claims — no invented outcomes. */
  credibility?: string;
  /** Optional link to the live, shipped product/site — only set once a
   * real, working URL exists. Renders a "View Live Product/Site ↗" CTA
   * next to the case-study link; omitted (not a disabled/fake link)
   * while unset. */
  liveUrl?: string;
  /** Every entry is "in-progress" for now; extend when a real case study replaces one. */
  status: "in-progress";
  /** Drives the abstract placeholder art + accent pill color for this card. */
  accent: ProjectAccent;
  /** This project's dominant color (a CSS color/var, e.g. "var(--color-meadow)")
   * — rendered as a solid rectangle behind its whole listing on the
   * homepage's Selected Work section, matching the same color used as
   * `accentColor` on its case-study page (see src/data/case-studies/*). */
  dominantColor?: string;
  /** Soft tinted mat behind this project's thumbnail in the homepage's
   * Selected Work list — also the fill of the hero CTA button on its
   * case-study page, so the two read as the same project color. */
  matTint?: string;
  /** True once /projects/[slug] renders a real case study component for
   * this project instead of the generic placeholder — lets preview
   * surfaces like the homepage's ProjectPlaceholder know whether to
   * link there yet. */
  hasCaseStudy?: boolean;
  /** Optional muted, looping video thumbnail (e.g. the case study's own
   * hero walkthrough) shown instead of the abstract placeholder art on
   * both the /projects grid and the homepage's Featured Work preview.
   * `width`/`height` are the video's real intrinsic dimensions — the
   * thumbnail frame is sized to that exact aspect ratio so the whole
   * video fits without cropping (rather than the 4:3 placeholder box). */
  videoThumbnail?: { src: string; poster?: string; width: number; height: number };
  /** Optional still-image equivalent of `videoThumbnail`, for a project
   * whose real preview is a photo rather than a walkthrough clip. Takes
   * the same slot: shown instead of the abstract placeholder art on both
   * the /projects grid and the homepage's Featured Work preview, sized
   * to its own real intrinsic aspect ratio. */
  imageThumbnail?: { src: string; alt: string; width: number; height: number };
  /** Still image for the "Next project" card at the end of each case
   * study — falls back to `imageThumbnail` when unset. */
  cover?: { src: string; alt: string; width: number; height: number };
  /** Short scope label shown on the homepage card, e.g. "Live product". */
  statusTag?: string;
}
