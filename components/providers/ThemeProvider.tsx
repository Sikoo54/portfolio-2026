// ============================================================
// THEME PROVIDER — bungkus next-themes agar bisa dipakai
// di client (dark/light mode via class di <html>).
// ============================================================
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props} />;
}
