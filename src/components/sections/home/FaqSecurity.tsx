import Link from "next/link";
import { faqCategories } from "@/content/faq";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqItem } from "@/components/ui/FaqItem";
import { Icon } from "@/components/ui/Icon";

const securityChecks = [
  "Desconfie de urgência: intimações verdadeiras dão prazo legal de 3 dias úteis.",
  "Confira o beneficiário do boleto: deve ser a própria serventia.",
  "Intimações legítimas identificam o título, o credor e o cartório responsável.",
  "Na dúvida, ligue antes de pagar. A confirmação leva um minuto.",
];

/**
 * FAQ + alerta de segurança permanente (conteúdo que não exige manutenção,
 * substituindo a antiga seção de notícias).
 */
export function FaqSecurity() {
  const faqSample = faqCategories.flatMap((c) => c.items).slice(0, 4);

  return (
    <section className="bg-surface-1">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.15fr_1fr]">
        <div aria-labelledby="faq-preview-title">
          <SectionHeading eyebrow="Dúvidas comuns" title="Perguntas frequentes" />
          <span className="sr-only" id="faq-preview-title">
            Perguntas frequentes
          </span>
          <div className="mt-8 space-y-3">
            {faqSample.map((item, i) => (
              <div
                key={item.question}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              >
                <FaqItem question={item.question} answer={item.answer} />
              </div>
            ))}
          </div>
          <Link
            href="/faq"
            className="mt-6 inline-flex items-center gap-2 font-medium text-link transition-colors hover:text-link-hover"
          >
            Ver todas as perguntas
            <Icon name="arrowRight" className="h-4.5 w-4.5" />
          </Link>
        </div>

        <div aria-labelledby="security-title" data-reveal>
          <div className="card relative overflow-hidden rounded-3xl p-8">
            <span className="hairline-gold absolute inset-x-8 top-0" aria-hidden="true" />
            <span className="inline-flex w-fit rounded-2xl bg-danger/10 p-3 text-danger">
              <Icon name="shield" className="h-7 w-7" />
            </span>
            <h2
              id="security-title"
              className="font-display mt-5 text-2xl font-medium text-heading"
            >
              Atenção ao golpe do falso boleto
            </h2>
            <p className="mt-3 leading-relaxed text-ink-500">
              Criminosos enviam falsas intimações e boletos em nome de
              cartórios de protesto. Antes de pagar qualquer cobrança, faça
              estas verificações:
            </p>
            <ul className="mt-5 space-y-3">
              {securityChecks.map((check) => (
                <li
                  key={check}
                  className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-700"
                >
                  <Icon
                    name="checkCircle"
                    className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-500"
                  />
                  {check}
                </li>
              ))}
            </ul>
            <a
              href={site.phoneHref}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-action px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-action-hover"
            >
              <Icon name="phone" className="h-4 w-4" />
              Confirmar pelo telefone oficial: {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
