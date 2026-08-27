"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export default function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
