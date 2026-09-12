import Image from "next/image";

interface Placement {
  src: string;
  width: number;
  height: number;
  left: string;
  top: string;
  widthPct: string;
}

/**
 * A flower cluster cropped from the artist's own painting, swaying
 * continuously and automatically (`@keyframes gentle-sway` in
 * globals.css) — no cursor interaction needed, no invented flowers.
 * The global reduced-motion rule collapses the infinite animation to
 * its resting frame.
 */
export function FlowerSway({ placement, delay }: { placement: Placement; delay: string }) {
  return (
    <Image
      src={placement.src}
      alt=""
      aria-hidden="true"
      width={placement.width}
      height={placement.height}
      unoptimized
      sizes="200px"
      className="pointer-events-none absolute block h-auto"
      style={{
        left: placement.left,
        top: placement.top,
        width: placement.widthPct,
        transformOrigin: "50% 95%",
        animation: `gentle-sway 5s ease-in-out ${delay} infinite`,
      }}
    />
  );
}
