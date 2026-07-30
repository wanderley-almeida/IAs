import type { Metadata } from "next";
import { notasServices, protestoServices } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = pageMetadata(
  "Serviços",
  "Todos os serviços do Cartório de Notas e de Protesto de Potirendaba/SP: escrituras, procurações, testamentos, reconhecimento de firma, protesto de títulos, certidões e mais.",
  "/servicos",
);

export default function ServicosPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Serviços", href: "/servicos" }]}
        eyebrow="Serviços"
        title="Tudo o que o cartório faz por você"
        lede="Atos notariais e de protesto com fé pública, explicados em linguagem simples: o que é, o que levar, quanto tempo leva e como começar."
      />

      <section className="bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <SectionHeading
            eyebrow="Tabelionato de Notas"
            title="Serviços de Notas"
            lede="Formalize sua vontade com segurança jurídica: negócios, família e patrimônio."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {notasServices.map((service, i) => (
              <ServiceCard key={service.slug} service={service} delay={(i % 3) * 80} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-0">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <SectionHeading
            eyebrow="Tabelionato de Protesto"
            title="Serviços de Protesto"
            lede="Recupere créditos, consulte registros e regularize títulos com agilidade."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {protestoServices.map((service, i) => (
              <ServiceCard key={service.slug} service={service} delay={(i % 3) * 80} />
            ))}
          </div>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
