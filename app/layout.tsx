// ============================================================
// ROOT LAYOUT — font, tema, smooth scroll, grain, cursor,
// navbar, dan preloader. Urutan mounting Preloader PALING AKHIR
// penting (dia menunggu semua konten render sebelum intro).
// ============================================================
import type { Metadata } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/Navbar";

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

export const metadata: Metadata = {
  title: "Sacha Ahsan — Frontend Developer",
  description:
    "Portfolio of Sacha Ahsan, a frontend developer from Bali crafting fast, accessible interfaces with Next.js, React, and GSAP.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrument.variable}`}
    >
      <body className="bg-canvas font-sans text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SmoothScroll>
            <div aria-hidden className="atmosphere pointer-events-none fixed inset-0 z-0" />
            <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[80] opacity-40" />
            <Cursor />
            <Navbar />
            <main id="top">{children}</main>
            <Preloader />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
