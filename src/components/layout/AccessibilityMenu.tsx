"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const FONT_STEPS = [0.875, 1, 1.125, 1.25];

type ThemeMode = "light" | "dark" | "system";

function systemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyMode(mode: ThemeMode) {
  try {
    if (mode === "system") {
      localStorage.removeItem("theme");
      document.documentElement.dataset.theme = systemTheme();
    } else {
      localStorage.setItem("theme", mode);
      document.documentElement.dataset.theme = mode;
    }
  } catch {}
}

function applyFontScale(scale: number) {
  document.documentElement.style.fontSize = `${scale * 100}%`;
  try {
    localStorage.setItem("fontScale", String(scale));
  } catch {}
}

/**
 * Menu de acessibilidade: tema (claro/escuro/sistema, padrão sistema) e
 * tamanho do texto. Preferências persistem em localStorage e são aplicadas
 * antes do primeiro paint pelo script inline do layout.
 */
export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  // Estado inicial lido do localStorage (o popover só renderiza após
  // interação, então não há divergência de SSR).
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "system";
    try {
      const stored = localStorage.getItem("theme");
      return stored === "light" || stored === "dark" ? stored : "system";
    } catch {
      return "system";
    }
  });
  const [fontScale, setFontScale] = useState(() => {
    if (typeof window === "undefined") return 1;
    try {
      const stored = parseFloat(localStorage.getItem("fontScale") ?? "1");
      return FONT_STEPS.includes(stored) ? stored : 1;
    } catch {
      return 1;
    }
  });
  const rootRef = useRef<HTMLDivElement>(null);

  // No modo Sistema, acompanha mudanças do tema do aparelho em tempo real.
  useEffect(() => {
    if (mode !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      document.documentElement.dataset.theme = media.matches
        ? "dark"
        : "light";
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [mode]);

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

  function selectMode(next: ThemeMode) {
    setMode(next);
    applyMode(next);
  }

  function stepFont(direction: 1 | -1) {
    const idx = FONT_STEPS.indexOf(fontScale);
    const next =
      FONT_STEPS[Math.min(Math.max(idx + direction, 0), FONT_STEPS.length - 1)];
    setFontScale(next);
    applyFontScale(next);
  }

  const themeOptions: { value: ThemeMode; label: string; icon: IconName }[] = [
    { value: "light", label: "Claro", icon: "sun" },
    { value: "dark", label: "Escuro", icon: "moon" },
    { value: "system", label: "Sistema", icon: "monitor" },
  ];

  const optionClasses = (active: boolean) =>
    cn(
      "flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-sm font-medium transition-colors",
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
        aria-label="Opções de acessibilidade: tema e tamanho do texto"
        className="rounded-full border border-line p-2.5 text-ink-700 transition-colors hover:border-azure-500 hover:text-link"
      >
        <Icon name="accessibility" className="h-5 w-5" />
      </button>

      {open && (
        <div
          id="menu-acessibilidade"
          className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-line bg-surface-0 p-4 shadow-xl"
        >
          <p className="text-xs font-semibold tracking-wider text-ink-500 uppercase">
            Tema
          </p>
          <div className="mt-2 flex gap-2">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => selectMode(option.value)}
                aria-pressed={mode === option.value}
                className={optionClasses(mode === option.value)}
              >
                <Icon name={option.icon} className="h-4 w-4" />
                {option.label}
              </button>
            ))}
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

        </div>
      )}
    </div>
  );
}
