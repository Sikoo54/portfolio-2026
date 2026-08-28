// ============================================================
// CONTACT — bagian akhir lime penuh (tanpa radius) dengan ink.
// Entrance: judul "Let's work together" reveal per-karakter,
// CTA melingkar "say hello" (Magnetic) dengan ring teks SVG yang
// berputar lambat, dan bottom strip: email besar / socials
// bernomor / lokasi — deathbar tata letak yang lebih kaya.
// ============================================================
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { site, socials } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import EdgeText from "@/components/ui/EdgeText";
import Magnetic from "@/components/ui/Magnetic";

function Letters({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split("").map((l, i) =>
        l === " " ? (
          <span key={i} className="inline-block w-[0.35em]" />
        ) : (
          <span key={i} className={`contact-char inline-block ${className ?? ""}`}>
            {l}
          </span>
        )
      )}
    </>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".contact-char",
        { yPercent: 115, rotate: 12 },
        {
          yPercent: 0,
          rotate: 0,
          stagger: 0.03,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: ".contact-title", start: "top 82%", once: true },
        }
      );

      gsap.fromTo(
        ".contact-item",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-strip", start: "top 88%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative flex min-h-svh flex-col overflow-hidden bg-accent-bright py-24 text-[#141509] md:py-32"
    >
      <EdgeText side="left" className="text-[#141509]/50" text="Say hello &mdash; don&rsquo;t be shy" />
      <div className="pointer-events-none absolute inset-x-6 top-14 z-10 md:inset-x-12 md:top-20 [&_h2]:text-[#141509]/60 [&_span.sh-line]:bg-[#141509]/20 [&_span.font-mono]:text-[#141509]">
        <SectionHeading index="04" title="Contact" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-16 px-6 pt-24 md:gap-20 md:px-12">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:items-center md:gap-16">
          <div className="flex flex-col">
            <h2 className="contact-title font-display text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.95] tracking-tight">
              <span className="block overflow-hidden pb-2">
                <Letters text="LET'S WORK" />
              </span>
              <span className="block overflow-hidden pb-3">
                <Letters text="together" className="font-editorial italic font-normal" />
              </span>
            </h2>
            <div className="mt-8 flex flex-row flex-wrap items-center gap-x-8 gap-y-3">
              <span className="flex items-center gap-3 rounded-full border border-[#141509]/30 px-4 py-2 text-xs uppercase tracking-widest">
                <span className="size-2 animate-pulse rounded-full bg-[#141509]" />
                {site.availability}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#141509]/60">
                Bali &mdash; Indonesia &middot; GMT+8
              </span>
            </div>
          </div>

          <div className="relative flex shrink-0 items-center justify-center">
            <span
              aria-hidden
              className="animate-spin-slow pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <svg viewBox="0 0 200 200" className="size-56 md:size-64">
                <defs>
                  <path id="contact-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text style={{ fontSize: "11.5px", letterSpacing: "0.34em", textTransform: "uppercase" }} fill="#141509" opacity="0.55">
                  <textPath href="#contact-ring">LET'S WORK TOGETHER &middot; SAY HELLO &middot;</textPath>
                </text>
              </svg>
            </span>
            <Magnetic strength={0.5}>
              <a
                href={`mailto:${site.email}`}
                className="flex size-40 items-center justify-center rounded-full bg-[#141509] text-center font-display text-2xl font-bold uppercase leading-none tracking-tight text-[#c6f24e] transition-transform duration-500 md:size-52 md:text-3xl"
              >
                say
                <br />
                hello
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="contact-strip border-t border-[#141509]/25 pt-10 md:pt-14">
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            <div className="contact-item">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#141509]/50">
                Email
              </p>
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-3 font-display text-2xl font-bold tracking-tight underline decoration-[#141509]/25 decoration-2 underline-offset-8 transition-colors hover:decoration-[#141509] md:text-3xl"
              >
                {site.email}
                <svg
                  className="size-5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>

            <div className="contact-item">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#141509]/50">
                Socials
              </p>
              <div className="flex flex-col">
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 py-2 text-sm font-semibold tracking-tight transition-colors hover:text-[#141509]"
                  >
                    <span className="font-mono text-[10px] text-[#141509]/50 group-hover:text-[#141509]/80">
                      0{i + 1}
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {s.label}
                    </span>
                    <svg
                      className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-item">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#141509]/50">
                More
              </p>
              <a
                href="#top"
                className="group inline-flex items-center gap-3 rounded-full border border-[#141509]/40 px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-[#141509] hover:text-[#c6f24e]"
              >
                Download CV
                <svg
                  className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12" />
                  <path d="M7 10l5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>
              </a>
              <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-[#141509]/60">
                Usually reply within 24 hours — happy to chat about your project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}