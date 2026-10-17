"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { prefersReducedMotion } from "@/lib/motion";
import type { Placement } from "@/components/sections/home/hero-config";

interface HeroPianoProps {
  regular: Placement;
  touched: Placement;
}

const NOTE_CHARS = ["♪", "♫"];
const NOTE_LIFETIME_MS = 1300;
/** Roughly over the keys/lid, as a percentage of the piano's own box. */
const NOTE_ANCHOR = { left: [50, 82], top: [4, 30] } as const;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

interface Note {
  id: number;
  left: string;
  top: string;
  driftX: string;
  char: string;
}

/**
 * The piano from the painting. `regular` is the resting artwork;
 * `touched` is the artist's own lit/glowing rendition of the same piano,
 * crossfaded on top rather than a generated glow. It never moves,
 * rotates, or scales — only its own brightness changes, plus a trickle
 * of music notes drifting up from the keys: slow and occasional at
 * rest, quicker once "touched" (hovered or actually playing), so the
 * rate itself is the cue that something is happening.
 *
 * Expects an audio file at `/audio/hero-piano.mp3` — until one exists,
 * play() rejects (no track yet) and the button clearly reports that via
 * its title rather than silently doing nothing.
 */
export function HeroPiano({ regular, touched }: HeroPianoProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [trackMissing, setTrackMissing] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [reduced, setReduced] = useState(false);
  const touchedRef = useRef(false);
  const noteId = useRef(0);

  const isTouched = hovering || playing;
  useEffect(() => {
    touchedRef.current = isTouched;
  }, [isTouched]);

  useEffect(() => {
    // One-time client-side capability probe (matchMedia isn't available at
    // SSR time) — not a reactive sync loop, so the cascading-render concern
    // this lint rule guards against doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced) return;
    let timer: number;
    function spawn() {
      const id = noteId.current++;
      setNotes((prev) => [
        ...prev,
        {
          id,
          left: `${randomBetween(...NOTE_ANCHOR.left).toFixed(1)}%`,
          top: `${randomBetween(...NOTE_ANCHOR.top).toFixed(1)}%`,
          driftX: `${randomBetween(-10, 14).toFixed(1)}px`,
          char: NOTE_CHARS[Math.floor(Math.random() * NOTE_CHARS.length)],
        },
      ]);
      window.setTimeout(() => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
      }, NOTE_LIFETIME_MS);

      const [min, max] = touchedRef.current ? [450, 900] : [2600, 4400];
      timer = window.setTimeout(spawn, randomBetween(min, max));
    }
    timer = window.setTimeout(spawn, randomBetween(300, 900));
    return () => clearTimeout(timer);
  }, [reduced]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setTrackMissing(true));
  }

  const glowStyle = playing
    ? { opacity: 1, animation: "hero-piano-glow 3.6s ease-in-out infinite" }
    : { opacity: hovering ? 0.2 : 0, animation: undefined };

  return (
    <>
      <audio ref={audioRef} src="/audio/hero-piano.mp3" loop preload="none" />

      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        data-cursor="turn"
        aria-pressed={playing}
        aria-label={
          playing ? "Pause background music" : "Play background music"
        }
        title={trackMissing ? "No music track added yet" : undefined}
        className="absolute block"
        style={{
          left: regular.left,
          top: regular.top,
          width: regular.widthPct,
        }}
      >
        <Image
          src={regular.src}
          alt=""
          width={regular.width}
          height={regular.height}
          unoptimized
          priority
          sizes="220px"
          className="pointer-events-none block h-auto w-full"
        />
        <Image
          src={touched.src}
          alt=""
          width={touched.width}
          height={touched.height}
          unoptimized
          sizes="220px"
          className="pointer-events-none absolute inset-0 block h-auto w-full transition-opacity duration-500 ease-out"
          style={glowStyle}
        />

        {notes.map((note) => (
          <span
            key={note.id}
            aria-hidden="true"
            className="pointer-events-none absolute block text-[1.1em] leading-none text-[#fff6d8]"
            style={{
              left: note.left,
              top: note.top,
              fontSize: "clamp(0.9rem, 1.4vw, 1.4rem)",
              textShadow: "0 0 4px rgba(255, 230, 160, 0.8)",
              animation: `hero-note-float ${NOTE_LIFETIME_MS}ms ease-out forwards`,
              ["--note-drift-x" as string]: note.driftX,
            }}
          >
            {note.char}
          </span>
        ))}
      </button>
    </>
  );
}
