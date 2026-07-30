import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = pageMetadata(
  "Transparência",
  "Emolumentos oficiais, dados da serventia, normas aplicáveis e canais de fiscalização do Cartório de Notas e de Protesto de Potirendaba/SP.",
  "/transparencia",
);

const officialLinks = [
  {
    title: "Tabela de emolumentos - TJSP",
    description:
      "Valores oficiais de todos os atos notariais e de protesto no Estado de São Paulo, atualizados anualmente.",
    href: site.external.emolumentos,
  },
  {
    title: "Portal Extrajudicial - TJSP",
    description:
      "Portal da Corregedoria Geral da Justiça com normas, comunicados e consulta de serventias.",
    href: site.external.tjspExtrajudicial,
  },
  {
    title: "Conselho Nacional de Justiça",
    description:
      "Provimentos e resoluções que regem a atividade notarial e de registro em todo o país.",
    href: "https://www.cnj.jus.br",
  },
  {
    title: "e-Notariado",
    description: "Plataforma oficial do notariado brasileiro para atos eletrônicos.",
    href: site.external.eNotariado,
  },
  {
    title: "CENPROT - Central Nacional de Protesto",
    description: "Consulta nacional gratuita de protestos por CPF/CNPJ.",
    href: site.external.cenprot,
  },
];

const norms = [
  "Constituição Federal, art. 236",
  "Lei nº 8.935/1994 - Lei dos Cartórios",
  "Lei nº 9.492/1997 - Lei do Protesto",
  "Lei nº 10.406/2002 - Código Civil",
  "Lei Estadual nº 11.331/2002 - Emolumentos/SP",
  "Lei nº 13.709/2018 - LGPD",
  "Normas de Serviço da CGJ-SP",
  "Provimentos do CNJ",
];

export default function TransparenciaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Transparência", href: "/transparencia" }]}
        eyebrow="Transparência"
        title="Informações oficiais da serventia"
        lede="Emolumentos tabelados por lei, dados institucionais e os canais oficiais de consulta e fiscalização - tudo em um só lugar."
      />

      {/* Dados da serventia */}
      <section className="bg-surface-0">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <SectionHeading
            eyebrow="Identificação"
            title="Dados da serventia"
          />
          <dl className="mt-8 grid gap-x-10 gap-y-5 rounded-2xl border border-line bg-surface-1 p-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Denominação", site.legalName],
              ["Nome de fantasia", site.name],
              ["CNS (Cadastro Nacional de Serventias)", site.cns],
              ["CNPJ", site.cnpj],
              ["Titular", `${site.titular.name} - ${site.titular.role}`],
              ["Substituto", site.substitute.name],
              ["Endereço", site.address.full],
              ["Telefone", site.phone],
              ["E-mail", site.email],
              ["Horário de atendimento", `${site.hours.label}. ${site.hours.note}`],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-sm font-semibold text-heading">{label}</dt>
                <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink-700">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Emolumentos */}
      <section className="bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <SectionHeading
            eyebrow="Custos"
            title="Emolumentos: tabelados e iguais em todo o estado"
            lede="Nenhum cartório paulista pode cobrar mais - nem menos - do que a tabela fixada por lei estadual. Desconfie de intermediários que prometem 'desconto'."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {officialLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as React.CSSProperties}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-surface-0 p-6 transition-all hover:-translate-y-0.5 hover:border-azure-500/40 hover:shadow-md"
              >
                <div>
                  <h3 className="font-semibold text-heading transition-colors group-hover:text-link">
                    {link.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-500">
                    {link.description}
                  </p>
                </div>
                <Icon
                  name="external"
                  className="mt-1 h-5 w-5 shrink-0 text-gold-500"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Normas e fiscalização */}
      <section className="bg-surface-0">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div data-reveal>
              <SectionHeading eyebrow="Base normativa" title="Normas aplicáveis" />
              <ul className="mt-6 flex flex-wrap gap-2">
                {norms.map((norm) => (
                  <li
                    key={norm}
                    className="rounded-full border border-line bg-surface-1 px-3.5 py-1.5 text-sm text-ink-700"
                  >
                    {norm}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <SectionHeading eyebrow="Fiscalização" title="A quem recorrer" />
              <p className="mt-4 leading-relaxed">
                A atividade desta serventia é fiscalizada pelo{" "}
                <strong className="font-semibold text-heading">
                  Juízo Corregedor Permanente da Comarca
                </strong>{" "}
                e pela{" "}
                <strong className="font-semibold text-heading">
                  Corregedoria Geral da Justiça de São Paulo
                </strong>
                . Reclamações e sugestões podem ser dirigidas diretamente ao
                cartório - ou aos órgãos fiscalizadores, pelos canais do portal
                extrajudicial do TJSP.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
