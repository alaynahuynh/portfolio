import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import { MotionConfig } from "motion/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  // Previously normal-only — the hero monitor's screen text sets the
  // name in italic Fraunces, which needs the real italic font files
  // loaded (not a browser-synthesized oblique of the upright weight).
  style: ["normal", "italic"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

/** Custom handwriting font made in Calligraphr from Alayna's own
 * handwriting — the site's only handwriting face (see
 * font-alayna-handwriting in globals.css). */
const alaynaHandwriting = localFont({
  src: "../../public/fonts/AlaynaHandwriting-Regular.ttf",
  variable: "--font-alayna",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${alaynaHandwriting.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MotionConfig reducedMotion="user">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-(--radius-default) focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CustomCursor />
        </MotionConfig>
      </body>
    </html>
  );
}
