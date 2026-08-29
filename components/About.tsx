// ============================================================
// ABOUT — scrollytelling: GSAP ScrollTrigger PIN section di
// viewport (persis Selected Work), scroll selama pinned dipakai
// buat reveal SEMUA kata (3 paragraf + quotes) dari opacity 0→1
// urut kiri→kanan. Kata "Fullstack" diberi aksen italic editorial.
// ============================================================
"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { aboutParas, quoteText } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import EdgeText from "@/components/ui/EdgeText";

function Word({ word, i, accent }: { word: string; i: number; accent: boolean }) {
  return (
    <>
      <span
        className={`about-word inline-block ${accent ? "font-editorial italic text-accent" : ""}`}
      >
        {word}
      </span>{" "}
    </>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        ".about-word",
        { opacity: 0 },
        { opacity: 1, stagger: 0.02, ease: "none", duration: 0.5 },
        0
      ).to({}, { duration: 0.5 }, 0.5);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="section-about relative h-svh snap-start overflow-hidden px-6 py-20 md:px-12"
    >
      <div aria-hidden className="bg-panel-glow absolute inset-0 -z-20" />
      <EdgeText side="right" className="text-muted" text="Profile &mdash; who I am" />
      <div className="pointer-events-none absolute inset-x-6 top-14 z-10 md:inset-x-12 md:top-20">
        <SectionHeading index="01" title="About Me" />
      </div>
      <div className="relative flex h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-4xl pt-16 md:pt-28">

          {aboutParas.map((para, p) => (
            <p
              key={p}
              className="mb-4 text-center font-editorial text-[1.15rem] font-normal leading-[1.55] tracking-tight text-foreground md:mb-6 md:text-[1.85rem] md:leading-[1.4]"
            >
              {para.split(" ").map((word, i) => (
                <Word key={`${p}-${i}`} word={word} i={i} accent={false} />
              ))}
            </p>
          ))}

          <blockquote className="mx-auto mt-6 max-w-2xl text-center font-editorial text-2xl italic leading-relaxed text-accent md:mt-12 md:text-4xl">
            &ldquo;
            {quoteText.split(" ").map((word, i) => (
              <Fragment key={i}>
                <span className="about-word inline-block">{word}</span>{" "}
              </Fragment>
            ))}
            &rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}