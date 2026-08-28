// ============================================================
// GSAP SETUP — registrasi plugin ScrollTrigger sekali.
// Semua komponen import dari sini (bukan dari "gsap" mentah).
// ============================================================
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
