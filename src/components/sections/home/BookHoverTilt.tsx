"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useSpring, useReducedMotion } from "motion/react";

const MAX_TILT_DEG = 11;
const LIFT_PX = 12;
const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

interface BookHoverTiltProps {
  /** Only the closed cover invites a pick-up; once the book starts
   * opening this settles back to rest and stops tracking the pointer,
   * so it never fights the scroll-linked rotateY on the cover itself. */
  active: boolean;
  className?: string;
  children: ReactNode;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/**
 * Picks the closed sketchbook up off the meadow on hover: a slight
 * lift and a gentle tilt toward the cursor, springed rather than
 * snapping so it reads as a real object settling rather than a UI
 * hover state.
 *
 * Two layers, deliberately: an outer div that owns the pointer
 * handlers and is never itself transformed, and an inner `motion.div`
 * that owns `rotateX`/`rotateY`/`y` and nothing else. Earlier this was
 * one element doing both jobs — measuring/hit-testing itself while
 * also being the thing tilting. Near a corner, the tilt is close to
 * its max on both axes at once, which visibly shifts the element's
 * painted position out from under the cursor; the browser's real hit
 * test then sees the cursor leave the (now-moved) element mid-gesture
 * and fires a genuine `mouseleave`, snapping the tilt back to neutral
 * even though the cursor is still over the book on screen. Keeping the
 * outer hit-test box stable (it never moves, since it's not what's
 * being transformed) removes that feedback loop entirely — this is
 * also why its rect can safely be read fresh on every move instead of
 * needing to be cached at rest.
 *
 * Lives one level above the book's 3D stage, not on it: perspective
 * stays on the outer `.group` wrapper, the inner layer here applies
 * the tilt/lift transform, and its child (the aspect-4/3 stage) keeps
 * its own `preserve-3d` so the cover's independent opening rotateY
 * still composes correctly underneath.
 */
export function BookHoverTilt({ active, className, children }: BookHoverTiltProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);
  const lift = useSpring(0, SPRING);

  useEffect(() => {
    if (!active) {
      rotateX.set(0);
      rotateY.set(0);
      lift.set(0);
    }
  }, [active, rotateX, rotateY, lift]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!active || prefersReducedMotion) return;
    const rect = outerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = clamp01((event.clientX - rect.left) / rect.width);
    const py = clamp01((event.clientY - rect.top) / rect.height);
    rotateY.set((px - 0.5) * MAX_TILT_DEG * 2);
    rotateX.set(-(py - 0.5) * MAX_TILT_DEG * 2);
    lift.set(-LIFT_PX);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  }

  return (
    <div ref={outerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={className}>
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX,
          rotateY,
          y: lift,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
