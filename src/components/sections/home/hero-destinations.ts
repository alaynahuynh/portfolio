/**
 * One color per hero destination, pulled from the site palette (see
 * globals.css) — so the monitor, the Playground window and the About
 * window read as one system: shared warm-beige chrome, each object
 * keyed to its own accent.
 *
 * `deep` carries white title text (all ≥4.5:1); `soft` is the lighter end
 * of the title-bar gradient and the tint for that object's surfaces.
 */
export const DESTINATION_COLORS = {
  work: { deep: "var(--color-lake-blue-deep)", soft: "var(--color-lake-blue)" },
  playground: { deep: "var(--color-sage-deep)", soft: "var(--color-sage)" },
  about: { deep: "var(--color-mauve-deep)", soft: "var(--color-mauve)" },
} as const;

export type HeroDestination = keyof typeof DESTINATION_COLORS;
