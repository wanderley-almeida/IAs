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
    <section
      aria-labelledby="digital-title"
      className="aurora grain dotgrid relative overflow-hidden text-white"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div data-reveal>
            <p className="mb-4 flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-gold-400">
              <span aria-hidden="true" className="h-px w-8 bg-gold-400/70" />
              Cartório digital
            </p>
            <h2
              id="digital-title"
              className="font-display text-[2rem] leading-[1.15] font-medium md:text-[2.6rem]"
            >
              Tradição de 1920,
              <br />
              <span className="text-gold-sheen italic">tecnologia de hoje</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Muitos atos já podem ser resolvidos sem sair de casa, pelas
              plataformas oficiais do notariado e do protesto brasileiros, com
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
                className="glass group flex flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:bg-white/[0.09]"
              >
                <span className="w-fit rounded-2xl bg-gold-400/15 p-3 text-gold-300">
                  <Icon name={channel.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{channel.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {channel.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-gold-300">
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
