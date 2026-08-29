// ============================================================
// OG IMAGE — dibangkitkan otomatis oleh Next (ImageResponse)
// di konvensi /opengraph-image. Dipakai open graph + twitter.
// Lime + ink. Fungsi, ukuran, alt diekspor sesuai konvensi.
// ============================================================
import { ImageResponse } from "next/og";

export const alt = "Sacha Ahsan — Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#c6f24e",
          color: "#0e0f0a",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 150,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          SACHA AHSAN
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 42,
            opacity: 0.7,
            marginTop: 32,
          }}
        >
          Frontend Developer — Bali, Indonesia
        </div>
      </div>
    ),
    { ...size }
  );
}