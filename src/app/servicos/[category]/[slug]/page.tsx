import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  services,
  getService,
  getServicePath,
  categoryLabels,
} from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { serviceJsonLd, faqJsonLd } from "@/lib/jsonld";
import { serviceIcons } from "@/components/serviceIcons";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { FaqItem } from "@/components/ui/FaqItem";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return services.map((s) => ({ category: s.category, slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata(service.title, service.summary, getServicePath(service));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const service = getService(slug);
  if (!service || service.category !== category) notFound();

  const path = getServicePath(service);
  const related = service.relatedSlugs
    .map((s) => getService(s))
    .filter((s) => s !== undefined);

  return (
    <>
      <JsonLd data={serviceJsonLd(service, path)} />
      {service.faqs.length > 0 && <JsonLd data={faqJsonLd(service.faqs)} />}

      {/* Cabeçalho */}
      <section className="bg-navy-950 text-white">
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-14 sm:px-6 md:pt-10 md:pb-16">
          <Breadcrumbs
            dark
            crumbs={[
              { label: "Serviços", href: "/servicos" },
              {
                label: categoryLabels[service.category],
                href: `/servicos/${service.category}`,
              },
              { label: service.shortTitle, href: path },
            ]}
          />
          <div className="mt-8 flex max-w-3xl items-start gap-5">
            <span className="hidden rounded-2xl bg-gold-400/15 p-3.5 text-gold-400 sm:block">
              <Icon
                name={serviceIcons[service.slug] ?? "document"}
                className="h-8 w-8"
              />
            </span>
            <div>
              <h1 className="font-display text-3xl leading-tight font-medium md:text-[2.75rem]">
                {service.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-white/75">
                {service.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-surface-0">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1fr_20rem]">
          {/* Conteúdo principal */}
          <article className="min-w-0 space-y-14">
            <section aria-labelledby="o-que-e" data-reveal>
              <h2
                id="o-que-e"
                className="font-display text-2xl font-medium text-navy-900"
              >
                O que é
              </h2>
              <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed">
                {service.whatIs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="quando-usar" data-reveal>
              <h2
                id="quando-usar"
                className="font-display text-2xl font-medium text-navy-900"
              >
                Quando usar
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.useCases.map((useCase) => (
                  <li
                    key={useCase}
                    className="flex items-start gap-3 rounded-xl bg-surface-1 px-4 py-3 text-[0.9375rem] leading-relaxed"
                  >
                    <Icon
                      name="check"
                      className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-500"
                    />
                    {useCase}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="documentos" data-reveal>
              <h2
                id="documentos"
                className="font-display text-2xl font-medium text-navy-900"
              >
                Documentos necessários
              </h2>
              <p className="mt-2 text-sm text-ink-500">
                Lista de referência — casos específicos podem exigir documentos
                adicionais. Confirme com o cartório antes de se deslocar.
              </p>
              <div className="mt-5 space-y-5">
                {service.documents.map((group) => (
                  <div
                    key={group.group}
                    className="rounded-2xl border border-line p-6"
                  >
                    <h3 className="font-semibold text-navy-900">
                      {group.group}
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[0.9375rem] leading-relaxed"
                        >
                          <Icon
                            name="checkCircle"
                            className="mt-0.5 h-4.5 w-4.5 shrink-0 text-navy-600"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="como-funciona" data-reveal>
              <h2
                id="como-funciona"
                className="font-display text-2xl font-medium text-navy-900"
              >
                Como funciona
              </h2>
              <ol className="mt-6 space-y-0">
                {service.steps.map((step, i) => (
                  <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                    {i < service.steps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute top-10 left-[1.1875rem] h-[calc(100%-2.5rem)] w-px bg-line"
                      />
                    )}
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-700 font-display text-[0.9375rem] font-medium text-white">
                      {i + 1}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="font-semibold text-navy-900">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-700">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section
              aria-labelledby="prazos-custos"
              data-reveal
              className="grid gap-5 sm:grid-cols-2"
            >
              <h2 id="prazos-custos" className="sr-only">
                Prazos e custos
              </h2>
              <div className="rounded-2xl bg-surface-1 p-6">
                <p className="flex items-center gap-2.5 font-semibold text-navy-900">
                  <Icon name="clock" className="h-5 w-5 text-gold-500" />
                  Prazo
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed">
                  {service.deadline}
                </p>
              </div>
              <div className="rounded-2xl bg-surface-1 p-6">
                <p className="flex items-center gap-2.5 font-semibold text-navy-900">
                  <Icon name="scale" className="h-5 w-5 text-gold-500" />
                  Custos
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed">
                  {service.costNote}{" "}
                  <a
                    href={site.external.emolumentos}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-navy-700 underline underline-offset-2 hover:text-navy-600"
                  >
                    Ver tabela oficial
                  </a>
                </p>
              </div>
            </section>

            {service.digital && (
              <section
                aria-labelledby="canal-digital"
                data-reveal
                className="rounded-2xl border border-gold-500/30 bg-gold-500/[0.06] p-6"
              >
                <h2
                  id="canal-digital"
                  className="flex items-center gap-2.5 font-semibold text-navy-900"
                >
                  <Icon name="video" className="h-5 w-5 text-gold-500" />
                  Também disponível online
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed">
                  {service.digital.description}
                </p>
                <a
                  href={service.digital.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-medium text-navy-700 hover:text-navy-600"
                >
                  {service.digital.label}
                  <Icon name="external" className="h-4 w-4" />
                </a>
              </section>
            )}

            {service.faqs.length > 0 && (
              <section aria-labelledby="faq-servico" data-reveal>
                <h2
                  id="faq-servico"
                  className="font-display text-2xl font-medium text-navy-900"
                >
                  Perguntas frequentes sobre {service.shortTitle.toLowerCase()}
                </h2>
                <div className="mt-6 space-y-3">
                  {service.faqs.map((faq) => (
                    <FaqItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </section>
            )}

            <section aria-labelledby="base-legal" data-reveal>
              <h2
                id="base-legal"
                className="text-sm font-semibold tracking-wider text-ink-500 uppercase"
              >
                Base legal
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {service.legalBasis.map((law) => (
                  <li
                    key={law}
                    className="rounded-full border border-line bg-surface-1 px-3.5 py-1.5 text-sm text-ink-700"
                  >
                    {law}
                  </li>
                ))}
              </ul>
            </section>
          </article>

          {/* Aside pegajoso */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-line bg-surface-1 p-6">
              <h2 className="font-display text-xl font-medium text-navy-900">
                Comece agora
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Fale com a equipe e confirme documentos e valores para o seu
                caso antes de se deslocar.
              </p>
              <div className="mt-5 space-y-3">
                <Button href={site.phoneHref} className="w-full">
                  <Icon name="phone" className="h-4.5 w-4.5" />
                  {site.phone}
                </Button>
                <Button
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    `Dúvida — ${service.shortTitle}`,
                  )}`}
                  variant="secondary"
                  className="w-full"
                >
                  <Icon name="mail" className="h-4.5 w-4.5" />
                  Enviar e-mail
                </Button>
              </div>
              <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
                <div className="flex items-start gap-2.5">
                  <dt className="sr-only">Horário</dt>
                  <Icon name="clock" className="mt-0.5 h-4.5 w-4.5 text-gold-500" />
                  <dd>{site.hours.label}</dd>
                </div>
                <div className="flex items-start gap-2.5">
                  <dt className="sr-only">Endereço</dt>
                  <Icon name="mapPin" className="mt-0.5 h-4.5 w-4.5 text-gold-500" />
                  <dd>{site.address.full}</dd>
                </div>
              </dl>
            </div>

            {related.length > 0 && (
              <nav
                aria-label="Serviços relacionados"
                className="mt-6 rounded-2xl border border-line p-6"
              >
                <h2 className="text-sm font-semibold tracking-wider text-ink-500 uppercase">
                  Serviços relacionados
                </h2>
                <ul className="mt-4 space-y-1">
                  {related.map((rel) => (
                    <li key={rel.slug}>
                      <Link
                        href={getServicePath(rel)}
                        className="group flex items-center gap-2 rounded-lg px-2 py-2 text-[0.9375rem] text-ink-700 transition-colors hover:bg-surface-1 hover:text-navy-700"
                      >
                        <Icon
                          name={serviceIcons[rel.slug] ?? "document"}
                          className="h-4.5 w-4.5 text-navy-600"
                        />
                        {rel.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
