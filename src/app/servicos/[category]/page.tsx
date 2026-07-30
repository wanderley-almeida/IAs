import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  notasServices,
  protestoServices,
  categoryLabels,
} from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ContactStrip } from "@/components/sections/ContactStrip";

const hubs = {
  notas: {
    services: notasServices,
    eyebrow: "Tabelionato de Notas",
    lede: "Escrituras, procurações, testamentos, atas notariais, reconhecimento de firma, autenticações e certidões — atos com fé pública para proteger seus negócios e sua família.",
    description:
      "Serviços de notas em Potirendaba/SP: escrituras públicas, procurações, testamentos, atas notariais, reconhecimento de firma, autenticação de cópias e certidões.",
  },
  protesto: {
    services: protestoServices,
    eyebrow: "Tabelionato de Protesto",
    lede: "O caminho legal mais eficiente para recuperar créditos — e o mais seguro para consultar, pagar e cancelar protestos.",
    description:
      "Serviços de protesto em Potirendaba/SP: protesto de títulos, consulta de protestos, emissão de boletos para pagamento e cancelamento de protesto.",
  },
} as const;

type CategoryKey = keyof typeof hubs;

export function generateStaticParams() {
  return Object.keys(hubs).map((category) => ({ category }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const hub = hubs[category as CategoryKey];
  if (!hub) return {};
  return pageMetadata(
    categoryLabels[category],
    hub.description,
    `/servicos/${category}`,
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const hub = hubs[category as CategoryKey];
  if (!hub) notFound();

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Serviços", href: "/servicos" },
          { label: categoryLabels[category], href: `/servicos/${category}` },
        ]}
        eyebrow={hub.eyebrow}
        title={categoryLabels[category]}
        lede={hub.lede}
      />

      <section className="bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hub.services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                service={service}
                delay={(i % 3) * 80}
              />
            ))}
          </div>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
