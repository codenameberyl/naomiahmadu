import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MotionProvider } from "@/components/motion-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// Fraunces, self-hosted and trimmed for speed (see app/fonts/README.md).
// Two fixed optical sizes replace the full variable font (~146 KB):
//  - display cut (144pt) for headlines, metrics and the wordmark
//  - text cut (24pt) for smaller serif text
// "optional" rather than "swap": the fallback serif is wider than Fraunces,
// so a late swap would re-wrap headlines and shift the page. Preloaded files
// are used whenever they arrive in time.
const frauncesDisplay = localFont({
  src: [
    {
      path: "./fonts/Fraunces-144-wght300-400.woff2",
      weight: "300 400",
      style: "normal",
    },
    {
      path: "./fonts/Fraunces-Italic-144-wght300.woff2",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-fraunces-display",
  display: "optional",
  adjustFontFallback: "Times New Roman",
});

const frauncesText = localFont({
  src: [
    {
      path: "./fonts/Fraunces-24-wght400.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-fraunces-text",
  display: "optional",
  adjustFontFallback: "Times New Roman",
});

// Only used for small italic labels ("Role 01"), so it is not preloaded and
// may swap in late without shifting anything meaningful.
const frauncesTextItalic = localFont({
  src: "./fonts/Fraunces-Italic-24-wght400.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-fraunces-text-italic",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6f0" },
    { media: "(prefers-color-scheme: dark)", color: "#161210" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${frauncesDisplay.variable} ${frauncesText.variable} ${frauncesTextItalic.variable} ${instrumentSans.variable}`}
      // The init script sets data-theme before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-accent px-5 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
