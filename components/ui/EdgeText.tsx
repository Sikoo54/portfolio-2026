// ============================================================
// EDGE TEXT — teks kecil vertikal (writing-mode) di tepi kiri/
// kanan section, ciri khas desain editorial/minimalis.
// ============================================================
export default function EdgeText({
  text,
  side = "left",
  className = "",
}: {
  text: string;
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.35em] lg:block ${
        side === "left"
          ? "left-3 [writing-mode:vertical-rl] rotate-180"
          : "right-3 [writing-mode:vertical-rl]"
      } ${className}`}
    >
      {text}
    </span>
  );
}
