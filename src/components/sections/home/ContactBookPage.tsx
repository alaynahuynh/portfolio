import Link from "next/link";
import { siteConfig, socialLinks } from "@/lib/site-config";
import { ResumeLink } from "@/components/ui/ResumeLink";

const linkedIn = socialLinks.find((link) => link.label === "LinkedIn");

const linkClasses =
  "text-lg font-medium text-earth transition-colors hover:text-earth/70";

/**
 * The book's final content page — deliberately spare. One handwritten
 * line and three simple links, sitting inside BookPage/PageContent
 * (which already supplies the parchment texture), with the back cover
 * right behind it once the visitor keeps scrolling.
 */
export function ContactBookPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 text-center">
      <p className="font-alayna-handwriting text-4xl text-earth sm:text-5xl">
        Let&apos;s create something together.
      </p>

      <div className="flex flex-col items-center gap-3">
        <Link href={`mailto:${siteConfig.email}`} className={linkClasses}>
          {siteConfig.email}
        </Link>
        {linkedIn && (
          <Link
            href={linkedIn.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses}
          >
            LinkedIn
          </Link>
        )}
        <ResumeLink className={linkClasses} />
      </div>
    </div>
  );
}
