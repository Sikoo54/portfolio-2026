// ============================================================
// SKILLS (STACK) — 3 baris marquee chip skill yang jalan
// kontinu (CSS keyframes, bukan GSAP) + showcase sertifikasi.
// - Marquee duplikat konten otomatis sesuai lebar layar
//   (useSeamlessSets) biar loop tanpa celah.
// - Rows masuk dari kiri/kanan selang-seling (GSAP scrub);
//   chip yang di-hover berubah lime.
// ============================================================
"use client";

import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { gsap } from "@/lib/gsap";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiFigma,
  SiGraphql,
  SiVercel,
  SiGreensock,
  SiRedux,
  SiSass,
  SiPostgresql,
  SiPrisma,
  SiVite,
} from "react-icons/si";
import SectionHeading from "@/components/SectionHeading";
import EdgeText from "@/components/ui/EdgeText";
import { certifications } from "@/data/portfolio";

type Skill = { name: string; Icon: IconType };

const rows: { label: string; items: Skill[] }[] = [
  {
    label: "Languages & Frameworks",
    items: [
      { name: "TypeScript", Icon: SiTypescript },
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "HTML5", Icon: SiHtml5 },
    ],
  },
  {
    label: "Tooling & Workflow",
    items: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Figma", Icon: SiFigma },
      { name: "GraphQL", Icon: SiGraphql },
      { name: "Vercel", Icon: SiVercel },
    ],
  },
  {
    label: "Data & Motion",
    items: [
      { name: "GSAP", Icon: SiGreensock },
      { name: "Redux", Icon: SiRedux },
      { name: "Sass", Icon: SiSass },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Prisma", Icon: SiPrisma },
      { name: "Vite", Icon: SiVite },
    ],
  },
];

const MIN_SETS = 3;
const SECONDS_PER_SET = 12;

function useSeamlessSets() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [sets, setSets] = useState(MIN_SETS);

  useEffect(() => {
    const recalc = () => {
      const track = trackRef.current;
      if (!track) return;
      let target = Math.ceil((window.innerWidth * 2) / track.scrollWidth);
      target = Math.max(MIN_SETS, Math.min(target, 12));
      if (target !== Number(track.dataset.setsCount)) {
        track.dataset.setsCount = String(target);
        setSets(target);
      }
    };
    recalc();
    const raf = requestAnimationFrame(recalc);
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready) document.fonts.ready.then(recalc);
    function onResize() {
      cancelAnimationFrame(raf);
      requestAnimationFrame(recalc);
    }
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { trackRef, sets };
}

function Cell({ name, Icon }: Skill) {
  return (
    <div
      data-cursor
      className="group flex shrink-0 items-center gap-3 rounded-full border border-line bg-background px-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:border-accent hover:text-background md:px-8 md:py-4"
    >
      <Icon aria-hidden className="size-5 shrink-0 md:size-6" />
      <span className="whitespace-nowrap font-display text-sm font-semibold tracking-tight md:text-base">
        {name}
      </span>
    </div>
  );
}

function SkillRow({ row, index }: { row: (typeof rows)[number]; index: number }) {
  const { trackRef, sets } = useSeamlessSets();

  return (
    <div className="skill-row">
      <div className="mb-3 flex items-center gap-3 px-6 md:px-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          0{index + 1}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          {row.label}
        </span>
      </div>
      <div className="marquee-paused-host overflow-hidden">
        <div
          ref={trackRef}
          data-reverse={index % 2 === 1}
          style={{ "--marquee-duration": `${sets * SECONDS_PER_SET}s` } as React.CSSProperties}
          className="marquee-track flex w-max will-change-transform"
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {Array.from({ length: sets }).map((_, s) => (
                <div
                  key={s}
                  data-set={s === 0 ? true : undefined}
                  className="flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4"
                >
                  {row.items.map(({ name, Icon }) => (
                    <Cell key={name} name={name} Icon={Icon} />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>(".skill-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { xPercent: i % 2 === 1 ? 8 : -8 },
          {
            xPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "top 35%",
              scrub: true,
            },
          }
        );
      });

      gsap.fromTo(
        ".cert-card",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cert-list", start: "top 82%", once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="skills"
      className="relative isolate overflow-hidden border-t border-line bg-panel-glow px-0 py-28 md:py-40"
    >
      <EdgeText side="right" className="text-muted" text="Stack &mdash; daily drivers" />

      <div className="px-6 md:px-12">
        <SectionHeading index="02" title="Stack" />
        <p className="mb-8 max-w-md text-lg text-muted md:text-xl">
          The tools behind the work &mdash; from architecture to motion.
        </p>
      </div>

      <div className="flex flex-col gap-8 md:gap-10">
        {rows.map((row, i) => (
          <SkillRow key={row.label} row={row} index={i} />
        ))}
      </div>

      <div className="cert-list mt-16 md:mt-20">
        <p className="mb-5 px-6 font-mono text-xs uppercase tracking-[0.3em] text-muted md:px-12">
          Certifications
        </p>
        <div className="flex flex-wrap gap-3 px-6 md:gap-4 md:px-12">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              data-cursor
              className="cert-card flex items-center gap-3 rounded-full border border-line bg-background px-5 py-3.5 transition-colors duration-300 hover:border-accent"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                Cert&nbsp;{cert.year}
              </span>
              <span className="text-sm font-semibold tracking-tight">{cert.name}</span>
              <span className="hidden text-xs text-muted sm:inline">&mdash; {cert.issuer}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}