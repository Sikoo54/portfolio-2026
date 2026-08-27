"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { startLenis } from "@/lib/lenis";

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const w = window as unknown as { __portfolioLoaded?: boolean };
    const finish = () => {
      w.__portfolioLoaded = true;
      document.documentElement.classList.remove("pre-loading");
      startLenis();
      window.dispatchEvent(new Event("portfolio:loaded"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      el.style.display = "none";
      return;
    }

    document.documentElement.classList.add("pre-loading");

    const ctx = gsap.context(() => {
      const counter = { value: 0 };
      const counterEl = el.querySelector(".pre-counter");
      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          el.style.display = "none";
        },
      });

      tl.fromTo(
        ".pre-word-inner",
        { yPercent: 120 },
        { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.08 },
        0.15
      )
        .fromTo(
          counter,
          { value: 0 },
          {
            value: 100,
            duration: 1.7,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterEl) counterEl.textContent = `${Math.round(counter.value)}`;
            },
          },
          0.2
        )
        .fromTo(
          ".pre-bar",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.7, ease: "power2.inOut" },
          0.2
        )
        .to(".pre-fade", { opacity: 0, y: -16, duration: 0.35, ease: "power2.in" }, "+=0.15")
        .add(finish, "<")
        .to(el, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        })
        .to(
          el,
          {
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
            duration: 0.9,
            ease: "power4.inOut",
          },
          "<"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[95] flex flex-col justify-between overflow-hidden bg-[#0e0f0a] px-6 pb-6 pt-28 text-[#f0f2e6] md:px-12"
    >
      <div className="pre-fade flex justify-center overflow-hidden">
        <span className="pre-word-inner block font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
          SA<span className="text-[#c6f24e]">&copy;</span>
        </span>
      </div>

      <div className="pre-fade flex items-end justify-between">
        <div className="overflow-hidden">
          <span className="pre-word-inner block font-mono text-[10px] uppercase tracking-[0.35em] text-white/50">
            Sacha Ahsan &mdash; Portfolio &copy;2026
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="pre-counter font-display text-[clamp(5rem,18vw,14rem)] font-bold leading-[0.8] tracking-tight">
            0
          </span>
          <span className="mt-2 font-mono text-sm text-[#c6f24e]">%</span>
        </div>
      </div>

      <div className="pre-fade absolute bottom-0 left-0 h-[2px] w-full bg-white/10">
        <div className="pre-bar h-full w-full origin-left bg-[#c6f24e]" />
      </div>
    </div>
  );
}
