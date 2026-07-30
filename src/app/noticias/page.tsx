import type { Metadata } from "next";
import Link from "next/link";
import { news, formatDate } from "@/content/news";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = pageMetadata(
  "Notícias",
  "Notícias, comunicados e orientações do Cartório de Notas e de Protesto de Potirendaba/SP.",
  "/noticias",
);

export default function NoticiasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Notícias", href: "/noticias" }]}
        eyebrow="Fique por dentro"
        title="Notícias e comunicados"
        lede="Orientações práticas, novidades dos serviços digitais e avisos oficiais do cartório."
      />

      <section className="bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {news.map((article, i) => (
              <Link
                key={article.slug}
                href={`/noticias/${article.slug}`}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface-0 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-navy-600/40 hover:shadow-lg"
              >
                <p className="flex items-center gap-3 text-xs text-ink-500">
                  <span className="rounded-full bg-gold-500/10 px-2.5 py-0.5 font-medium text-gold-500">
                    {article.category}
                  </span>
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                </p>
                <h2 className="mt-3 text-xl leading-snug font-semibold text-navy-900 transition-colors group-hover:text-navy-700">
                  {article.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-500">
                  {article.excerpt}
                </p>
                <span className="mt-auto pt-4 text-sm font-medium text-navy-700">
                  Ler mais →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
