"use client";

import { site, socials } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Magnetic from "@/components/ui/Magnetic";
import EdgeText from "@/components/ui/EdgeText";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-accent-bright px-6 py-28 text-[#141509] md:px-12 md:py-44"
    >
      <EdgeText side="left" className="text-[#141509]/50" text="Say hello &mdash; don&rsquo;t be shy" />
      <div className="[&_h2]:text-[#141509]/60 [&_span.sh-line]:bg-[#141509]/20 [&_span.font-mono]:text-[#141509]">
        <SectionHeading index="04" title="Contact" />
      </div>

      <div className="relative">
        <h2 className="contact-title font-display font-bold uppercase leading-[0.9] tracking-tight">
          <span className="block pb-2">
            <span className="block text-[clamp(3rem,11vw,9.5rem)]">Let&apos;s work</span>
          </span>
          <span className="block pb-5 md:pb-6">
            <span className="block font-editorial text-[clamp(3.25rem,11vw,10rem)] font-normal normal-case italic leading-[0.9] tracking-tight text-[#141509]">
              together
            </span>
          </span>
        </h2>

        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 md:block">
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${site.email}`}
              data-cursor
              className="flex size-40 items-center justify-center rounded-full bg-[#141509] text-center font-display text-base font-bold uppercase tracking-wide text-[#c6f24e] transition-colors duration-300 hover:bg-[#f0f2e6] hover:text-[#141509] lg:size-48 lg:text-lg"
            >
              Say hello
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        <a
          href={`mailto:${site.email}`}
          className="font-display text-xl font-semibold tracking-tight underline-offset-8 transition-colors duration-300 hover:underline md:text-3xl"
        >
          {site.email}
        </a>
        <div className="mt-8 flex gap-6 text-sm text-[#141509]/60">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 hover:text-[#141509]"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
