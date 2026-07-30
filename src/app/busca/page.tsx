import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SearchResults } from "./SearchResults";

export const metadata: Metadata = {
  ...pageMetadata(
    "Busca",
    "Busque serviços, perguntas frequentes e informações do cartório.",
    "/busca",
  ),
  robots: { index: false },
};

export default function BuscaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Busca", href: "/busca" }]}
        eyebrow="Busca"
        title="O que você procura?"
        lede="Pesquise por serviços, dúvidas e informações - em linguagem do dia a dia: “firma”, “boleto”, “escritura”…"
      />
      <section className="bg-surface-0">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-16">
          <Suspense>
            <SearchResults />
          </Suspense>
        </div>
      </section>
    </>
  );
}
