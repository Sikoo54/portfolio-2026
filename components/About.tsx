"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { aboutText } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import EdgeText from "@/components/ui/EdgeText";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        ".about-word",
        { opacity: 0 },
        { opacity: 1, stagger: 0.03, ease: "none", duration: 0.4 },
        0
      ).to({}, { duration: 0.6 }, 0.4);
    }, ref);
    return () => ctx.revert();
  }, []);

  const words = aboutText.split(" ");

  return (
    <section
      ref={ref}
      id="about"
      className="section-about relative h-svh overflow-hidden px-6 py-24 md:px-12 md:py-32"
    >
      <div aria-hidden className="bg-panel-glow absolute inset-0 -z-20" />
      <EdgeText side="right" className="text-muted" text="Profile &mdash; who I am" />
      <div className="relative flex h-full flex-col justify-center">
        <SectionHeading index="01" title="About" />

        <p className="about-text max-w-5xl text-3xl font-medium leading-snug tracking-tight md:text-5xl">
          {words.map((word, i) => {
            const accent = word === "details." || word === "alive.";
            return (
              <span
                key={i}
                className={`about-word inline-block ${accent ? "font-editorial italic text-accent" : ""}`}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
