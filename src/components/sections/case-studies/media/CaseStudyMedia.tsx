"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { useLazyVideo } from "@/components/sections/home/ProjectPlaceholder";
import { cn } from "@/lib/utils";
import type {
  CaseStudyImageSpec,
  CaseStudyVideoSpec,
} from "@/types/case-study";

/**
 * Reusable, responsive image system for case study pages. Every layout
 * here is built on top of `Frame`, which renders a single image at its
 * real intrinsic aspect ratio (via required width/height, same
 * convention as src/data/creative-practice.ts + TwoDGallery.tsx) so
 * nothing is ever stretched, distorted, or silently cropped — process
 * photos, sketches, flowcharts, and screenshots all keep their original
 * proportions. `object-contain` is kept as a defensive style in case a
 * layout ever constrains an image's box.
 *
 * Any layout can be captioned by setting `caption` on its
 * CaseStudyImageSpec — there's no separate "captioned image" component,
 * captioning is a property of the image itself.
 */

/** Hairline-bordered white surface with a small radius and no shadow —
 * the visual itself carries the weight, not its container. */
const FRAME_SURFACE =
  "overflow-hidden rounded-(--radius-default) border border-border bg-surface";
/** Captions sit quietly beneath the frame rather than in a tinted bar. */
const CAPTION = "mt-3 text-xs leading-relaxed text-muted-foreground";

/**
 * Screenshots have a fixed pixel width; stretched wider than about 60% of
 * it in CSS pixels they look soft on retina (2x) screens. Capping each
 * frame there keeps every image crisp — a low-res source simply renders
 * a little smaller (centered) instead of blurry.
 */
const RETINA_DENSITY = 1.65;
export function sharpMaxWidth(image: CaseStudyImageSpec) {
  return Math.round(image.width / RETINA_DENSITY);
}

interface FrameProps {
  image: CaseStudyImageSpec;
  sizes: string;
  eager?: boolean;
  className?: string;
}

function Frame({ image, sizes, eager, className }: FrameProps) {
  return (
    <figure className={cn("mx-auto", className)} style={{ maxWidth: sharpMaxWidth(image) }}>
      <div className={FRAME_SURFACE}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          // Screenshots carry small UI text that the default q75 smears.
          quality={90}
          loading={eager ? "eager" : "lazy"}
          preload={eager}
          className="block h-auto w-full object-contain"
        />
      </div>
      {image.caption && (
        <figcaption className={CAPTION}>{image.caption}</figcaption>
      )}
    </figure>
  );
}

interface SingleImageProps {
  image: CaseStudyImageSpec;
  /** Marks this as the page's LCP image (e.g. the hero) — loads eagerly instead of lazily. */
  eager?: boolean;
  className?: string;
}

/**
 * 1. Full-width case study image — hero images, final designs, large
 * flowcharts, major visuals. Spans the full readable content width.
 */
export function CaseStudyFullImage({
  image,
  eager,
  className,
}: SingleImageProps) {
  return (
    <Frame
      image={image}
      eager={eager}
      sizes="(min-width: 1280px) 1200px, 100vw"
      className={cn("w-full", className)}
    />
  );
}

/**
 * 2. Standard content image — process photos, research artifacts,
 * sketches, wireframes. Capped narrower than full-width so it reads as
 * supporting evidence rather than a hero visual.
 */
export function CaseStudyContentImage({
  image,
  eager,
  className,
  sizes = "(min-width: 1024px) 768px, 100vw",
}: SingleImageProps & {
  /** Override when a layout widens the image past its default cap. */
  sizes?: string;
}) {
  return (
    <Frame
      image={image}
      eager={eager}
      sizes={sizes}
      className={cn("mx-auto w-full max-w-3xl", className)}
    />
  );
}

/**
 * 1b. Full-width image that opens in the shared ImageLightbox — for dense,
 * annotated research visuals that need to be read up close. The trigger
 * is a real button (keyboard focusable); Escape / backdrop / the close
 * button dismiss the viewer and focus returns to the image.
 */
