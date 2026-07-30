import Link from "next/link";
import { faqCategories } from "@/content/faq";
import { news, formatDate } from "@/content/news";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqItem } from "@/components/ui/FaqItem";
import { Icon } from "@/components/ui/Icon";

/** Amostras de FAQ e notícias na home, lado a lado no desktop. */
export function Previews() {
  const faqSample = faqCategories.flatMap((c) => c.items).slice(0, 4);
  const newsSample = news.slice(0, 3);

  return (
    <section className="bg-surface-1">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2">
        <div aria-labelledby="faq-preview-title">
          <SectionHeading
            eyebrow="Dúvidas comuns"
            title="Perguntas frequentes"
          />
          <span className="sr-only" id="faq-preview-title">
            Perguntas frequentes
          </span>
          <div className="mt-8 space-y-3">
            {faqSample.map((item, i) => (
              <div
                key={item.question}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              >
                <FaqItem question={item.question} answer={item.answer} />
              </div>
            ))}
          </div>
          <Link
            href="/faq"
            className="mt-6 inline-flex items-center gap-2 font-medium text-navy-700 transition-colors hover:text-navy-600"
          >
            Ver todas as perguntas
            <Icon name="arrowRight" className="h-4.5 w-4.5" />
          </Link>
        </div>

        <div aria-labelledby="news-preview-title">
          <SectionHeading eyebrow="Fique por dentro" title="Notícias e avisos" />
          <span className="sr-only" id="news-preview-title">
            Notícias e avisos
          </span>
          <div className="mt-8 space-y-4">
            {newsSample.map((article, i) => (
              <Link
                key={article.slug}
                href={`/noticias/${article.slug}`}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="group block rounded-2xl border border-line bg-surface-0 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-600/40 hover:shadow-md"
              >
                <p className="flex items-center gap-3 text-xs text-ink-500">
                  <span className="rounded-full bg-gold-500/10 px-2.5 py-0.5 font-medium text-gold-500">
                    {article.category}
                  </span>
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                </p>
                <h3 className="mt-3 text-lg leading-snug font-semibold text-navy-900 transition-colors group-hover:text-navy-700">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink-500">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
          <Link
            href="/noticias"
            className="mt-6 inline-flex items-center gap-2 font-medium text-navy-700 transition-colors hover:text-navy-600"
          >
            Ver todas as notícias
            <Icon name="arrowRight" className="h-4.5 w-4.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
