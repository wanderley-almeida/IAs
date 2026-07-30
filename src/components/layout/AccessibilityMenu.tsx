"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    VLibras?: { Widget: new (url: string) => unknown };
  }
}

const FONT_STEPS = [0.875, 1, 1.125, 1.25];

function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

function applyFontScale(scale: number) {
  document.documentElement.style.fontSize = `${scale * 100}%`;
  try {
    localStorage.setItem("fontScale", String(scale));
  } catch {}
}

/** Carrega o VLibras (tradutor oficial de Libras do governo) sob demanda. */
function enableVLibras() {
  if (document.querySelector("[data-vlibras]")) return;
  const wrap = document.createElement("div");
  wrap.setAttribute("vw", "");
  wrap.setAttribute("data-vlibras", "");
  wrap.className = "enabled";
  wrap.innerHTML =
    '<div vw-access-button class="active"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>';
  document.body.appendChild(wrap);
  const script = document.createElement("script");
  script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
  script.onload = () => {
    if (window.VLibras) new window.VLibras.Widget("https://vlibras.gov.br/app");
  };
  document.body.appendChild(script);
}

/**
 * Menu de acessibilidade: tema claro/escuro, tamanho do texto e VLibras.
 * Preferências persistem em localStorage e são aplicadas antes do primeiro
 * paint pelo script inline do layout.
 */
export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  // Estado inicial lido do que o script inline do layout já aplicou ao <html>
  // (o popover só renderiza após interação, então não há divergência de SSR).
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    typeof document !== "undefined" &&
    document.documentElement.dataset.theme === "dark"
      ? "dark"
      : "light",
  );
  const [fontScale, setFontScale] = useState(() => {
    if (typeof window === "undefined") return 1;
    try {
      const stored = parseFloat(localStorage.getItem("fontScale") ?? "1");
      return FONT_STEPS.includes(stored) ? stored : 1;
    } catch {
      return 1;
    }
  });
  const [librasOn, setLibrasOn] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggleTheme(next: "light" | "dark") {
    setTheme(next);
    applyTheme(next);
  }

  function stepFont(direction: 1 | -1) {
    const idx = FONT_STEPS.indexOf(fontScale);
    const next =
      FONT_STEPS[Math.min(Math.max(idx + direction, 0), FONT_STEPS.length - 1)];
    setFontScale(next);
    applyFontScale(next);
  }

  const optionClasses = (active: boolean) =>
    cn(
      "flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
      active
        ? "border-action bg-action text-white"
        : "border-line text-ink-700 hover:border-action hover:text-link",
    );

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="menu-acessibilidade"
        aria-label="Opções de acessibilidade: tema, tamanho do texto e Libras"
        className="rounded-full border border-line p-2.5 text-ink-700 transition-colors hover:border-azure-500 hover:text-link"
      >
        <Icon name="accessibility" className="h-5 w-5" />
      </button>

      {open && (
        <div
          id="menu-acessibilidade"
          className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-line bg-surface-0 p-4 shadow-xl"
        >
          <p className="text-xs font-semibold tracking-wider text-ink-500 uppercase">
            Tema
          </p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => toggleTheme("light")}
              aria-pressed={theme === "light"}
              className={optionClasses(theme === "light")}
            >
              <Icon name="sun" className="h-4 w-4" />
              Claro
            </button>
            <button
              type="button"
              onClick={() => toggleTheme("dark")}
              aria-pressed={theme === "dark"}
              className={optionClasses(theme === "dark")}
            >
              <Icon name="moon" className="h-4 w-4" />
              Escuro
            </button>
          </div>

          <p className="mt-4 text-xs font-semibold tracking-wider text-ink-500 uppercase">
            Tamanho do texto
          </p>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => stepFont(-1)}
              disabled={fontScale === FONT_STEPS[0]}
              aria-label="Diminuir tamanho do texto"
              className="rounded-lg border border-line px-3.5 py-2 text-sm font-semibold text-ink-700 transition-colors hover:border-action hover:text-link disabled:opacity-40"
            >
              A-
            </button>
            <span
              aria-live="polite"
              className="flex-1 text-center text-sm text-ink-500"
            >
              {Math.round(fontScale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => stepFont(1)}
              disabled={fontScale === FONT_STEPS[FONT_STEPS.length - 1]}
              aria-label="Aumentar tamanho do texto"
              className="rounded-lg border border-line px-3.5 py-2 text-sm font-semibold text-ink-700 transition-colors hover:border-action hover:text-link disabled:opacity-40"
            >
              A+
            </button>
          </div>

          <p className="mt-4 text-xs font-semibold tracking-wider text-ink-500 uppercase">
            Libras
          </p>
          <button
            type="button"
            onClick={() => {
              enableVLibras();
              setLibrasOn(true);
              setOpen(false);
            }}
            disabled={librasOn}
            className="mt-2 w-full rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-action hover:text-link disabled:opacity-50"
          >
            {librasOn ? "VLibras ativado" : "Ativar tradução em Libras (VLibras)"}
          </button>
        </div>
      )}
    </div>
  );
}
