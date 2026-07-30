import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = pageMetadata(
  "A Tabeliã",
  `${site.titular.name}, ${site.titular.role} do ${site.name}.`,
  "/sobre/tabelia",
);

export default function TabeliaPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Sobre", href: "/sobre" },
          { label: "A Tabeliã", href: "/sobre/tabelia" },
        ]}
        eyebrow="Responsável pela serventia"
        title={site.titular.name}
        lede={site.titular.role}
      />

      <section className="bg-surface-0">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[1fr_20rem]">
          <div data-reveal className="space-y-5 text-[1.0625rem] leading-relaxed">
            <p>
              A tabeliã é a delegatária responsável pela serventia, investida na
              função na forma do art. 236 da Constituição Federal, respondendo
              pessoalmente pela prática dos atos notariais e de protesto com
              independência, imparcialidade e fé pública.
            </p>
            <p>
              Cabe a ela qualificar juridicamente a vontade das partes, orientar
              com imparcialidade, redigir os atos com rigor técnico e garantir
              que cada escritura, procuração, testamento ou protesto produza
              exatamente os efeitos que a lei promete.
            </p>
            <p className="rounded-2xl border border-warning/25 bg-warning/[0.05] p-5 text-sm leading-relaxed">
              <strong className="font-semibold">Nota:</strong> minicurrículo,
              formação e foto oficial da tabeliã estão pendentes de
              preenchimento e serão publicados assim que fornecidos pelo
              cartório.
            </p>
          </div>

          <aside className="h-fit rounded-2xl border border-line bg-surface-1 p-6">
            <h2 className="text-sm font-semibold tracking-wider text-ink-500 uppercase">
              A serventia
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-medium text-navy-900">Denominação</dt>
                <dd className="mt-0.5 text-ink-700">{site.legalName}</dd>
              </div>
              <div>
                <dt className="font-medium text-navy-900">CNS</dt>
                <dd className="mt-0.5 text-ink-700">{site.cns}</dd>
              </div>
              <div>
                <dt className="font-medium text-navy-900">Substituto</dt>
                <dd className="mt-0.5 text-ink-700">{site.substitute.name}</dd>
              </div>
              <div className="flex items-start gap-2.5 border-t border-line pt-4">
                <Icon name="mapPin" className="mt-0.5 h-4.5 w-4.5 text-gold-500" />
                <dd>{site.address.full}</dd>
              </div>
              <div className="flex items-start gap-2.5">
                <Icon name="clock" className="mt-0.5 h-4.5 w-4.5 text-gold-500" />
                <dd>{site.hours.label}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
