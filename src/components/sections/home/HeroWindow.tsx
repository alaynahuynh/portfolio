"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { monitorScreen, useHeroDesktop, type WindowStatus } from "@/components/sections/home/HeroDesktop";
import type { HeroDestination } from "@/components/sections/home/hero-destinations";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface WindowControls {
  href: string;
  ariaLabel: string;
  title: string;
  maximized: boolean;
  draggable: boolean;
  minimize: () => void;
  toggleMaximize: () => void;
  close: () => void;
  /** Spread onto the title bar: drag to move, double-click to maximize. */
  titleBarProps: React.HTMLAttributes<HTMLDivElement>;
}

const WindowContext = createContext<WindowControls | null>(null);

/** Controls for the HeroRetroWindow rendered inside a HeroWindow. */
export function useHeroWindow() {
  return useContext(WindowContext);
}

/** Resting state: dimmed until hovered, lifting on hover/focus, pressing
 * back down on click, and held up while being dragged. Transform, filter
 * and shadow only, so nothing shifts layout. */
const LIFT =
  "group relative rounded-sm transition-[translate,filter] duration-(--duration-base) ease-(--ease-soft) [@media(hover:hover)]:brightness-(--hero-dim) hover:brightness-100 has-[a:focus-visible]:brightness-100 hover:-translate-y-1 has-[a:focus-visible]:-translate-y-1 hover:drop-shadow-[0_18px_26px_rgba(46,50,42,0.3)] has-[a:focus-visible]:drop-shadow-[0_18px_26px_rgba(46,50,42,0.3)] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-sage-deep [&:has(a:active)]:translate-y-0 [&:has(a:active)]:drop-shadow-[0_8px_12px_rgba(46,50,42,0.22)] [&:has(a:active)]:duration-75 [&[data-dragging]]:-translate-y-1.5 [&[data-dragging]]:brightness-100 [&[data-dragging]]:drop-shadow-[0_26px_34px_rgba(46,50,42,0.32)] motion-reduce:[translate:none]!";

const MAX_SCALE = 2;

interface HeroWindowProps {
  id: string;
  title: string;
  destination: HeroDestination;
  href: string;
  ariaLabel: string;
  /** Hover tooltip naming the destination. */
  tooltip?: React.ReactNode;
  /** Positioning classes for the window's resting place on the stage. */
  className?: string;
  children: React.ReactNode;
}

/**
 * One of the hero's floating Windows 98 windows. Layers, outside in:
 * resting position (className) → drag/maximize transform → open/close
 * animation (Web Animations API) → hover lift → the window chrome.
 * Keeping each motion on its own layer means they never fight over one
 * transform.
 *
 * - Drag by the title bar (desktop with a mouse/trackpad only), kept
 *   inside the hero so a window can't be lost off-screen.
 * - Minimize zooms the window down into the taskbar; restore zooms it back
 *   out of its taskbar button, like Windows 98's window animations.
 * - Maximize (button or title-bar double-click) enlarges the window over
 *   the stage; the same control restores it.
 * - Close shrinks it into the monitor's screen, collapsing like a CRT
 *   switching off; reopening it from the taskbar brings it back out of
 *   the screen, at its original spot and size.
 * Under prefers-reduced-motion every change happens instantly.
 */
