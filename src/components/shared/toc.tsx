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

    const seen = new Map<string, number>();
    const uniqueItems: TocItem[] = [];

    for (const h of headings) {
      const baseId = h.id || h.textContent?.replace(/\s+/g, "-").toLowerCase() || "section";
      const count = seen.get(baseId) ?? 0;
      seen.set(baseId, count + 1);
      const domId = count === 0 ? baseId : `${baseId}-${count}`;
      // Apply unique id back to the DOM element so scrollIntoView can find it
      if (domId !== h.id) h.id = domId;
      uniqueItems.push({ id: domId, text: h.textContent || "" });
    }

    setItems(uniqueItems);

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
    <nav className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
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
