"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { prefersReducedMotion } from "@/lib/motion";
import type { HitBox, Placement } from "@/components/sections/home/hero-config";

interface HeroDogProps {
  name: string;
  hitBox: HitBox;
  body: Placement;
  earsRest: Placement;
  earsAlert: Placement;
  /** Rotation pivot for the ear twitch/perk, as a CSS transform-origin (defaults to the base of the ears where they meet the head). */
  earOrigin?: string;
  /** Set false to skip the idle ear-twitch entirely — for ears whose shape doesn't read well as a twitch target. Hover still perks them. Defaults true. */
  earTwitch?: boolean;
  /** Adds a subtle idle body lean/shift on its own randomized timer — an alternative "life" cue for dogs with earTwitch disabled. */
  bodyShift?: boolean;
  restFace: Placement;
  /** Extra expressions occasionally shown at rest for a beat, then reverted — idle "life", not a mood swing. */
  idleFaces?: Placement[];
  hoverFace: Placement;
  /** Shown briefly on click, on top of opening the info modal. Defaults to hoverFace. */
  clickFace?: Placement;
  tailFrames?: Placement[];
  /** Indices into tailFrames for one wag sweep; index 0 must be the resting frame. */
  wagSequence?: number[];
  onClick: () => void;
}

const EAR_TWITCH_MS = 380;
const BODY_SHIFT_MS = 900;
const FACE_BLIP_MS = 2200;
const WAG_STEP_MS = 170;

function useRandomInterval(callback: () => void, minMs: number, maxMs: number, enabled: boolean) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!enabled) return;
    let timer: number;
    function tick() {
      timer = window.setTimeout(() => {
        callbackRef.current();
        tick();
      }, minMs + Math.random() * (maxMs - minMs));
    }
    tick();
    return () => clearTimeout(timer);
  }, [enabled, minMs, maxMs]);
}

/**
 * One dog from the artist's own layered painting. Body stays put (only a
 * hair's-width breathing scale); ears, face, and (where provided) tail
 * are separate crops swapped/nudged independently so the resting
 * artwork reads as one unmodified drawing until something moves.
 *
 * Idle life (ear twitches or a body shift, face blips, tail wags) runs
 * on randomized, independent timers — never a synchronized loop — and
 * is skipped entirely under reduced motion. Hovering perks the ears,
 * brightens the face, and (for Yoshi) plays one wag; clicking adds one
 * more playful expression beat before the info modal opens.
 */
