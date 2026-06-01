"use client";

import { useEffect, useState } from "react";

const COUNTER_URL = "https://sonnet.dpdns.org/api/pv";

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(COUNTER_URL)
      .then((res) => res.json())
      .then((data) => setCount(data.pv))
      .catch(() => setCount(null));
  }, []);

  if (count === null) return null;

  return (
    <span className="text-[11px] text-fg-inactive">
      PV {count.toLocaleString()}
    </span>
  );
}
