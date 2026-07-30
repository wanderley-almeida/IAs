"use client";

import { Icon } from "@/components/ui/Icon";

/** Barra de busca do hero — abre o SearchDialog global via evento. */
export function HeroSearchTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
      className="flex w-full max-w-xl items-center gap-3 rounded-xl border border-white/20 bg-white/[0.07] px-5 py-4 text-left text-white/60 backdrop-blur transition-colors hover:border-gold-400/60 hover:bg-white/10"
    >
      <Icon name="search" className="h-5 w-5 text-gold-400" />
      <span className="flex-1 truncate">
        O que você precisa? Ex.: reconhecer firma, consultar protesto…
      </span>
      <kbd
        aria-hidden="true"
        className="hidden rounded-md border border-white/20 px-2 py-0.5 text-xs text-white/50 sm:block"
      >
        Ctrl K
      </kbd>
    </button>
  );
}
