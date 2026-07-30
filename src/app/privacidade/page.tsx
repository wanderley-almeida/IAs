import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = pageMetadata(
  "Política de Privacidade",
  `Como o ${site.shortName} trata os dados pessoais coletados neste site e no atendimento.`,
  "/privacidade",
);

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Política de Privacidade", href: "/privacidade" }]}
        eyebrow="Privacidade"
        title="Política de Privacidade"
        lede="Transparência sobre quais dados tratamos, por quê, e quais são os seus direitos."
      />

      <article className="bg-surface-0">
        <div className="mx-auto max-w-3xl space-y-10 px-4 py-16 leading-relaxed sm:px-6 md:py-20">
          <section aria-labelledby="pp-quem">
            <h2 id="pp-quem" className="font-display text-2xl font-medium text-heading">
              1. Quem somos
            </h2>
            <p className="mt-3">
              O {site.name} (CNS {site.cns}), com sede na {site.address.full},
              é o controlador dos dados pessoais tratados no âmbito deste site
              e dos serviços notariais e de protesto que presta.
            </p>
          </section>

          <section aria-labelledby="pp-dados">
            <h2 id="pp-dados" className="font-display text-2xl font-medium text-heading">
              2. Quais dados tratamos
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="font-semibold text-heading">No site:</strong>{" "}
                este site institucional não utiliza cookies de rastreamento nem
                ferramentas de publicidade. Os dados que você informar
                voluntariamente no formulário de contato (nome, telefone,
                mensagem) são usados exclusivamente para responder à sua
                solicitação.
              </li>
              <li>
                <strong className="font-semibold text-heading">No atendimento:</strong>{" "}
                para a prática de atos notariais e de protesto, tratamos os
                dados exigidos por lei (identificação, estado civil, endereço,
                dados de títulos), em cumprimento de obrigação legal - arts.
                7º, II, e 23 da LGPD.
              </li>
            </ul>
          </section>

          <section aria-labelledby="pp-finalidade">
            <h2 id="pp-finalidade" className="font-display text-2xl font-medium text-heading">
              3. Para que usamos
            </h2>
            <p className="mt-3">
              Os dados são tratados exclusivamente para: (i) praticar os atos
              solicitados, com a segurança e a publicidade que a lei determina;
              (ii) cumprir obrigações legais e normativas perante o Poder
              Judiciário e as centrais oficiais (CENSEC, CENPROT, e-Notariado);
              e (iii) responder aos seus contatos.
            </p>
          </section>

          <section aria-labelledby="pp-compart">
            <h2 id="pp-compart" className="font-display text-2xl font-medium text-heading">
              4. Com quem compartilhamos
            </h2>
            <p className="mt-3">
              Apenas nas hipóteses legais: órgãos do Poder Judiciário,
              autoridades competentes e centrais oficiais dos serviços
              notariais e de protesto. Não vendemos nem cedemos dados pessoais
              para fins comerciais.
            </p>
          </section>

          <section aria-labelledby="pp-guarda">
            <h2 id="pp-guarda" className="font-display text-2xl font-medium text-heading">
              5. Por quanto tempo guardamos
            </h2>
            <p className="mt-3">
              Os livros e documentos notariais e de protesto são de guarda
              permanente, por determinação legal. Mensagens de contato são
              mantidas apenas pelo tempo necessário ao atendimento.
            </p>
          </section>

          <section aria-labelledby="pp-direitos">
            <h2 id="pp-direitos" className="font-display text-2xl font-medium text-heading">
              6. Seus direitos
            </h2>
            <p className="mt-3">
              A LGPD garante a você direitos de acesso, correção e informação
              sobre o tratamento dos seus dados - observados os limites das
              obrigações legais da atividade notarial e de protesto. Saiba como
              exercê-los na página{" "}
              <Link
                href="/lgpd"
                className="font-medium text-link underline underline-offset-2"
              >
                LGPD
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="pp-contato">
            <h2 id="pp-contato" className="font-display text-2xl font-medium text-heading">
              7. Como falar conosco
            </h2>
            <p className="mt-3">
              Dúvidas sobre esta política podem ser dirigidas ao cartório pelo
              e-mail{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-link underline underline-offset-2"
              >
                {site.email}
              </a>{" "}
              ou pelo telefone {site.phone}.
            </p>
            <p className="mt-6 text-sm text-ink-500">
              Última atualização: julho de 2026. Esta política pode ser revista
              para refletir mudanças legais ou operacionais.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
