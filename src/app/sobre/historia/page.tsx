import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = pageMetadata(
  "História",
  `A trajetória do ${site.shortName}: mais de um século de fé pública a serviço de Potirendaba e região, desde ${site.foundedYear}.`,
  "/sobre/historia",
);

/**
 * Linha do tempo: os marcos locais específicos devem ser fornecidos pelo
 * cartório; os marcos nacionais abaixo são fatos públicos que contextualizam
 * a evolução da atividade notarial e de protesto.
 */
const timeline = [
  {
    year: String(site.foundedYear),
    title: "Início das atividades",
    description:
      "A serventia inicia suas atividades em Potirendaba, levando fé pública aos negócios e às famílias da região noroeste paulista.",
  },
  {
    year: "1988",
    title: "Constituição Federal",
    description:
      "O art. 236 da nova Constituição consagra o modelo brasileiro: serviços notariais e de registro exercidos em caráter privado, por delegação do poder público, com fiscalização do Judiciário.",
  },
  {
    year: "1994",
    title: "Lei dos Cartórios",
    description:
      "A Lei nº 8.935/1994 regulamenta a atividade e consolida o ingresso na titularidade exclusivamente por concurso público de provas e títulos.",
  },
  {
    year: "1997",
    title: "Lei do Protesto",
    description:
      "A Lei nº 9.492/1997 moderniza o protesto de títulos, que se firma como o meio extrajudicial mais eficaz de recuperação de créditos no país.",
  },
  {
    year: "2007",
    title: "Atos da vida civil no cartório",
    description:
      "A Lei nº 11.441/2007 autoriza divórcios, inventários e partilhas consensuais por escritura pública - mais rapidez e menos custo para as famílias.",
  },
  {
    year: "2020",
    title: "Era digital",
    description:
      "Com o Provimento CNJ nº 100/2020, nasce o e-Notariado: atos notariais por videoconferência com validade em todo o território nacional.",
  },
  {
    year: "Hoje",
    title: "Tradição e inovação",
    description:
      "Mais de um século depois, seguimos com o mesmo propósito: segurança jurídica com atendimento próximo - no balcão e na tela.",
  },
];

export default function HistoriaPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Sobre", href: "/sobre" },
          { label: "História", href: "/sobre/historia" },
        ]}
        eyebrow="Nossa história"
        title={`Mais de um século de fé pública`}
        lede={`Desde ${site.foundedYear}, a serventia acompanha a vida de Potirendaba - registrando negócios, protegendo famílias e dando eficácia ao crédito.`}
      />

      <section className="bg-surface-0">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-24">
          <ol className="relative space-y-12 border-l-2 border-line pl-8 md:pl-12">
            {timeline.map((item) => (
              <li key={item.year} data-reveal className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1 -left-[2.55rem] h-4 w-4 rounded-full border-[3px] border-gold-500 bg-surface-0 md:-left-[3.55rem]"
                />
                <p className="font-display text-2xl font-medium text-gold-500">
                  {item.year}
                </p>
                <h2 className="mt-1.5 text-lg font-semibold text-heading">
                  {item.title}
                </h2>
                <p className="mt-2 leading-relaxed text-ink-700">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>

          <p
            data-reveal
            className="mt-14 rounded-2xl border border-warning/25 bg-warning/[0.05] p-5 text-sm leading-relaxed text-ink-700"
          >
            <strong className="font-semibold">Nota:</strong> os marcos locais
            detalhados da serventia (titulares anteriores, mudanças de sede,
            fatos históricos do município) estão pendentes de preenchimento e
            serão adicionados conforme fornecidos pelo cartório.
          </p>
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
