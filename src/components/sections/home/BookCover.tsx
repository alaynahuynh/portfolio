import Image from "next/image";

/**
 * The front cover face of the sketchbook — just the artist's own cover
 * illustration (kraft-paper spiral notebook, magazine-cutout "Alayna"
 * lettering, taped photo-booth strips, postage stamps, a wax seal, and a
 * torn-gingham corner with a pressed flower), cropped to the same
 * 1238:879 frame the previous cover art used — matching that exact ratio
 * (rather than this file's own natural bounding box, which came out
 * shorter) is what keeps `object-contain scale-[1.07] -translate-x-3`
 * below producing an identical fill/crop with zero retuning; only the
 * printed design should change here, not its placement. Every bit of
 * drawn content survives, including the spiral rings out at the tilted
 * edge. Shown via `object-contain` so it's never cropped further or
 * distorted, and fills whatever box its parent gives it — the 3D cover
 * page sizes that box itself (see CreativePracticeBook), and the
 * reduced-motion static layout sets its own aspect ratio on the wrapper
 * instead, since the artwork's own ratio (~1238:879) doesn't exactly
 * match the shared 4:3 page stage used by the other spreads.
 *
 * No background fill — the container is transparent, so the tiny
 * sliver at two tilted corners (see above) just shows whatever is
 * actually behind it.
 *
 * Purely presentational — no Link, no hover-driven transform. It's
 * rendered as the front face of a 3D-rotating page element (see
 * CreativePracticeBook/BookPage), which owns the only `transform` on
 * that element (the scroll-linked opening rotateY). Opening the book is
 * driven by scroll progress and the arrow keys in PlaygroundBook
 * — this component has no click handler of its own.
 */
export function BookCover() {
  return (
    <div className="relative h-full w-full overflow-visible">
      <Image
        src="/images/creative-practice/newbook.png"
        alt="Alayna's sketchbook: a kraft-paper spiral notebook cover with magazine-cutout lettering, taped photo-booth strips, postage stamps, and a torn-gingham corner"
        fill
        unoptimized
        sizes="(min-width: 768px) 56rem, 100vw"
        className="object-contain scale-[1.07] -translate-x-3"
      />
    </div>
  );
}