export function HeroDog({
  name,
  hitBox,
  body,
  earsRest,
  earsAlert,
  earOrigin = "50% 90%",
  earTwitch = true,
  bodyShift = false,
  restFace,
  idleFaces = [],
  hoverFace,
  clickFace,
  tailFrames,
  wagSequence,
  onClick,
}: HeroDogProps) {
  const [reduced, setReduced] = useState(false);
  const canHoverRef = useRef(false);
  const [hovering, setHovering] = useState(false);
  const [earsAlertOn, setEarsAlertOn] = useState(false);
  const [twitching, setTwitching] = useState(false);
  const [shifting, setShifting] = useState(false);
  const [faceSrc, setFaceSrc] = useState(restFace.src);
  const [tailIndex, setTailIndex] = useState(0);
  const faceBlipTimeout = useRef<number | undefined>(undefined);
  const wagPlaying = useRef(false);
  const bodyImgRef = useRef<HTMLImageElement>(null);
  const idleFaceCursor = useRef(0);

  useEffect(() => {
    canHoverRef.current = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    if (bodyImgRef.current) {
      bodyImgRef.current.style.animationDelay = `${(-Math.random() * 5).toFixed(2)}s`;
    }
    // One-time client-side capability probe (matchMedia isn't available at
    // SSR time) — not a reactive sync loop, so the cascading-render concern
    // this lint rule guards against doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(prefersReducedMotion());
  }, []);

  const faces = useMemo(() => {
    const map = new Map<string, Placement>();
    for (const f of [restFace, ...idleFaces, hoverFace, clickFace ?? hoverFace]) map.set(f.src, f);
    return Array.from(map.values());
  }, [restFace, idleFaces, hoverFace, clickFace]);

  function triggerTwitch() {
    if (hovering) return; // hover already holds the alert pose
    setTwitching(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setTwitching(true)));
    window.setTimeout(() => setTwitching(false), EAR_TWITCH_MS);
  }

  function triggerBodyShift() {
    setShifting(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setShifting(true)));
    window.setTimeout(() => setShifting(false), BODY_SHIFT_MS);
  }

  function showFaceBriefly(src: string) {
    window.clearTimeout(faceBlipTimeout.current);
    setFaceSrc(src);
    faceBlipTimeout.current = window.setTimeout(() => {
      faceBlipTimeout.current = undefined;
      setFaceSrc(hovering ? hoverFace.src : restFace.src);
    }, FACE_BLIP_MS);
  }

  function playWag() {
    if (!tailFrames || !wagSequence || wagPlaying.current) return;
    wagPlaying.current = true;
    wagSequence.forEach((frameIndex, step) => {
      window.setTimeout(() => {
        setTailIndex(frameIndex);
        if (step === wagSequence.length - 1) wagPlaying.current = false;
      }, step * WAG_STEP_MS);
    });
  }

  useRandomInterval(triggerTwitch, 3500, 7800, !reduced && earTwitch);
  useRandomInterval(triggerBodyShift, 4200, 8600, !reduced && bodyShift);
  useRandomInterval(
    () => {
      if (hovering || faceBlipTimeout.current) return;
      const pool = idleFaces.length > 0 ? idleFaces : [hoverFace];
      // Cycle through every variant in turn (rather than randomly) so each one
      // is guaranteed airtime instead of leaving rarer expressions to chance.
      const pick = pool[idleFaceCursor.current % pool.length];
      idleFaceCursor.current += 1;
      showFaceBriefly(pick.src);
    },
    1800,
    3500,
    !reduced,
  );
  useRandomInterval(playWag, 4800, 9600, !reduced && !!tailFrames);

  function handlePointerEnter() {
    if (!canHoverRef.current) return;
    setHovering(true);
    setEarsAlertOn(true);
    window.clearTimeout(faceBlipTimeout.current);
    faceBlipTimeout.current = undefined;
    setFaceSrc(hoverFace.src);
    if (!reduced) playWag();
  }

  function handlePointerLeave() {
    if (!canHoverRef.current) return;
    setHovering(false);
    setEarsAlertOn(false);
    setFaceSrc(restFace.src);
  }

  function handleClick() {
    showFaceBriefly((clickFace ?? hoverFace).src);
    if (!reduced) playWag();
    onClick();
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
        data-cursor="explore"
        aria-label={`Meet ${name}`}
        className="absolute block bg-transparent"
        style={{ left: hitBox.left, top: hitBox.top, width: hitBox.width, height: hitBox.height }}
      />

      <Image
        ref={bodyImgRef}
        src={body.src}
        alt=""
        width={body.width}
        height={body.height}
        unoptimized
        sizes="220px"
        priority
        className="pointer-events-none absolute block h-auto w-full"
        style={{
          left: body.left,
          top: body.top,
          width: body.widthPct,
          position: "absolute",
          transformOrigin: "50% 100%",
          animation: reduced
            ? undefined
            : [`hero-dog-breathe 5.2s ease-in-out infinite`, shifting && `hero-body-shift ${BODY_SHIFT_MS}ms ease-out`]
                .filter(Boolean)
                .join(", "),
        }}
      />

      {[earsRest, earsAlert].map((ear) => (
        <Image
          key={ear.src}
          src={ear.src}
          alt=""
          width={ear.width}
          height={ear.height}
          unoptimized
          sizes="140px"
          className="pointer-events-none absolute block h-auto w-full transition-opacity duration-300 ease-out"
          style={{
            left: ear.left,
            top: ear.top,
            width: ear.widthPct,
            opacity: ear.src === (earsAlertOn ? earsAlert.src : earsRest.src) ? 1 : 0,
            transformOrigin: earOrigin,
            // Ears with their own twitch play that; otherwise, when this dog
            // leans instead (bodyShift), they ride the exact same shift as
            // the body so the two move together as one unit, not separately.
            animation: twitching
              ? `hero-ear-twitch ${EAR_TWITCH_MS}ms ease-out`
              : bodyShift && shifting
                ? `hero-body-shift ${BODY_SHIFT_MS}ms ease-out`
                : undefined,
          }}
        />
      ))}

      {faces.map((face) => (
        <Image
          key={face.src}
          src={face.src}
          alt=""
          width={face.width}
          height={face.height}
          unoptimized
          sizes="90px"
          className="pointer-events-none absolute block h-auto w-full transition-opacity duration-300 ease-out"
          style={{
            left: face.left,
            top: face.top,
            width: face.widthPct,
            opacity: face.src === faceSrc ? 1 : 0,
          }}
        />
      ))}

      {tailFrames?.map((frame, i) => (
        <Image
          key={frame.src}
          src={frame.src}
          alt=""
          width={frame.width}
          height={frame.height}
          unoptimized
          sizes="140px"
          className="pointer-events-none absolute block h-auto w-full transition-opacity ease-in-out"
          style={{
            left: frame.left,
            top: frame.top,
            width: frame.widthPct,
            opacity: i === tailIndex ? 1 : 0,
            transitionDuration: `${WAG_STEP_MS}ms`,
          }}
        />
      ))}
    </>
  );
}
