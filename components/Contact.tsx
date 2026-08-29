// ============================================================
// CONTACT — satu layar penuh (h-svh) lime + ink.
// Kiri: title "Let's work together" + availabilty + socials.
// Kanan: form compact (nama/email/pesan, mailto compose).
// Bawah: strip email besar + balasan <24 jam.
// ============================================================
"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`[Portfolio] New message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

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
          scrollTrigger: { trigger: ".contact-main", start: "top 85%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const inputClass =
    "w-full rounded-xl border border-[#141509]/25 bg-transparent px-4 py-2.5 text-sm text-[#141509] outline-none transition-colors placeholder:text-[#141509]/40 focus:border-[#141509]";
  const labelClass = "font-mono text-[10px] uppercase tracking-[0.3em] text-[#141509]/50";

  return (
    <section
      ref={ref}
      id="contact"
      className="relative flex h-svh flex-col overflow-hidden bg-accent-bright pt-24 pb-6 text-[#141509] md:pt-32 md:pb-8"
    >
      <EdgeText side="left" className="text-[#141509]/50" text="Say hello &mdash; don&rsquo;t be shy" />
      <div className="pointer-events-none absolute inset-x-6 top-14 z-10 md:inset-x-12 md:top-20 [&_h2]:text-[#141509]/60 [&_span.sh-line]:bg-[#141509]/20 [&_span.font-mono]:text-[#141509]">
        <SectionHeading index="04" title="Contact" />
      </div>

      <div className="contact-main relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 px-6 md:gap-0 md:px-12">
        <div className="grid flex-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="flex flex-col">
            <h2 className="contact-title font-display text-[clamp(2.5rem,6.5vw,5rem)] font-bold leading-[0.95] tracking-tight">
              <span className="block overflow-hidden pb-2">
                <Letters text="LET'S WORK" />
              </span>
              <span className="block overflow-hidden pb-3">
                <Letters text="together" className="font-editorial italic font-normal" />
              </span>
            </h2>

            <div className="contact-item mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="flex items-center gap-3 rounded-full border border-[#141509]/30 px-4 py-2 text-xs uppercase tracking-widest">
                <span className="size-2 animate-pulse rounded-full bg-[#141509]" />
                {site.availability}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#141509]/60">
                Bali &mdash; Indonesia &middot; GMT+8
              </span>
            </div>

            <div className="contact-item mt-8 flex flex-col gap-2">
              {socials.map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 py-1 text-sm font-semibold tracking-tight"
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

          <form
            onSubmit={handleSubmit}
            className="contact-item flex flex-col gap-4 rounded-2xl border border-[#141509]/20 bg-[#141509]/[0.03] p-6 backdrop-blur-sm md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className={labelClass}>
                  Name
                </label>
                <input id="contact-name" name="name" type="text" required placeholder="Jane Doe" className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className={labelClass}>
                  Email
                </label>
                <input id="contact-email" name="email" type="email" required placeholder="jane@example.com" className={inputClass} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className={labelClass}>
                Project details
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={3}
                required
                placeholder="Tell me about your project, timeline, and budget…"
                className={`${inputClass} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#141509] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#c6f24e] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Send message
              <svg
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
            {submitted && (
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#141509]/70">
                Opening your email app — or email me directly below.
              </p>
            )}
          </form>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#141509]/25 pt-6 sm:flex-row sm:items-center sm:justify-between md:pt-8">
          <a
            href={`mailto:${site.email}`}
            className="group flex items-center gap-3 font-display text-xl font-bold tracking-tight underline decoration-[#141509]/25 decoration-2 underline-offset-8 transition-colors hover:decoration-[#141509] md:text-2xl"
          >
            {site.email}
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
          <div className="flex items-center gap-4">
            <a
              href="#top"
              className="group inline-flex items-center gap-3 rounded-full border border-[#141509]/40 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-[#141509] hover:text-[#c6f24e]"
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
          </div>
        </div>
      </div>
    </section>
  );
}