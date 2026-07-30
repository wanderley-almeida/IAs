"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Contador que anima de 0 até `value` quando entra no viewport (uma vez).
 * O HTML estático (SSR/no-JS) traz o valor final; a animação só zera o
 * número no cliente, ao iniciar. Com prefers-reduced-motion, não anima.
 */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    let fallback: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      if (started.current) return;
      started.current = true;

      const t0 = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - t0) / duration, 1);
        // ease-out cúbico
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      // Garante o valor final mesmo se rAF for suspenso (aba em segundo plano).
      fallback = setTimeout(() => setDisplay(value), duration + 200);
    };

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (fallback) clearTimeout(fallback);
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}
