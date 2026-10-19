import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { MotionConfig } from "motion/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

/** The site's one typeface — headings and body both use Inter. Italic
 * is loaded for the few italic captions/quotes in the case studies. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  style: ["normal", "italic"],
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
  // Unset until the site has a real domain — see siteConfig.url.
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
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
      className={`${inter.variable} ${alaynaHandwriting.variable} h-full antialiased`}
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
          <SmoothScroll />
        </MotionConfig>
      </body>
    </html>
  );
}
