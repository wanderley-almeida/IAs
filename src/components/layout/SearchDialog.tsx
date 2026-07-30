"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { search, type SearchResult } from "@/lib/search";
import { Icon } from "@/components/ui/Icon";

/**
 * Busca inteligente (ADR-005): dialog nativo (focus trap gratuito), índice
 * estático com sinônimos populares, navegação por setas.
 */
export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery("");
      setResults([]);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleChange(value: string) {
    setQuery(value);
    setResults(search(value));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const links = Array.from(
      listRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
    );
    if (links.length === 0) return;
    const active = document.activeElement as HTMLElement | null;
    const idx = links.findIndex((l) => l === active);
    const next =
      e.key === "ArrowDown"
        ? links[Math.min(idx + 1, links.length - 1)]
        : idx <= 0
          ? null
          : links[idx - 1];
    if (next) next.focus();
    else dialogRef.current?.querySelector("input")?.focus();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        // Clique no backdrop fecha o dialog.
        if (e.target === dialogRef.current) onClose();
      }}
      aria-label="Busca no site"
      className="m-auto w-[min(92vw,40rem)] rounded-2xl bg-transparent p-0 backdrop:bg-navy-950/60 backdrop:backdrop-blur-sm"
    >
      <div
        className="overflow-hidden rounded-2xl border border-line bg-surface-0 shadow-2xl"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Icon name="search" className="h-5 w-5 text-ink-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Busque um serviço: firma, escritura, protesto, boleto…"
            aria-label="Buscar serviços e informações"
            autoFocus
            className="w-full bg-transparent py-4 text-base text-ink-900 outline-none placeholder:text-ink-500/70"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar busca"
            className="rounded-md p-1.5 text-ink-500 transition-colors hover:bg-surface-2 hover:text-ink-900"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-ink-500">
              Nenhum resultado para <strong>“{query}”</strong>. Tente outro
              termo ou{" "}
              <Link
                href="/contato"
                onClick={onClose}
                className="text-navy-700 underline underline-offset-2"
              >
                fale com o cartório
              </Link>
              .
            </p>
          )}

          {results.length > 0 && (
            <ul ref={listRef} className="py-2">
              {results.map(({ entry }) => (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    onClick={onClose}
                    className="flex items-start gap-4 px-5 py-3 transition-colors hover:bg-surface-1 focus-visible:bg-surface-1"
                  >
                    <span className="mt-1 rounded-md bg-surface-2 p-1.5 text-navy-700">
                      <Icon name="chevronRight" className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block font-medium text-navy-900">
                        {entry.title}
                      </span>
                      <span className="mt-0.5 line-clamp-1 block text-sm text-ink-500">
                        {entry.description}
                      </span>
                    </span>
                    <span className="ml-auto mt-1 hidden shrink-0 rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-ink-500 sm:block">
                      {entry.group}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {query.trim().length < 2 && (
            <div className="px-5 py-6">
              <p className="mb-3 text-xs font-semibold tracking-wider text-ink-500 uppercase">
                Mais procurados
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  ["Reconhecimento de firma", "/servicos/notas/reconhecimento-de-firma"],
                  ["Autenticação", "/servicos/notas/autenticacao"],
                  ["Consultar protesto", "/servicos/protesto/consulta-de-protestos"],
                  ["Pagar boleto", "/servicos/protesto/emissao-de-boletos"],
                  ["Escrituras", "/servicos/notas/escrituras"],
                  ["Procurações", "/servicos/notas/procuracoes"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-700 transition-colors hover:border-navy-600 hover:text-navy-700"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-line bg-surface-1 px-5 py-2.5 text-xs text-ink-500">
          <kbd className="rounded border border-line bg-surface-0 px-1.5 py-0.5 font-sans">
            ↑↓
          </kbd>{" "}
          para navegar ·{" "}
          <kbd className="rounded border border-line bg-surface-0 px-1.5 py-0.5 font-sans">
            Esc
          </kbd>{" "}
          para fechar
        </div>
      </div>
    </dialog>
  );
}
