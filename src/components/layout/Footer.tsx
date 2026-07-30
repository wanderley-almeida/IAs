import Link from "next/link";
import { site } from "@/content/site";
import { servicesNav, aboutNav } from "./nav";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

const institucionalLinks = [
  ...aboutNav.links,
  { label: "Perguntas frequentes", href: "/faq" },
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "LGPD", href: "/lgpd" },
  { label: "Contato", href: "/contato" },
];

export function Footer() {
  return (
    <footer className="aurora grain relative text-white/80">
      <span className="hairline-gold absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Institucional */}
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              {site.name}. Serventia extrajudicial delegada nos termos do art.
              236 da Constituição Federal, servindo a comunidade desde{" "}
              {site.foundedYear}.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Icon name="mapPin" className="mt-0.5 h-4.5 w-4.5 text-gold-400" />
                <span>{site.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="phone" className="h-4.5 w-4.5 text-gold-400" />
                <a href={site.phoneHref} className="hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="mail" className="h-4.5 w-4.5 text-gold-400" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="clock" className="h-4.5 w-4.5 text-gold-400" />
                <span>{site.hours.label}</span>
              </li>
            </ul>
          </div>

          {/* Notas */}
          <nav aria-label="Serviços de Notas">
            <h2 className="mb-4 text-[0.8125rem] font-semibold tracking-wider text-gold-400 uppercase">
              Serviços de Notas
            </h2>
            <ul className="space-y-2.5 text-sm">
              {servicesNav.notas.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Protesto */}
          <nav aria-label="Serviços de Protesto">
            <h2 className="mb-4 text-[0.8125rem] font-semibold tracking-wider text-gold-400 uppercase">
              Serviços de Protesto
            </h2>
            <ul className="space-y-2.5 text-sm">
              {servicesNav.protesto.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 mb-4 text-[0.8125rem] font-semibold tracking-wider text-gold-400 uppercase">
              Serviços digitais
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={site.external.eNotariado}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  e-Notariado
                  <Icon name="external" className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={site.external.cenprot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  CENPROT - Consulta de protestos
                  <Icon name="external" className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </nav>

          {/* Institucional */}
          <nav aria-label="Institucional">
            <h2 className="mb-4 text-[0.8125rem] font-semibold tracking-wider text-gold-400 uppercase">
              Institucional
            </h2>
            <ul className="space-y-2.5 text-sm">
              {institucionalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Barra legal */}
        <div className="mt-14 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/55">
          <p>
            {site.name} · CNS {site.cns} · CNPJ: {site.cnpj} ·{" "}
            {site.titular.role}: {site.titular.name}
          </p>
          <p className="mt-1.5">
            © {new Date().getFullYear()} {site.shortName}. Conteúdo meramente
            informativo - não substitui orientação presencial. Emolumentos
            conforme tabela oficial do Tribunal de Justiça de São Paulo.
          </p>
        </div>
      </div>
    </footer>
  );
}
