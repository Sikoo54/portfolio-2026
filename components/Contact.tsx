// ============================================================
// CONTACT — satu layar penuh (h-svh) lime + ink.
// Satu card besar di tengah: title "Let's work together",
// availability, email (klik + copy), socials, download CV.
// ============================================================
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { site, socials } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import EdgeText from "@/components/ui/EdgeText";

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
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 64, scale: 0.96, rotateX: 8, transformOrigin: "center top" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-main", start: "top 88%", once: true },
        }
      );

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
          scrollTrigger: { trigger: ".contact-main", start: "top 85%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative flex min-h-svh flex-col overflow-hidden bg-accent-bright pt-24 pb-10 text-[#141509] md:h-svh md:pt-32 md:pb-12"
    >
      <EdgeText side="left" className="text-[#141509]/50" text="Say hello &mdash; don&rsquo;t be shy" />
      <div className="pointer-events-none absolute inset-x-6 top-14 z-10 md:inset-x-12 md:top-20 [&_h2]:text-[#141509]/60 [&_span.sh-line]:bg-[#141509]/20 [&_span.font-mono]:text-[#141509]">
        <SectionHeading index="04" title="Contact" />
      </div>

      <div className="contact-main relative mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 [perspective:1200px] md:px-8">
        <div className="contact-card flex flex-col items-center rounded-3xl border border-[#c6f24e]/22 bg-[#10200f] px-6 py-10 text-center text-[#f0f2e6] shadow-[0_30px_70px_-45px_rgba(0,0,0,0.45)] md:px-14 md:py-14">
          <div className="contact-item flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <span className="flex items-center gap-3 rounded-full border border-[#f0f2e6]/25 px-4 py-2 text-[10px] uppercase tracking-[0.2em] md:text-xs">
              <span className="size-2 animate-pulse rounded-full bg-[#c6f24e]" />
              {site.availability}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#f0f2e6]/55 md:text-xs">
              Bali &mdash; Indonesia &middot; GMT+8
            </span>
          </div>

          <h2 className="contact-title mt-7 font-display text-[clamp(2.3rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight md:mt-9">
            <span className="block overflow-hidden pb-2">
              <Letters text="LET'S WORK" />
            </span>
            <span className="block overflow-hidden pb-3">
              <Letters text="together" className="font-editorial italic font-normal text-[#c6f24e]" />
            </span>
          </h2>

          <p className="contact-item mt-5 max-w-md text-sm text-[#f0f2e6]/65 md:text-base">
            Have a project, a role, or just an idea worth building? My inbox is open.
          </p>

          <div className="contact-item mt-8 flex w-full flex-col items-center gap-3 md:mt-10">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <a
                href={`mailto:${site.email}`}
                className="font-display text-lg font-bold tracking-tight text-[#f0f2e6] underline decoration-[#c6f24e]/40 decoration-2 underline-offset-[6px] transition-colors hover:decoration-[#c6f24e] sm:text-xl md:text-2xl"
              >
                {site.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-live="polite"
                className="inline-flex items-center gap-2 rounded-full border border-[#f0f2e6]/25 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f0f2e6] transition-colors hover:border-[#c6f24e] hover:bg-[#c6f24e] hover:text-[#141509]"
              >
                {copied ? "Copied" : "Copy"}
                <svg
                  className="size-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {copied ? (
                    <path d="M20 6L9 17l-5-5" />
                  ) : (
                    <>
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="contact-item mt-9 flex w-full flex-col items-center gap-3 border-t border-[#f0f2e6]/12 pt-7 md:mt-11">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#f0f2e6]/45">
              Elsewhere
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {socials.map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-[#f0f2e6] transition-colors hover:text-[#c6f24e]"
                >
                  <span className="font-mono text-[10px] text-[#c6f24e]/60 group-hover:text-[#c6f24e]">
                    0{i + 1}
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    {s.label}
                  </span>
                  <svg
                    className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <a
            href="/cv.pdf"
            download
            className="group contact-item mt-8 inline-flex items-center gap-3 rounded-full bg-[#c6f24e] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#141509] transition-transform duration-300 hover:-translate-y-0.5 md:text-xs"
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
              aria-hidden
            >
              <path d="M12 3v12" />
              <path d="M7 10l5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
