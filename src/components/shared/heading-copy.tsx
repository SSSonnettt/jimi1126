"use client";

import { useEffect, useCallback } from "react";

export function HeadingCopy() {
  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const heading = target.closest("h1, h2, h3, h4, h5, h6");
    if (!heading || !heading.id) return;

    const url = new URL(window.location.href);
    url.hash = heading.id;
    navigator.clipboard.writeText(url.toString());

    heading.style.cursor = "copy";
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);

  return null;
}
