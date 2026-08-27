"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/data/portfolio";
import EdgeText from "@/components/ui/EdgeText";
import MoltenMetal from "@/components/ui/MoltenMetal";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".hero-line-inner",
        { yPercent: 115 },
        { yPercent: 0, duration: 1.2, stagger: 0.14 },
        0.1
      ).fromTo(
        ".hero-fade",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
        "-=0.7"
      );

      if (reduced) {
        tl.progress(1);
      } else {
        const w = window as unknown as { __portfolioLoaded?: boolean };
        const play = () => tl.play();
        if (w.__portfolioLoaded) {
          tl.play();
        } else {
          window.addEventListener("portfolio:loaded", play, { once: true });
        }

        gsap.to(".scroll-bar", {
          yPercent: 320,
          repeat: -1,
          duration: 1.4,
          ease: "power2.inOut",
          repeatDelay: 0.4,
        });

        const aboutPanel = document.querySelector("#about");
        if (aboutPanel) {
          gsap.to(".hero-inner", {
            scale: 0.95,
            autoAlpha: 0.35,
            yPercent: -4,
            ease: "none",
            scrollTrigger: {
              trigger: aboutPanel,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        }
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-0 h-svh overflow-hidden bg-[#0d0f08] px-6 pb-8 pt-28 md:px-12"
    >
      <div className="absolute inset-0" aria-hidden>
        <MoltenMetal
          color1="#0d0f08"
          color2="#c6f24e"
          color3="#f2ffd9"
          speed={0.32}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.25}
          colorMode="molten"
          grain
          grainIntensity={0.05}
          mouseInteraction
          mouseStrength={0.3}
          opacity={0.9}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[#0d0f08]/30" aria-hidden />

      <EdgeText side="left" className="text-white/40" text="6.2088&deg; S &mdash; 106.8456&deg; E" />
      <EdgeText side="right" className="text-white/40" text="Folio &mdash; 2026" />

      <div className="hero-inner relative flex h-full flex-col justify-between text-[#f0f2e6]">
        <div className="hero-fade flex items-center justify-between font-mono text-xs uppercase tracking-widest text-white/50">
          <span>Portfolio &mdash; {new Date().getFullYear()}</span>
          <span>Based in {site.location}</span>
        </div>

        <h1 className="hero-title font-display font-bold uppercase leading-[0.88] tracking-tight">
          <span className="block overflow-hidden pb-1">
            <span className="hero-line-inner block text-[clamp(3.5rem,14vw,12rem)]">{site.firstName}</span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="hero-line-inner block text-[clamp(3.5rem,14vw,12rem)]">
              {site.lastName}
              <span className="text-[#c6f24e]" aria-hidden>
                .
              </span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line-inner block pt-3 pb-3 text-[clamp(1rem,2.5vw,1.75rem)] font-medium normal-case tracking-normal text-white/60">
              {site.role} &mdash; crafting interfaces that{" "}
              <em className="font-editorial text-[#f2ffd9]">move</em>
            </span>
          </span>
        </h1>

        <div className="flex items-end justify-between">
          <div className="hero-fade flex items-center gap-3 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-widest">
            <span className="size-2 animate-pulse rounded-full bg-[#c6f24e]" />
            {site.availability}
          </div>
          <div className="hero-fade hidden flex-col items-center gap-3 sm:flex" aria-hidden>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
            <span className="relative h-12 w-px overflow-hidden bg-white/15">
              <span className="scroll-bar absolute left-0 top-0 h-4 w-px bg-white" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
