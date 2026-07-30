import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { PENDING } from "@/types/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Icon, type IconName } from "@/components/ui/Icon";

export const metadata: Metadata = pageMetadata(
  "LGPD",
  `Como o ${site.shortName} cumpre a Lei Geral de Proteção de Dados: direitos do titular, base legal do tratamento e canal do encarregado.`,
  "/lgpd",
);

const rights: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "eye",
    title: "Acesso",
    description:
      "Confirmar se tratamos seus dados e obter informações sobre esse tratamento.",
  },
  {
    icon: "pen",
    title: "Correção",
    description:
      "Solicitar a correção de dados incompletos, inexatos ou desatualizados, na forma da lei.",
  },
  {
    icon: "document",
    title: "Informação",
    description:
      "Saber com quem compartilhamos seus dados e por qual fundamento legal.",
  },
  {
    icon: "shield",
    title: "Reclamação",
    description:
      "Peticionar perante a Autoridade Nacional de Proteção de Dados (ANPD) se entender necessário.",
  },
];

export default function LgpdPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "LGPD", href: "/lgpd" }]}
        eyebrow="Proteção de dados"
        title="Lei Geral de Proteção de Dados"
        lede="A atividade notarial e de protesto trata dados pessoais por obrigação legal — e leva a proteção deles a sério."
      />

      <div className="bg-surface-0">
        <div className="mx-auto max-w-3xl space-y-12 px-4 py-16 leading-relaxed sm:px-6 md:py-20">
          <section aria-labelledby="lgpd-base">
            <h2 id="lgpd-base" className="font-display text-2xl font-medium text-navy-900">
              Base legal do tratamento
            </h2>
            <p className="mt-3">
              Cartórios tratam dados pessoais no{" "}
              <strong className="font-semibold text-navy-900">
                cumprimento de obrigação legal
              </strong>{" "}
              (art. 7º, II, da Lei nº 13.709/2018) e no{" "}
              <strong className="font-semibold text-navy-900">
                exercício de função pública delegada
              </strong>{" "}
              (art. 23). Por isso, determinados atos — como o protesto e seus
              registros — têm publicidade prevista em lei e não dependem de
              consentimento do titular, nem podem ser apagados por simples
              solicitação.
            </p>
          </section>

          <section aria-labelledby="lgpd-direitos">
            <h2 id="lgpd-direitos" className="font-display text-2xl font-medium text-navy-900">
              Seus direitos como titular
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {rights.map((right) => (
                <div
                  key={right.title}
                  className="rounded-2xl border border-line bg-surface-1 p-5"
                >
                  <span className="inline-flex rounded-lg bg-gold-500/10 p-2 text-gold-500">
                    <Icon name={right.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-semibold text-navy-900">
                    {right.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] text-ink-500">
                    {right.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="lgpd-encarregado">
            <h2 id="lgpd-encarregado" className="font-display text-2xl font-medium text-navy-900">
              Canal do encarregado (DPO)
            </h2>
            <div className="mt-4 rounded-2xl border border-line bg-surface-1 p-6">
              <dl className="space-y-3 text-[0.9375rem]">
                <div>
                  <dt className="font-semibold text-navy-900">Encarregado pelo tratamento de dados</dt>
                  <dd className="mt-0.5 text-ink-500 italic">{PENDING}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy-900">Canal de atendimento</dt>
                  <dd className="mt-0.5">
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent("LGPD — Solicitação de titular de dados")}`}
                      className="font-medium text-navy-700 underline underline-offset-2"
                    >
                      {site.email}
                    </a>{" "}
                    (assunto: “LGPD — Solicitação de titular de dados”)
                  </dd>
                </div>
              </dl>
            </div>
            <p className="mt-4 text-sm text-ink-500">
              As solicitações são respondidas nos prazos da LGPD, observadas as
              obrigações legais de guarda e publicidade próprias da atividade
              extrajudicial. Consulte também nossa{" "}
              <Link
                href="/privacidade"
                className="font-medium text-navy-700 underline underline-offset-2"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
