import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { news, getArticle, formatDate } from "@/content/news";
import { pageMetadata } from "@/lib/seo";
import { articleJsonLd } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { ContactStrip } from "@/components/sections/ContactStrip";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const meta = pageMetadata(article.title, article.excerpt, `/noticias/${slug}`);
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article" },
  };
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <PageHero
        crumbs={[
          { label: "Notícias", href: "/noticias" },
          { label: article.title, href: `/noticias/${article.slug}` },
        ]}
        eyebrow={article.category}
        title={article.title}
      />

      <article className="bg-surface-0">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
          <p className="text-sm text-ink-500">
            Publicado em{" "}
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </p>
          <div className="mt-8 space-y-6 text-[1.0625rem] leading-relaxed">
            {article.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <ContactStrip />
    </>
  );
}
