// ============================================================
// ROOT LAYOUT — font, tema, smooth scroll, grain, cursor,
// navbar, dan preloader. Urutan mounting Preloader PALING AKHIR
// penting (dia menunggu semua konten render sebelum intro).
// SEO: metadata lengkap + skip link + JSON-LD (Person).
// ============================================================
import type { Metadata } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/Navbar";
import { site, socials } from "@/data/portfolio";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// Ganti dengan domain produksi setelah deploy.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sachaahsan.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sacha Ahsan — Frontend Developer",
    template: "%s — Sacha Ahsan",
  },
  description:
    "Portfolio of Sacha Ahsan, a frontend developer from Bali crafting fast, accessible interfaces with Next.js, React, and GSAP.",
  applicationName: "Sacha Ahsan — Portfolio",
  keywords: [
    "Sacha Ahsan",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "GSAP",
    "Bali",
    "Indonesia",
    "Web Developer",
  ],
  authors: [{ name: "Sacha Ahsan", url: siteUrl }],
  creator: "Sacha Ahsan",
  publisher: "Sacha Ahsan",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    title: "Sacha Ahsan — Frontend Developer",
    description: "Frontend developer from Bali crafting fast, accessible interfaces.",
    siteName: "Sacha Ahsan — Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacha Ahsan — Frontend Developer",
    description: "Frontend developer from Bali crafting fast, accessible interfaces.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: siteUrl,
  image: `${siteUrl}/og`,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bali",
    addressCountry: "ID",
  },
  sameAs: socials.map((s) => s.href),
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "GSAP",
    "Web Development",
    "UI Engineering",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrument.variable}`}
    >
      <body className="bg-canvas font-sans text-foreground antialiased">
        <a
          href="#main"
          className="skip-link bg-accent px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-background"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SmoothScroll>
            <div aria-hidden className="atmosphere pointer-events-none fixed inset-0 z-0" />
            <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[80] opacity-40" />
            <Cursor />
            <Navbar />
            <main id="main">{children}</main>
            <Preloader />
          </SmoothScroll>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}