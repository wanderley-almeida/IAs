"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Observador global de scroll-reveal (ADR-004).
 *
 * Marca o <html> com a classe `js` (o CSS só esconde elementos [data-reveal]
 * quando JS está ativo - sem JS, tudo fica visível) e revela cada elemento
 * uma única vez ao entrar no viewport. `prefers-reduced-motion` é tratado
 * no CSS. Re-executa a cada navegação do App Router.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");

    const elements = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not(.is-revealed)",
    );
    if (elements.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
