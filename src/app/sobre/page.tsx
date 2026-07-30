import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = pageMetadata(
  "Sobre o cartório",
  `Conheça o ${site.name}: serventia extrajudicial que serve a comunidade desde ${site.foundedYear} com fé pública, ética e atendimento humano.`,
  "/sobre",
);

const values: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "Segurança jurídica",
    description:
      "Cada ato é praticado com rigor técnico e fé pública, prevenindo litígios e protegendo o que é seu.",
  },
  {
    icon: "userCheck",
    title: "Atendimento humano",
    description:
      "Explicamos cada passo em linguagem simples e tratamos cada caso com a atenção que ele merece.",
  },
  {
    icon: "scale",
    title: "Imparcialidade",
    description:
      "Como delegatários do poder público, servimos a todos com independência e equidistância.",
  },
  {
    icon: "eye",
    title: "Transparência",
    description:
      "Emolumentos tabelados por lei, informações claras e prestação de contas à Corregedoria.",
  },
];

const subpages = [
  {
    href: "/sobre/historia",
    title: "Nossa história",
    description: `Mais de um século de fé pública em Potirendaba, desde ${site.foundedYear}.`,
  },
  {
    href: "/sobre/tabelia",
    title: "A Tabeliã",
    description: "Conheça a titular responsável pela serventia.",
  },
  {
    href: "/sobre/equipe",
    title: "Equipe",
    description: "As pessoas que atendem você todos os dias.",
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Sobre", href: "/sobre" }]}
        eyebrow="O Cartório"
        title="Fé pública a serviço da comunidade"
        lede={`O ${site.name} é uma serventia extrajudicial delegada nos termos do art. 236 da Constituição Federal, unindo a tradição de quem atua desde ${site.foundedYear} à agilidade dos serviços digitais.`}
      />

      <section className="bg-surface-0">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div data-reveal className="space-y-5 text-[1.0625rem] leading-relaxed">
              <SectionHeading eyebrow="Quem somos" title="O que fazemos" />
              <p>
                Reunimos, em uma única serventia, as atribuições de{" "}
                <strong className="font-semibold text-heading">
                  Tabelionato de Notas
                </strong>{" "}
                - escrituras, procurações, testamentos, atas notariais,
                reconhecimento de firma e autenticações - e de{" "}
                <strong className="font-semibold text-heading">
                  Tabelionato de Protesto de Letras e Títulos
                </strong>
                , responsável pela cobrança formal de títulos e pela emissão de
                certidões.
              </p>
              <p>
                Nossa função é dar forma jurídica segura à vontade das pessoas e
                eficácia às relações de crédito - prevenindo conflitos antes que
                eles aconteçam. É o que a doutrina chama de{" "}
                <em>justiça preventiva</em>.
              </p>
              <p>
                A atividade é fiscalizada pela Corregedoria Geral da Justiça do
                Estado de São Paulo e pelo Conselho Nacional de Justiça, com
                emolumentos fixados em lei estadual - idênticos em qualquer
                cartório paulista.
              </p>
            </div>

            <nav aria-label="Páginas sobre o cartório" className="space-y-4">
              {subpages.map((page, i) => (
                <Link
                  key={page.href}
                  href={page.href}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface-1 p-6 transition-all hover:-translate-y-0.5 hover:border-azure-500/40 hover:shadow-md"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-heading">
                      {page.title}
                    </h2>
                    <p className="mt-1 text-[0.9375rem] text-ink-500">
                      {page.description}
                    </p>
                  </div>
                  <Icon
                    name="arrowRight"
                    className="h-5 w-5 shrink-0 text-gold-500 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section aria-labelledby="valores-title" className="bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
          <SectionHeading
            eyebrow="Nossos valores"
            title="O que orienta cada atendimento"
            align="center"
          />
          <span className="sr-only" id="valores-title">
            Nossos valores
          </span>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <div
                key={value.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="rounded-2xl border border-line bg-surface-0 p-6"
              >
                <span className="inline-block rounded-xl bg-gold-500/10 p-2.5 text-gold-500">
                  <Icon name={value.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-semibold text-heading">
                  {value.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
