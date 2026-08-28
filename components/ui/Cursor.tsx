// ============================================================
// CURSOR CUSTOM — ganti arrow standar dengan dot + ring
// (mix-blend-difference, ikut invert warna apa pun).
// - Hover link/button: ring membesar
// - Element [data-cursor-label] (mis. card proyek): ring besar
//   menampilkan teks label (VIEW) via data-cursor-label.
// ============================================================
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.classList.add("has-custom-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(label, { opacity: 0 });

    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    let shown = false;
    const onMove = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const labelled = el.closest<HTMLElement>("[data-cursor-label]");
      const target = labelled ?? el.closest("a, button, [data-cursor]");

      if (labelled) {
        label.textContent = labelled.dataset.cursorLabel ?? "";
        gsap.to(ring, { scale: 3.2, duration: 0.35, ease: "power2.out" });
        gsap.to(label, { opacity: 1, duration: 0.25 });
        gsap.to(dot, { scale: 0, duration: 0.25 });
        return;
      }

      gsap.to(label, { opacity: 0, duration: 0.2 });
      gsap.to(ring, { scale: target ? 2.4 : 1, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: target ? 0.5 : 1, duration: 0.3, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden size-10 rounded-full border border-white mix-blend-difference lg:block"
      >
        <span
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-widest text-white"
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden size-1.5 rounded-full bg-white mix-blend-difference lg:block"
      />
    </>
  );
}
