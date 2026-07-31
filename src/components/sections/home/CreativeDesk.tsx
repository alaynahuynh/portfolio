"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import {
  Pencil,
  Paintbrush,
  PaintTube,
  SwatchStrip,
  Palette,
  Eraser,
  Ruler,
  Tape,
  PaintSplatter,
  DraggableProp,
} from "@/components/sections/home/DeskProps";
import { paintings, threeDObjects, type Painting2D, type Object3D } from "@/data/creative-practice";

const sizeWidth = {
  large: "w-64 sm:w-72",
  medium: "w-48 sm:w-56",
  small: "w-36 sm:w-40",
};

/**
 * One painting (paper): draggable, tethered, taped down. Clicking without
 * dragging navigates to the full 2D collection rather than opening a
 * same-page lightbox — the desk is an invitation into the work, not the
 * work itself.
 */
function Painting({ item, colorIndex }: { item: Painting2D; colorIndex: number }) {
  const router = useRouter();
  const x = useMotionValue(0);
  const dragTilt = useTransform(x, [-80, 80], [-6, 6]);
  const rotate = useTransform(dragTilt, (tilt) => tilt + item.rotate);
  const justDraggedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      drag
      dragElastic={0.1}
      dragConstraints={{ top: -70, bottom: 70, left: -70, right: 70 }}
      dragMomentum={!prefersReducedMotion}
      dragTransition={
        prefersReducedMotion
          ? { power: 0, bounceStiffness: 1000, bounceDamping: 60 }
          : { power: 0.2, timeConstant: 200, bounceStiffness: 400, bounceDamping: 26 }
      }
      onDragStart={() => {
        justDraggedRef.current = false;
      }}
      onDrag={() => {
        justDraggedRef.current = true;
      }}
      whileDrag={{ scale: 1.06, zIndex: 30 }}
      whileHover={{ y: -4 }}
      style={{ x, rotate }}
      className={`group relative touch-none ${sizeWidth[item.size]}`}
    >
      <Tape colorIndex={colorIndex} className="-top-3 left-1/2 -translate-x-1/2 -rotate-2" />
      <button
        type="button"
        onClick={() => {
          if (justDraggedRef.current) {
            justDraggedRef.current = false;
            return;
          }
          router.push(`/creative-practice/2d#${item.slug}`);
        }}
        aria-label={`${item.alt} — view in 2D Works`}
        className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover"
      >
        <span className="block rounded-sm bg-white p-3 pb-6 shadow-md transition-shadow duration-(--duration-base) ease-(--ease-soft) group-hover:shadow-xl">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            sizes="(min-width: 1024px) 288px, (min-width: 640px) 45vw, 80vw"
            className="h-auto w-full"
            draggable={false}
          />
        </span>
      </button>
    </motion.div>
  );
}

/**
 * One 3D object: rests on the desk, not paper. No drag — per the brief,
 * these should feel like physical objects sitting on the tabletop, not
 * things you pick up. A hover lift + shadow is enough.
 */
function ThreeDObject({ item }: { item: Object3D }) {
  return (
    <Link
      href={`/creative-practice/3d#${item.slug}`}
      aria-label={`${item.title} — view in 3D Works`}
      className={`group block ${sizeWidth[item.size]}`}
      style={{ transform: `rotate(${item.rotate}deg)` }}
    >
      <div className="relative aspect-square transition-transform duration-(--duration-base) ease-(--ease-soft) group-hover:-translate-y-2">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 288px, (min-width: 640px) 45vw, 80vw"
          className="object-contain drop-shadow-lg transition-[filter] duration-(--duration-base) ease-(--ease-soft) group-hover:drop-shadow-2xl"
        />
      </div>
    </Link>
  );
}

type DeskEntry = { kind: "2d"; item: Painting2D } | { kind: "3d"; item: Object3D };

function findPainting(slug: string): Painting2D {
  const item = paintings.find((p) => p.slug === slug);
  if (!item) throw new Error(`Unknown painting slug: ${slug}`);
  return item;
}

function findObject(slug: string): Object3D {
  const item = threeDObjects.find((o) => o.slug === slug);
  if (!item) throw new Error(`Unknown 3D object slug: ${slug}`);
  return item;
}

// Hand-curated order: 2D and 3D deliberately interleaved (never grouped),
// balancing large/medium/small so the row reads as composed rather than
// scattered — an editorial desk photo, not a random pile.
const deskLayout: DeskEntry[] = [
  { kind: "2d", item: findPainting("still-life") },
  { kind: "3d", item: findObject("eye-table") },
  { kind: "2d", item: findPainting("waterfall-gorge") },
  { kind: "3d", item: findObject("monkey-sculpture") },
  { kind: "2d", item: findPainting("lake-geese") },
  { kind: "3d", item: findObject("pig-lamp") },
  { kind: "2d", item: findPainting("sunflowers") },
  { kind: "2d", item: findPainting("garden-boat") },
  { kind: "2d", item: findPainting("goldfish-bag") },
];

/**
 * The creative practice workspace: 2D and 3D work resting together on one
 * desk, dressed with studio props, as if you just stepped away from it.
 * Not a gallery, not two category cards — an invitation into the work,
 * which lives in full on /creative-practice/2d and /creative-practice/3d.
 */
export function CreativeDesk() {
  return (
    <section id="creative-practice" aria-label="Creative practice workspace" className="relative overflow-hidden bg-desk py-20 sm:py-28">
      <PaintSplatter colorIndex={0} className="absolute top-6 left-32 hidden w-20 opacity-40 sm:block" />
      <PaintSplatter colorIndex={2} className="absolute right-24 bottom-24 hidden w-24 rotate-45 opacity-35 lg:block" />
      <PaintSplatter colorIndex={4} className="absolute bottom-4 left-1/2 hidden w-16 -rotate-12 opacity-30 sm:block" />

      <Pencil className="absolute top-10 left-6 hidden w-24 -rotate-12 sm:block lg:left-12" />
      <DraggableProp className="absolute top-14 right-10 hidden sm:block lg:right-20">
        <Eraser className="w-14 rotate-[15deg]" />
      </DraggableProp>
      <Paintbrush className="absolute top-40 right-6 hidden w-8 rotate-[20deg] md:block lg:right-14" />
      <Paintbrush className="absolute bottom-24 right-1/3 hidden w-6 -rotate-[30deg] opacity-80 lg:block" />
      <PaintTube className="absolute bottom-16 left-8 hidden w-10 rotate-12 md:block lg:left-20" />
      <Palette className="absolute bottom-40 left-4 hidden w-16 rotate-6 lg:block" />
      <SwatchStrip className="absolute right-6 bottom-10 hidden w-8 -rotate-6 lg:block" />
      <Ruler className="absolute bottom-6 left-1/3 hidden w-32 rotate-2 lg:block" />

      <Container>
        <div className="mb-14 text-center sm:mb-20">
          <p className="font-handwriting text-2xl text-muted-foreground sm:text-3xl">
            I just stepped away from the desk — everything&apos;s still here.
          </p>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-14">
          {deskLayout.map((entry, i) =>
            entry.kind === "2d" ? (
              <Painting key={entry.item.slug} item={entry.item} colorIndex={i} />
            ) : (
              <ThreeDObject key={entry.item.slug} item={entry.item} />
            ),
          )}
        </div>
      </Container>
    </section>
  );
}
