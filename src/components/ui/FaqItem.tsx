import { Icon } from "./Icon";

/**
 * Item de FAQ sobre <details> nativo: acessível por teclado e leitores de
 * tela sem nenhum JavaScript; a animação de abertura é feita em CSS.
 */
export function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="faq-item group rounded-xl border border-line bg-surface-0 transition-colors hover:border-navy-600/40">
      <summary className="flex items-center justify-between gap-4 px-5 py-4 text-left font-medium text-navy-900">
        <span>{question}</span>
        <Icon
          name="chevronDown"
          className="faq-chevron h-5 w-5 text-gold-500"
        />
      </summary>
      <div>
        <p className="px-5 pt-0 pb-5 leading-relaxed text-ink-700">{answer}</p>
      </div>
    </details>
  );
}
