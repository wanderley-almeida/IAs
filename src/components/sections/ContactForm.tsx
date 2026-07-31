"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { Icon } from "@/components/ui/Icon";

/**
 * Formulário de contato (ADR-007). Sem backend nesta fase: monta um e-mail
 * estruturado via mailto, aberto no cliente do próprio usuário.
 *
 * Controles de segurança aplicados:
 *
 * - Sanitização anti-CRLF: quebras de linha em campos que compõem o assunto
 *   do e-mail permitiriam injeção de cabeçalhos (CWE-93) em clientes de
 *   e-mail permissivos, com risco de Bcc oculto. Todos os campos usados no
 *   assunto são normalizados para linha única antes da codificação.
 * - Limite de comprimento no cliente e no envio, evitando URLs abusivas.
 * - Honeypot: campo invisível a humanos; se preenchido, o envio é
 *   descartado silenciosamente (defesa contra bots simples).
 * - Minimização de dados (LGPD): coletamos apenas nome, telefone opcional,
 *   assunto e mensagem, e avisamos para não incluir dados sensíveis.
 *
 * TODO (quando houver backend): revalidar TODOS os campos no servidor,
 * aplicar rate limiting por IP, CAPTCHA ou prova de trabalho, e registrar
 * apenas metadados, nunca o conteúdo da mensagem.
 */

const LIMITS = { name: 120, phone: 20, subject: 80, message: 2000 } as const;

/** Remove controles e quebras de linha; colapsa espaços. Uso: linha única. */
function toSingleLine(value: string, maxLength: number): string {
  return value
    .replace(/[\r\n\t\u00a0\u2028\u2029]+/g, " ")
    // Remove caracteres de controle que não têm representação textual.
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, maxLength);
}

/** Preserva parágrafos, mas remove controles e limita o tamanho. */
function toSafeBody(value: string, maxLength: number): string {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // Honeypot: humanos não veem nem preenchem este campo.
    if (String(data.get("website") ?? "").length > 0) {
      setSent(true);
      return;
    }

    const name = toSingleLine(String(data.get("name") ?? ""), LIMITS.name);
    const phone = toSingleLine(String(data.get("phone") ?? ""), LIMITS.phone);
    const subject = toSingleLine(
      String(data.get("subject") ?? ""),
      LIMITS.subject,
    );
    const message = toSafeBody(
      String(data.get("message") ?? ""),
      LIMITS.message,
    );

    if (!name || !subject || !message) return;

    const body = [
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      "",
      message,
      "",
      "Mensagem enviada pelo site",
    ].join("\n");

    const href =
      `mailto:${site.email}` +
      `?subject=${encodeURIComponent(`[Site] ${subject} - ${name}`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSent(true);
  }

  const inputClasses =
    "w-full rounded-lg border border-line bg-surface-0 px-4 py-3 text-ink-900 placeholder:text-ink-500/60 focus:border-azure-500 focus:outline-none focus:ring-2 focus:ring-azure-500/25";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot: fora do fluxo visual e do foco, oculto de leitores de tela */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Não preencha este campo</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-heading"
          >
            Nome completo{" "}
            <span aria-hidden="true" className="text-danger">
              *
            </span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={LIMITS.name}
            autoComplete="name"
            className={inputClasses}
          />
        </div>
        <div>
          <label
            htmlFor="contact-phone"
            className="mb-1.5 block text-sm font-medium text-heading"
          >
            Telefone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            maxLength={LIMITS.phone}
            autoComplete="tel"
            inputMode="tel"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block text-sm font-medium text-heading"
        >
          Assunto{" "}
          <span aria-hidden="true" className="text-danger">
            *
          </span>
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          className={inputClasses}
        >
          <option value="">Selecione o assunto…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.shortTitle}>
              {s.shortTitle}
            </option>
          ))}
          <option value="Outro assunto">Outro assunto</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-heading"
        >
          Mensagem{" "}
          <span aria-hidden="true" className="text-danger">
            *
          </span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={LIMITS.message}
          className={inputClasses}
          placeholder="Descreva sua dúvida ou necessidade."
        />
      </div>

      <p className="text-xs leading-relaxed text-ink-500">
        Ao enviar, seu aplicativo de e-mail será aberto com a mensagem
        preenchida, endereçada a {site.email}. Para sua segurança,{" "}
        <strong className="font-semibold text-heading">
          não inclua senhas, dados bancários, número de documentos ou outras
          informações sensíveis
        </strong>
        . Seus dados são usados apenas para responder ao seu contato; consulte
        a{" "}
        <a
          href="/privacidade"
          className="text-link underline underline-offset-2"
        >
          Política de Privacidade
        </a>
        .
      </p>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-action px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-action-hover"
      >
        <Icon name="mail" className="h-4.5 w-4.5" />
        Enviar mensagem
      </button>

      {sent && (
        <p
          role="status"
          className="rounded-lg border border-success/30 bg-success/5 px-4 py-3 text-sm text-success"
        >
          Seu aplicativo de e-mail foi aberto com a mensagem pronta. Se
          preferir, ligue para {site.phone}.
        </p>
      )}
    </form>
  );
}
