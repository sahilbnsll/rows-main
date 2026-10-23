import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Hanken_Grotesk, Newsreader } from "next/font/google";
import { org } from "@/content/site";
import { isIndexable, siteUrl } from "@/lib/site-url";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteBackground } from "@/components/ui/SiteBackground";
import "@/styles/globals.css";

// Display: a bold, high-contrast serif close to the festival poster's lettering.
const dmSerif = DM_Serif_Display({ variable: "--font-dm-serif", subsets: ["latin"], weight: "400", style: "normal", display: "swap" });
// Reading text.
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], weight: ["400", "500"], style: "normal", display: "swap" });
// The italic is a large file and only dresses short phrases, so it is not preloaded.
const newsreaderItalic = Newsreader({ variable: "--font-newsreader-italic", subsets: ["latin"], weight: ["400", "500"], style: "italic", display: "swap", preload: false });
// Interface text.
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"], display: "swap" });

const description =
  "A Delhi-based registered non-profit that produces spiritual dance, hosts the International Ancient Arts Festival and organises yoga workshops.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Rays of Wisdom Society | The wisdom behind ancient rituals and practices", template: "%s | Rays of Wisdom Society" },
  description,
  applicationName: org.name,
  authors: [{ name: org.name, url: siteUrl }],
  creator: org.name,
  publisher: org.name,
  keywords: [
    "Rays of Wisdom Society",
    "International Ancient Arts Festival",
    "IAAF",
    "Reela Hota",
    "Odissi",
    "Indian classical dance",
    "ancient arts and healing",
    "yoga workshops Delhi",
    "cultural NGO Delhi",
  ],
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: org.name, locale: "en_IN", url: "/", title: org.name, description },
  twitter: { card: "summary_large_image", title: org.name, description },
  robots: isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f6efe0", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${dmSerif.variable} ${newsreader.variable} ${newsreaderItalic.variable} ${hanken.variable}`}>
      <head>
        {/* Restores the lamp before the first paint, so a lit page never flashes dark. */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem('rws-lamp')==='on')document.documentElement.dataset.lamp='on'}catch(e){}` }} />
      </head>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.mask-reveal{clip-path:none!important}.develop img{filter:none!important}.arch-rise,.hero-rise{animation:none!important}.pull-word>span{transform:none!important}`}</style>
        </noscript>
        <SiteBackground />
        <div className="lamp-glow" aria-hidden="true" />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
