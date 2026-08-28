import type { CSSProperties } from "react";

// ============================================================
// SHINY TEXT — efek dari React Bits: gradien kilat putih yang
// menyapu teks. Layer gradient (shine + warna dasar lime) di
// CSS `.animate-shiny-text` (globals.css), teks di-fill
// transparan supaya shine keliatan. Animasi linear infinite.
// ============================================================

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
}: {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}) {
  const style: CSSProperties = {
    animationDuration: `${speed}s`,
  };

  return (
    <span
      className={`inline-block ${disabled ? "" : "animate-shiny-text"} ${className}`}
      style={style}
    >
      {text}
    </span>
  );
}