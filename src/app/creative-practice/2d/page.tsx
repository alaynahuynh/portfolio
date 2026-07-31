import type { Metadata } from "next";
import { TwoDGallery } from "@/components/sections/TwoDGallery";

export const metadata: Metadata = {
  title: "2D Works",
};

export default function TwoDWorksPage() {
  return <TwoDGallery />;
}
