"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { search, type SearchResult } from "@/lib/search";
import { Icon } from "@/components/ui/Icon";

/** Página de busca completa - mesma engine do dialog (⌘K). */
export function SearchResults() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const results: SearchResult[] = search(query);

  useEffect(() => {
    const t = setTimeout(() => {
      const url = query.trim()
        ? `/busca?q=${encodeURIComponent(query.trim())}`
        : "/busca";
      router.replace(url, { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [query, router]);

  return (
    <div>
      <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-0 px-5 shadow-sm focus-within:border-azure-500 focus-within:ring-2 focus-within:ring-azure-500/25">
        <Icon name="search" className="h-5 w-5 text-ink-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex.: reconhecer firma, consultar protesto…"
          aria-label="Buscar no site"
          autoFocus
          className="w-full bg-transparent py-4 text-lg text-ink-900 outline-none placeholder:text-ink-500/60"
        />
      </div>

      <div aria-live="polite" className="mt-8">
        {query.trim().length >= 2 && (
          <p className="mb-5 text-sm text-ink-500">
            {results.length === 0
              ? "Nenhum resultado encontrado."
              : `${results.length} resultado${results.length > 1 ? "s" : ""} para “${query.trim()}”`}
          </p>
        )}

        <ul className="space-y-3">
          {results.map(({ entry }) => (
            <li key={entry.href}>
              <Link
                href={entry.href}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-surface-0 p-5 transition-all hover:-translate-y-0.5 hover:border-azure-500/40 hover:shadow-md"
              >
                <span>
                  <span className="text-xs font-medium tracking-wide text-gold-500 uppercase">
                    {entry.group}
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-heading group-hover:text-link">
                    {entry.title}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] text-ink-500">
                    {entry.description}
                  </span>
                </span>
                <Icon
                  name="arrowRight"
                  className="mt-2 h-5 w-5 shrink-0 text-gold-500 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>

        {query.trim().length >= 2 && results.length === 0 && (
          <div className="rounded-2xl border border-line bg-surface-1 p-6 text-[0.9375rem] leading-relaxed">
            <p>
              Tente termos mais simples (“firma”, “boleto”, “escritura”) ou{" "}
              <Link
                href="/contato"
                className="font-medium text-link underline underline-offset-2"
              >
                fale diretamente com o cartório
              </Link>{" "}
              - orientamos você pelo telefone em poucos minutos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
