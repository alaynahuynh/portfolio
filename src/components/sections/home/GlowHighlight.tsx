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
 * A soft glow (cropped from the artist's own highlight layer) that
 * pulses in and out over one of the three interactive pieces, cueing
 * that it can be interacted with. Slow and low-contrast on purpose —
 * `@keyframes glow-pulse` in globals.css, which the global
 * reduced-motion rule collapses to imperceptible.
 */
export function GlowHighlight({ placement, delay }: { placement: Placement; delay: string }) {
  return (
    <Image
      src={placement.src}
      alt=""
      aria-hidden="true"
      width={placement.width}
      height={placement.height}
      unoptimized
      sizes="260px"
      className="pointer-events-none absolute block h-auto mix-blend-screen"
      style={{
        left: placement.left,
        top: placement.top,
        width: placement.widthPct,
        opacity: 0.18,
        animation: `glow-pulse 4.5s ease-in-out ${delay} infinite`,
      }}
    />
  );
}