export function HeroWindow({
  id,
  title,
  destination,
  href,
  ariaLabel,
  tooltip,
  className,
  children,
}: HeroWindowProps) {
  const desktop = useHeroDesktop();
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const drag = useRef<{
    pointerX: number;
    pointerY: number;
    startX: number;
    startY: number;
    rect: DOMRect;
    bounds: DOMRect;
    x: number;
    y: number;
  } | null>(null);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [maxTransform, setMaxTransform] = useState<{ x: number; y: number; scale: number } | null>(null);

  const status: WindowStatus = desktop?.statusOf(id) ?? "open";
  const canDrag = desktop?.canDrag ?? false;
  const scale = maximized && maxTransform ? maxTransform.scale : 1;

  /** Size and place the maximized window: centered over the stage,
   * as large as fits (up to MAX_SCALE). */
  const measureMaximized = useCallback(() => {
    const stage = desktop?.stageRef.current?.getBoundingClientRect();
    const base = wrapRef.current?.getBoundingClientRect();
    if (!stage || !base || !base.width) return null;
    const fit = Math.min(
      (stage.width * 0.9) / base.width,
      (stage.height * 0.92) / base.height,
      MAX_SCALE,
    );
    return {
      x: stage.left + stage.width / 2 - (base.left + base.width / 2),
      y: stage.top + stage.height / 2 - (base.top + base.height / 2),
      scale: Math.max(1, fit),
    };
  }, [desktop]);

  useEffect(() => {
    if (!maximized) return;
    const onResize = () => setMaxTransform(measureMaximized());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [maximized, measureMaximized]);

  /** Vector (in the animation layer's own, possibly scaled, space) from
   * this window's center to a point on screen. */
  const vectorTo = useCallback(
    (x: number, y: number) => {
      const r = animRef.current!.getBoundingClientRect();
      return {
        x: (x - (r.left + r.width / 2)) / scale,
        y: (y - (r.top + r.height / 2)) / scale,
      };
    },
    [scale],
  );

  const hideAs = useCallback(
    (hiddenStatus: "minimized" | "closed") => {
      if (!desktop || busy.current) return;
      const focusTaskbar = !!wrapRef.current?.contains(document.activeElement);
      const finish = () => {
        busy.current = false;
        if (hiddenStatus === "closed") {
          // Reopening starts fresh, back at the window's resting spot.
          setOffset({ x: 0, y: 0 });
          setMaximized(false);
        }
        desktop.hide({ id, title, destination, status: hiddenStatus }, focusTaskbar);
      };
      const anim = animRef.current;
      if (!anim || prefersReducedMotion()) return finish();

      busy.current = true;
      let animation: Animation;
      if (hiddenStatus === "minimized") {
        // Fly to where this window's taskbar button will appear.
        const bar = desktop.taskbarRef.current!.getBoundingClientRect();
        const to = vectorTo(
          bar.width ? bar.right + 56 : bar.left + 56,
          bar.top + (bar.height || 28) / 2,
        );
        animation = anim.animate(
          [
            { transform: "none", opacity: 1 },
            { opacity: 0.85, offset: 0.7 },
            { transform: `translate(${to.x}px, ${to.y}px) scale(0.08, 0.06)`, opacity: 0 },
          ],
          { duration: 260, easing: "cubic-bezier(0.5, 0, 0.9, 0.6)", fill: "forwards" },
        );
      } else {
        // Sucked into the monitor: shrink onto the screen, then collapse
        // to a bright line and a dot like a CRT switching off, while the
        // screen flares as it takes the window in.
        const screen = monitorScreen(desktop.stageRef.current);
        const r = screen?.getBoundingClientRect();
        const to = r ? vectorTo(r.left + r.width / 2, r.top + r.height / 2) : { x: 0, y: 0 };
        const at = `translate(${to.x}px, ${to.y}px)`;
        animation = anim.animate(
          [
            { transform: "none", opacity: 1, filter: "none", easing: "cubic-bezier(0.55, 0, 0.75, 0.3)" },
            { transform: `${at} scale(0.2)`, opacity: 1, filter: "brightness(1.1)", offset: 0.62 },
            { transform: `${at} scale(0.2, 0.012)`, opacity: 1, filter: "brightness(1.8)", offset: 0.82 },
            { transform: `${at} scale(0, 0.012)`, opacity: 0, filter: "brightness(2)" },
          ],
          { duration: 460, fill: "forwards" },
        );
        screen?.animate(
          [{ filter: "brightness(1.04)" }, { filter: "brightness(1.22) saturate(1.3)" }, { filter: "brightness(1.04)" }],
          { duration: 360, delay: 300, easing: "ease-out" },
        );
      }
      animation.onfinish = finish;
    },
    [desktop, id, title, destination, vectorTo],
  );

  // Coming back from the taskbar: zoom out of the taskbar button.
  const prevStatus = useRef(status);
  useLayoutEffect(() => {
    const was = prevStatus.current;
    prevStatus.current = status;
    if (status !== "open" || was === "open") return;
    const anim = animRef.current;
    if (!anim) return;
    anim.getAnimations().forEach((a) => a.cancel());
    const from = desktop?.takeOpenFrom(id);
    if (from && !prefersReducedMotion()) {
      const v = vectorTo(from.rect.left + from.rect.width / 2, from.rect.top + from.rect.height / 2);
      const at = `translate(${v.x}px, ${v.y}px)`;
      if (from.fromScreen) {
        // A closed window comes back out of the monitor: the CRT
        // switch-off in reverse (dot, line, small window, full size).
        anim.animate(
          [
            { transform: `${at} scale(0, 0.012)`, opacity: 0, filter: "brightness(2)" },
            { transform: `${at} scale(0.2, 0.012)`, opacity: 1, filter: "brightness(1.8)", offset: 0.16 },
            { transform: `${at} scale(0.2)`, opacity: 1, filter: "brightness(1.1)", offset: 0.36, easing: "cubic-bezier(0.2, 0.8, 0.25, 1)" },
            { transform: "none", opacity: 1, filter: "none" },
          ],
          { duration: 480 },
        );
      } else {
        anim.animate(
          [
            { transform: `${at} scale(0.08, 0.06)`, opacity: 0 },
            { opacity: 1, offset: 0.35 },
            { transform: "none", opacity: 1 },
          ],
          { duration: 280, easing: "cubic-bezier(0.2, 0.8, 0.25, 1)" },
        );
      }
    }
    if (from?.focus) wrapRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus();
  }, [status, desktop, id, vectorTo]);

  const toggleMaximize = useCallback(() => {
    if (busy.current) return;
    if (maximized) {
      setMaximized(false);
    } else {
      setMaxTransform(measureMaximized());
      setMaximized(true);
      desktop?.focusWindow(id);
    }
  }, [maximized, measureMaximized, desktop, id]);

  const draggable = canDrag && !maximized;

  const titleBarProps = useMemo<React.HTMLAttributes<HTMLDivElement>>(
    () => ({
      onDoubleClick: (e) => {
        if ((e.target as Element).closest("button")) return;
        toggleMaximize();
      },
      onPointerDown: (e) => {
        if (!draggable || e.button !== 0) return;
        if ((e.target as Element).closest("button")) return;
        const layer = dragRef.current;
        const section = wrapRef.current?.closest("[data-hero]");
        if (!layer || !section) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        drag.current = {
          pointerX: e.clientX,
          pointerY: e.clientY,
          startX: offset.x,
          startY: offset.y,
          rect: layer.getBoundingClientRect(),
          bounds: section.getBoundingClientRect(),
          x: offset.x,
          y: offset.y,
        };
        setDragging(true);
      },
      onPointerMove: (e) => {
        const d = drag.current;
        const layer = dragRef.current;
        if (!d || !layer) return;
        // Keep the title bar reachable: at least 96px of the window stays
        // inside the hero sideways, and the title bar never leaves it.
        const left = clamp(
          d.rect.left + e.clientX - d.pointerX,
          d.bounds.left - d.rect.width + 96,
          d.bounds.right - 96,
        );
        const top = clamp(
          d.rect.top + e.clientY - d.pointerY,
          d.bounds.top + 8,
          d.bounds.bottom - 40,
        );
        d.x = d.startX + left - d.rect.left;
        d.y = d.startY + top - d.rect.top;
        layer.style.transform = `translate(${d.x}px, ${d.y}px)`;
      },
      onPointerUp: () => endDrag(),
      onPointerCancel: () => endDrag(),
    }),
    [draggable, offset, toggleMaximize],
  );

  function endDrag() {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    setOffset({ x: d.x, y: d.y });
    setDragging(false);
  }

  const controls = useMemo<WindowControls>(
    () => ({
      href,
      ariaLabel,
      title,
      maximized,
      draggable,
      minimize: () => hideAs("minimized"),
      close: () => hideAs("closed"),
      toggleMaximize,
      titleBarProps,
    }),
    [href, ariaLabel, title, maximized, draggable, hideAs, toggleMaximize, titleBarProps],
  );

  const transform =
    maximized && maxTransform
      ? `translate(${maxTransform.x}px, ${maxTransform.y}px) scale(${maxTransform.scale})`
      : `translate(${offset.x}px, ${offset.y}px)`;

  return (
    <div
      ref={wrapRef}
      hidden={status !== "open"}
      className={cn("absolute", className)}
      style={{ zIndex: desktop?.zIndexOf(id) ?? 10 }}
      onPointerDownCapture={() => desktop?.focusWindow(id)}
      onFocusCapture={() => desktop?.focusWindow(id)}
    >
      <div
        ref={dragRef}
        className={cn(
          "origin-center transition-transform duration-250 ease-[cubic-bezier(0.2,0.8,0.25,1)] motion-reduce:transition-none",
          dragging && "transition-none",
        )}
        style={{ transform }}
      >
        <div ref={animRef} className="origin-center">
          <div
            className={LIFT}
            data-dragging={dragging || undefined}
            data-maximized={maximized || undefined}
          >
            <WindowContext.Provider value={controls}>{children}</WindowContext.Provider>
            {tooltip}
          </div>
        </div>
      </div>
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
