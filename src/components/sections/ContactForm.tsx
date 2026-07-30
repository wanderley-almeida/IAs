"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { Icon } from "@/components/ui/Icon";

/**
 * Formulário de contato (ADR-007): sem backend nesta fase, monta um e-mail
 * estruturado via mailto. Validação nativa + mensagens acessíveis.
 * TODO: integrar provedor de envio (Resend/Formspree/API própria) quando
 * houver infraestrutura.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const phone = String(data.get("phone") ?? "");
    const subject = String(data.get("subject") ?? "");
    const message = String(data.get("message") ?? "");

    const body = [
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      "",
      message,
      "",
      "— Mensagem enviada pelo site",
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `[Site] ${subject} — ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const inputClasses =
    "w-full rounded-lg border border-line bg-surface-0 px-4 py-3 text-ink-900 placeholder:text-ink-500/60 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-navy-900"
          >
            Nome completo <span aria-hidden="true" className="text-danger">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClasses}
          />
        </div>
        <div>
          <label
            htmlFor="contact-phone"
            className="mb-1.5 block text-sm font-medium text-navy-900"
          >
            Telefone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block text-sm font-medium text-navy-900"
        >
          Assunto <span aria-hidden="true" className="text-danger">*</span>
        </label>
        <select id="contact-subject" name="subject" required className={inputClasses}>
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
          className="mb-1.5 block text-sm font-medium text-navy-900"
        >
          Mensagem <span aria-hidden="true" className="text-danger">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={inputClasses}
          placeholder="Descreva sua dúvida ou necessidade. Não inclua dados sensíveis desnecessários."
        />
      </div>

      <p className="text-xs leading-relaxed text-ink-500">
        Ao enviar, seu aplicativo de e-mail será aberto com a mensagem
        preenchida, endereçada a {site.email}. Seus dados são usados apenas
        para responder ao seu contato — consulte a{" "}
        <a href="/privacidade" className="text-navy-700 underline underline-offset-2">
          Política de Privacidade
        </a>
        .
      </p>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg bg-navy-700 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-navy-600"
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
