// ============================================================
// LENIS SINGLETON — satu instance smooth scroll untuk seluruh
// app. stopLenis() dipakai saat menu overlay/loader dibuka,
// startLenis() mengembalikannya.
// ============================================================
import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function stopLenis() {
  instance?.stop();
}

export function startLenis() {
  instance?.start();
}
