"use client";

import { useState, useEffect } from "react";

interface TocItem {
  id: string;
  text: string;
}

export function TOC() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("article h2")
    ) as HTMLHeadingElement[];

    if (headings.length < 2) return;

    setItems(
      headings
        .map((h) => ({
          id: h.id,
          text: h.textContent || "",
        }))
        .filter((item, i, arr) => {
          const firstIdx = arr.findIndex((x) => x.id === item.id);
          return firstIdx === i && item.id !== "";
        })
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (items.length < 2) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-3">
        ON THIS PAGE
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={`block text-[12px] leading-relaxed transition-colors ${
                activeId === item.id
                  ? "text-foreground"
                  : "text-fg-tertiary hover:text-fg-secondary"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