export function CaseStudyZoomImage({ image, className }: SingleImageProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${image.alt}`}
        style={{ maxWidth: sharpMaxWidth(image) }}
        className={cn(
          "group relative mx-auto block w-full cursor-zoom-in rounded-(--radius-default) text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-deep",
          className,
        )}
      >
        <Frame
          image={image}
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="w-full"
        />
        <span
          aria-hidden="true"
          className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/95 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors group-hover:text-foreground"
        >
          <Maximize2 className="size-3.5" />
          Enlarge
        </span>
      </button>
      {open && (
        <ImageLightbox
          images={[image]}
          index={0}
          onIndexChange={() => {}}
          onClose={() => {
            setOpen(false);
            triggerRef.current?.focus();
          }}
        />
      )}
    </>
  );
}

interface ImageRowProps {
  images: CaseStudyImageSpec[];
  /** Defaults to 3 columns for 3+ images, 2 columns otherwise. */
  columns?: 2 | 3;
  className?: string;
}

/**
 * 3 & 4. Two/three-image row — related images side by side on desktop,
 * stacked on mobile. `items-start` keeps each image at its own natural
 * height instead of stretching to match its tallest sibling.
 */
export function CaseStudyImageRow({
  images,
  columns,
  className,
}: ImageRowProps) {
  const cols = columns ?? (images.length >= 3 ? 3 : 2);
  return (
    <div
      className={cn(
        "grid items-start gap-6",
        cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
        className,
      )}
    >
      {images.map((image) => (
        <Frame
          key={image.src}
          image={image}
          sizes={
            cols === 3
              ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              : "(min-width: 640px) 50vw, 100vw"
          }
        />
      ))}
    </div>
  );
}

interface ImageWithTextProps {
  image: CaseStudyImageSpec;
  children: React.ReactNode;
  /** Which side the image sits on at desktop widths. Always stacks image-first on mobile. */
  imagePosition?: "left" | "right";
  className?: string;
}

/**
 * 5. Image + text — an image beside a short explanation, stacking
 * vertically on mobile.
 */
export function CaseStudyImageWithText({
  image,
  children,
  imagePosition = "left",
  className,
}: ImageWithTextProps) {
  return (
    <div className={cn("grid gap-8 sm:grid-cols-2 sm:items-center", className)}>
      <div className={cn(imagePosition === "right" && "sm:order-2")}>
        <Frame image={image} sizes="(min-width: 640px) 50vw, 100vw" />
      </div>
      <div className={cn(imagePosition === "right" && "sm:order-1")}>
        {children}
      </div>
    </div>
  );
}

/**
 * 6. Flow diagram image — a large, centered flowchart that keeps its
 * natural (often tall) proportions rather than shrinking into a
 * thumbnail, since these diagrams are meant to be read, not just
 * referenced. Links out to the source file so the full-resolution
 * diagram is still one click away.
 */
export function CaseStudyFlowImage({ image, className }: SingleImageProps) {
  return (
    <a
      href={image.src}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "mx-auto block w-full max-w-[640px] transition-opacity hover:opacity-80",
        className,
      )}
    >
      <Frame
        image={image}
        sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
      />
    </a>
  );
}

interface BeforeAfterProps {
  before: CaseStudyImageSpec;
  after: CaseStudyImageSpec;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  /** Matches the `sizes` attr to the grid's actual breakpoint when className overrides sm:grid-cols-2. */
  sizes?: string;
}

interface VideoProps {
  video: CaseStudyVideoSpec;
  className?: string;
}

/**
 * 8. Muted, looping prototype clip — a short in-context interaction
 * (an overlay opening, a confirmation toast) where a still screenshot
 * can't show the motion. Autoplays muted and inline so it behaves like a
 * GIF rather than a media player; no controls, since there's no audio
 * and nothing to seek. Same frame/caption treatment as CaseStudyFullImage
 * so it sits consistently alongside the image components above.
 */
export function CaseStudyVideo({ video, className }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Loads only once scrolled near, and pauses off-screen — a long case
  // study can hold several clips without downloading them all up front.
  const shouldLoad = useLazyVideo(videoRef);
  const pauseAtEndMs = video.pauseAtEndMs;

  function handleEnded() {
    const el = videoRef.current;
    if (!el || !pauseAtEndMs) return;
    setTimeout(() => {
      el.currentTime = 0;
      void el.play();
    }, pauseAtEndMs);
  }

  return (
    <figure className={className}>
      <div className={FRAME_SURFACE}>
        <video
          ref={videoRef}
          src={shouldLoad ? video.src : undefined}
          poster={video.poster}
          width={video.width}
          height={video.height}
          autoPlay
          muted
          loop={!pauseAtEndMs}
          onEnded={pauseAtEndMs ? handleEnded : undefined}
          playsInline
          aria-label={video.alt}
          className="block h-auto w-full object-contain"
        />
      </div>
      {video.caption && (
        <figcaption className={CAPTION}>{video.caption}</figcaption>
      )}
    </figure>
  );
}

/**
 * 7. Before / after — a clearly labeled responsive comparison for
 * iterations (e.g. Version 1 vs Version 2). Side by side on desktop,
 * stacked on mobile.
 */
export function CaseStudyBeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  sizes = "(min-width: 640px) 50vw, 100vw",
}: BeforeAfterProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2", className)}>
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          {beforeLabel}
        </p>
        <Frame image={before} sizes={sizes} />
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-sage-deep uppercase">
          {afterLabel}
        </p>
        <Frame image={after} sizes={sizes} />
      </div>
    </div>
  );
}
