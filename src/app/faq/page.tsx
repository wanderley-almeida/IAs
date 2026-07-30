import type { Metadata } from "next";
import { faqCategories, allFaqItems } from "@/content/faq";
import { pageMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/lib/jsonld";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqItem } from "@/components/ui/FaqItem";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = pageMetadata(
  "Perguntas frequentes",
  "Respostas diretas para as dúvidas mais comuns sobre reconhecimento de firma, escrituras, protesto de títulos, custos, prazos e serviços digitais.",
  "/faq",
);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(allFaqItems)} />
      <PageHero
        crumbs={[{ label: "Perguntas frequentes", href: "/faq" }]}
        eyebrow="Ajuda"
        title="Perguntas frequentes"
        lede="Respostas diretas, em linguagem simples. Não encontrou a sua dúvida? Fale com a equipe — teremos prazer em orientar."
      />

      <div className="bg-surface-0">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[14rem_1fr]">
          {/* Índice lateral */}
          <nav
            aria-label="Categorias de perguntas"
            className="lg:sticky lg:top-28 lg:h-fit"
          >
            <h2 className="mb-3 text-sm font-semibold tracking-wider text-ink-500 uppercase">
              Categorias
            </h2>
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {faqCategories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.id}`}
                    className="inline-block rounded-lg border border-line px-3.5 py-2 text-sm text-ink-700 transition-colors hover:border-navy-600 hover:text-navy-700 lg:border-0 lg:px-3"
                  >
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Perguntas por categoria */}
          <div className="min-w-0 space-y-14">
            {faqCategories.map((cat) => (
              <section
                key={cat.id}
                id={cat.id}
                aria-labelledby={`faq-${cat.id}`}
                className="scroll-mt-28"
              >
                <h2
                  id={`faq-${cat.id}`}
                  data-reveal
                  className="font-display text-2xl font-medium text-navy-900"
                >
                  {cat.label}
                </h2>
                <div className="mt-5 space-y-3">
                  {cat.items.map((item) => (
                    <FaqItem
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <ContactStrip />
    </>
  );
}
