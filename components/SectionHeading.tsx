"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function SectionHeading({ index, title }: { index: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".sh-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 92%", end: "top 55%", scrub: true },
        }
      );

      gsap.fromTo(
        ".sh-title",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mb-12 flex items-baseline gap-4 md:mb-16">
      <span className="font-mono text-sm text-accent">({index})</span>
      <h2 className="sh-title font-display text-sm uppercase tracking-[0.3em] text-muted">{title}</h2>
      <span className="sh-line h-px flex-1 origin-left bg-line" />
    </div>
  );
}
