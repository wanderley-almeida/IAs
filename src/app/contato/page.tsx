import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = pageMetadata(
  "Contato e Localização",
  `Fale com o ${site.shortName}: ${site.phone}, ${site.email}. ${site.address.full}. ${site.hours.label}.`,
  "/contato",
);

const channels = [
  {
    icon: "phone" as const,
    title: "Telefone",
    value: site.phone,
    href: site.phoneHref,
    note: "Atendimento em horário comercial",
  },
  {
    icon: "mail" as const,
    title: "E-mail",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Respondemos o mais breve possível",
  },
  {
    icon: "clock" as const,
    title: "Horário",
    value: site.hours.label,
    note: site.hours.note,
  },
];

export default function ContatoPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contato", href: "/contato" }]}
        eyebrow="Atendimento"
        title="Fale com o cartório"
        lede="Tire dúvidas, confirme documentos e valores, ou agende um ato. Preferimos orientar antes - para que sua visita resolva de uma vez."
      />

      {/* Canais */}
      <section className="bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <ul className="grid gap-5 md:grid-cols-3">
            {channels.map((channel, i) => (
              <li
                key={channel.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="rounded-2xl border border-line bg-surface-0 p-6"
              >
                <span className="inline-flex rounded-xl bg-action/10 p-2.5 text-link">
                  <Icon name={channel.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-sm font-semibold tracking-wider text-ink-500 uppercase">
                  {channel.title}
                </h2>
                {channel.href ? (
                  <a
                    href={channel.href}
                    className="mt-1 block text-lg font-semibold break-words text-heading transition-colors hover:text-link"
                  >
                    {channel.value}
                  </a>
                ) : (
                  <p className="mt-1 text-lg font-semibold text-heading">
                    {channel.value}
                  </p>
                )}
                <p className="mt-1.5 text-sm text-ink-500">{channel.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Formulário + Localização */}
      <section className="bg-surface-0">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2">
          <div data-reveal>
            <SectionHeading
              eyebrow="Mensagem"
              title="Envie sua dúvida"
              lede="Descreva o que você precisa e retornaremos com a orientação completa."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div id="localizacao" data-reveal className="scroll-mt-28">
            <SectionHeading
              eyebrow="Localização"
              title="Onde estamos"
              lede={site.address.full}
            />
            <div className="mt-8">
              <MapEmbed />
            </div>
            <div className="mt-5 rounded-2xl border border-line bg-surface-1 p-5 text-sm leading-relaxed">
              <p className="flex items-start gap-2.5">
                <Icon name="mapPin" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-500" />
                <span>
                  Estamos no centro de Potirendaba, com acesso facilitado a
                  quem vem dos municípios vizinhos da região de São José do Rio
                  Preto.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
