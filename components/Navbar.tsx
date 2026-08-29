// ============================================================
// NAVBAR + OVERLAY MENU — hamburger melayang (mix-blend
// difference biar selalu terlihat). Overlay dibuka pakai
// timeline GSAP: clip-path wipe + stagger link + meta.
// Saat overlay terbuka Lenis di-stop (scroll bagian belakang
// terkunci), Escape menutup.
// ============================================================
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { navLinks, site, socials } from "@/data/portfolio";
import { stopLenis, startLenis } from "@/lib/lenis";

export default function Navbar() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.set(overlay, { visibility: "visible" })
        .fromTo(
          overlay,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" }
        )
        .fromTo(
          ".menu-link-inner",
          { yPercent: 120 },
          { yPercent: 0, duration: 0.8, stagger: 0.07, ease: "power4.out" },
          "-=0.25"
        )
        .fromTo(
          ".menu-meta",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out" },
          "-=0.5"
        );

      tl.eventCallback("onReverseComplete", () => {
        gsap.set(overlay, { visibility: "hidden" });
      });

      tlRef.current = tl;
    }, overlay);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const tl = tlRef.current;
    if (!overlay) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !tl) {
      gsap.set(overlay, { visibility: open ? "visible" : "hidden", opacity: open ? 1 : 0 });
      if (open) stopLenis();
      else startLenis();
      return;
    }

    if (open) {
      stopLenis();
      tl.timeScale(1).play();
    } else {
      tl.timeScale(1.5).reverse();
      startLenis();
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(".burger-top", { rotate: open ? 45 : 0, y: open ? 0 : -3.5, duration: 0.3, ease: "power3.out" });
    gsap.to(".burger-bottom", { rotate: open ? -45 : 0, y: open ? 0 : 3.5, duration: 0.3, ease: "power3.out" });
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
        className={`fixed right-6 top-6 z-[70] flex size-11 items-center justify-center rounded-full border transition-colors duration-300 md:right-12 md:top-8 ${
          open
            ? "border-white/25 text-[#f0f2e6]"
            : "mix-blend-difference border-white text-white hover:border-[#c6f24e] hover:text-[#c6f24e]"
        }`}
      >
        <span className="burger-top absolute h-px w-5 bg-current" />
        <span className="burger-bottom absolute h-px w-5 bg-current" />
      </button>

      <div
        ref={overlayRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="invisible fixed inset-0 z-[55] bg-[#0e0f0a] text-[#f0f2e6]"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-8 pt-28 md:px-12 md:pt-40">
          <nav className="flex flex-col">
            {navLinks.map((link, i) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="menu-link group block overflow-hidden py-1 md:py-2">
                <span className="menu-link-inner flex items-baseline gap-4 md:gap-6">
                  <span className="font-mono text-xs text-[#c6f24e]/70">0{i + 1}</span>
                  <span className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-tight transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#c6f24e]">
                    {link.label}
                  </span>
                </span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="menu-meta flex flex-col gap-1 font-mono text-xs uppercase tracking-widest text-white/50">
              <span className="text-[10px] text-white/30">Email</span>
              <a href={`mailto:${site.email}`} className="text-sm normal-case tracking-normal text-[#f0f2e6] transition-colors hover:text-[#c6f24e]">
                {site.email}
              </a>
            </div>

            <div className="menu-meta flex flex-col gap-1 font-mono text-xs uppercase tracking-widest text-white/50">
              <span className="text-[10px] text-white/30">Socials</span>
              <div className="flex gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm normal-case tracking-normal text-[#f0f2e6] transition-colors hover:text-[#c6f24e]"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="menu-meta flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-widest">
                <span className="size-2 animate-pulse rounded-full bg-[#c6f24e]" />
                {site.availability}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
