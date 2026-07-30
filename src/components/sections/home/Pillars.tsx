import Link from "next/link";
import {
  notasServices,
  protestoServices,
  getServicePath,
} from "@/content/services";
import type { Service } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";

function ServiceList({
  services,
  dark,
}: {
  services: Service[];
  dark?: boolean;
}) {
  return (
    <ul
      className={`mt-6 grid gap-x-6 gap-y-1.5 border-t pt-6 sm:grid-cols-2 ${
        dark ? "border-white/12" : "border-line"
      }`}
    >
      {services.map((service) => (
        <li key={service.slug}>
          <Link
            href={getServicePath(service)}
            className={`group flex items-center gap-2 py-1 text-[0.9375rem] transition-colors ${
              dark
                ? "text-white/75 hover:text-gold-300"
                : "text-ink-700 hover:text-link"
            }`}
          >
            <Icon
              name="chevronRight"
              className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 ${
                dark ? "text-gold-400" : "text-gold-500"
              }`}
            />
            {service.shortTitle}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CardLink({ href, dark }: { href: string; dark?: boolean }) {
  return (
    <div className="mt-auto pt-8">
      <Link
        href={href}
        className={`inline-flex items-center gap-2 font-medium transition-colors ${
          dark
            ? "text-gold-300 hover:text-gold-400"
            : "text-link hover:text-link-hover"
        }`}
      >
        Ver todos
        <Icon name="arrowRight" className="h-4.5 w-4.5" />
      </Link>
    </div>
  );
}

function IconBadge({ icon, dark }: { icon: IconName; dark?: boolean }) {
  return (
    <span
      className={`w-fit rounded-2xl p-3.5 ${
        dark ? "glass text-gold-300" : "bg-action/10 text-link"
      }`}
    >
      <Icon name={icon} className="h-7 w-7" />
    </span>
  );
}

/** Bento de duas atribuições: Notas em claro, Protesto em painel escuro. */
export function Pillars() {
  return (
    <section aria-labelledby="pillars-title" className="bg-surface-1">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <SectionHeading
          eyebrow="Nossos serviços"
          title="Duas atribuições, um mesmo compromisso"
          lede="Atuamos como Tabelionato de Notas e de Protesto de Letras e Títulos: formalizamos a vontade das pessoas e damos eficácia à cobrança de créditos."
        />
        <span className="sr-only" id="pillars-title">
          Nossos serviços
        </span>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article
            data-reveal
            className="card card-hover relative flex flex-col overflow-hidden rounded-3xl p-8 md:p-10"
          >
            <span className="hairline-gold absolute inset-x-8 top-0" aria-hidden="true" />
            <IconBadge icon="pen" />
            <h3 className="font-display mt-6 text-2xl font-medium text-heading">
              Serviços de Notas
            </h3>
            <p className="mt-3 leading-relaxed text-ink-500">
              Escrituras, procurações, testamentos, atas notariais,
              reconhecimento de firma, autenticações e certidões. Atos com fé
              pública que protegem seus negócios e sua família.
            </p>
            <ServiceList services={notasServices} />
            <CardLink href="/servicos/notas" />
          </article>

          <article
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="aurora grain relative flex flex-col overflow-hidden rounded-3xl border border-white/10 p-8 text-white transition-transform duration-300 hover:-translate-y-1 md:p-10"
          >
            <IconBadge icon="scale" dark />
            <h3 className="font-display mt-6 text-2xl font-medium">
              Serviços de Protesto
            </h3>
            <p className="mt-3 leading-relaxed text-white/70">
              Protesto de títulos, consulta e certidões, emissão de boletos
              para pagamento e cancelamento. O caminho legal mais eficiente
              para a recuperação de créditos.
            </p>
            <ServiceList services={protestoServices} dark />
            <CardLink href="/servicos/protesto" dark />
          </article>
        </div>
      </div>
    </section>
  );
}
