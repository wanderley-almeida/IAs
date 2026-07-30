import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

const channels = [
  {
    icon: "video" as const,
    title: "e-Notariado",
    description:
      "Escrituras e procurações por videoconferência, com certificado digital gratuito emitido no cartório.",
    href: site.external.eNotariado,
    cta: "Acessar plataforma",
  },
  {
    icon: "search" as const,
    title: "Consulta nacional de protestos",
    description:
      "Verifique gratuitamente qualquer CPF ou CNPJ em todos os cartórios do Brasil, pela central oficial.",
    href: site.external.cenprot,
    cta: "Consultar grátis",
  },
];

export function DigitalCta() {
  return (
    <section aria-labelledby="digital-title" className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div data-reveal>
            <p className="mb-3 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-gold-400">
              Cartório digital
            </p>
            <h2 className="font-display text-3xl leading-tight font-medium md:text-4xl">
              Tradição de 1920, tecnologia de hoje
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              Muitos atos já podem ser resolvidos sem sair de casa, pelas
              plataformas oficiais do notariado e do protesto brasileiros — com
              a mesma validade jurídica.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {channels.map((channel, i) => (
              <a
                key={channel.href}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                className="group flex flex-col rounded-2xl border border-white/12 bg-white/[0.05] p-6 transition-colors hover:border-gold-400/50 hover:bg-white/[0.09]"
              >
                <span className="w-fit rounded-xl bg-gold-400/15 p-2.5 text-gold-400">
                  <Icon name={channel.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{channel.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {channel.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-gold-400">
                  {channel.cta}
                  <Icon
                    name="external"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
