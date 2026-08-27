"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { projects, socials } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import EdgeText from "@/components/ui/EdgeText";

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const track = trackRef.current;
      if (!track) return;

      const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.fromTo(
        ".project-card",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        }
      );

      const proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(".project-card", "skewX", "deg");
      const clampSkew = gsap.utils.clamp(-6, 6);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: () => `+=${getAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const skew = clampSkew(self.getVelocity() / -350);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                skew: 0,
                duration: 0.8,
                ease: "power3",
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew),
              });
            }
          },
        },
      });
      tl.to(track, { x: () => -getAmount(), ease: "none" }, 0).fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none" },
        0
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const github = socials.find((s) => s.label === "GitHub")?.href ?? "https://github.com";

  return (
    <section
      ref={ref}
      id="work"
      className="section-dark relative isolate flex h-svh flex-col justify-center overflow-hidden border-t border-line bg-canvas py-20"
    >
      <EdgeText side="left" className="text-muted" text="Selected work &mdash; 24&thinsp;/&thinsp;26" />

      <div className="px-6 md:px-12">
        <SectionHeading index="03" title="Selected Work" />
      </div>

      <div className="mt-4">
        <div ref={trackRef} className="flex w-max items-stretch gap-5 pl-6 pr-[12vw] md:gap-8 md:pl-12">
          {projects.map((project, i) => (
            <article
              key={project.title}
              data-cursor-label="VIEW"
              className="project-card group flex w-[82vw] shrink-0 flex-col border border-line bg-panel transition-colors duration-300 hover:border-foreground sm:w-[62vw] lg:w-[42vw]"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.category}`}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 65vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight md:text-4xl">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </div>
                <p className="mt-2 text-sm text-muted md:text-base">{project.description}</p>
                <div className="mt-auto flex items-center justify-between pt-6 md:pt-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {project.category} &mdash; {project.year}
                  </span>
                  <ArrowUpRight className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                </div>
              </div>
            </article>
          ))}

          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            data-cursor
            className="project-card group flex w-[60vw] shrink-0 flex-col items-center justify-center gap-5 border border-dashed border-line p-8 text-center transition-colors duration-300 hover:border-accent sm:w-[38vw] lg:w-[24vw]"
          >
            <ArrowUpRight className="rotate-45 text-muted transition-colors duration-300 group-hover:text-accent" />
            <span className="font-display text-xl font-bold uppercase tracking-tight md:text-2xl">
              See more on GitHub
            </span>
          </a>
        </div>
      </div>

      <div className="mx-6 mt-10 h-px bg-line md:mx-12" aria-hidden>
        <span ref={progressBarRef} className="block h-full w-full origin-left scale-x-0 bg-accent" />
      </div>
    </section>
  );
}
