import type { Metadata } from "next";
import { PlaygroundBook } from "@/components/sections/home/PlaygroundBook";

export const metadata: Metadata = {
  title: "Playground",
};

/**
 * The Playground: the painted landscape with Gobi and Yoshi first (see
 * PlaygroundLandscape — rendered inside PlaygroundBook as the pinned panel
 * the sketchbook's wave rises over), then the sketchbook — reached only through the nav's "Playground"
 * item and the hero's Paint window, no longer part of the homepage's
 * scroll. Still the one and only mounted PlaygroundBook, so the
 * book-return scroll restore (see book-return.ts) keeps working: the
 * 2D/3D work pages link back here.
 */
export default function PlaygroundPage() {
  return <PlaygroundBook />;
}
