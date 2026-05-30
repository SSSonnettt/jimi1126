"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="w-[30px]" />;
  }

  const next: Record<string, string> = {
    system: "light",
    light: "dark",
    dark: "system",
  };

  const label: Record<string, string> = {
    system: "system",
    light: "light",
    dark: "dark",
  };

  return (
    <button
      onClick={() => setTheme(next[theme || "system"])}
      className="text-[10px] font-normal tracking-[0.15em] text-fg-inactive hover:text-fg-tertiary transition-colors"
    >
      {label[theme || "system"]}
    </button>
  );
}
