import Link from "next/link";
import {
  notasServices,
  protestoServices,
  getServicePath,
} from "@/content/services";
import type { Service } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";

function PillarCard({
  icon,
  title,
  description,
  href,
  services,
  delay,
}: {
  icon: IconName;
  title: string;
  description: string;
  href: string;
  services: Service[];
  delay: number;
}) {
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className="flex flex-col rounded-3xl border border-line bg-surface-0 p-8 transition-shadow hover:shadow-lg md:p-10"
    >
      <span className="w-fit rounded-2xl bg-navy-950 p-3.5 text-gold-400">
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <h3 className="font-display mt-6 text-2xl font-medium text-navy-900">
        {title}
      </h3>
      <p className="mt-3 leading-relaxed text-ink-500">{description}</p>
      <ul className="mt-6 grid gap-x-6 gap-y-2 border-t border-line pt-6 sm:grid-cols-2">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={getServicePath(service)}
              className="group flex items-center gap-2 py-1 text-[0.9375rem] text-ink-700 transition-colors hover:text-navy-700"
            >
              <Icon
                name="chevronRight"
                className="h-4 w-4 text-gold-500 transition-transform group-hover:translate-x-0.5"
              />
              {service.shortTitle}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <Link
          href={href}
          className="inline-flex items-center gap-2 font-medium text-navy-700 transition-colors hover:text-navy-600"
        >
          Ver todos
          <Icon name="arrowRight" className="h-4.5 w-4.5" />
        </Link>
      </div>
    </article>
  );
}

export function Pillars() {
  return (
    <section aria-labelledby="pillars-title" className="bg-surface-0">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <SectionHeading
          eyebrow="Nossos serviços"
          title="Duas atribuições, um mesmo compromisso"
          lede="Atuamos como Tabelionato de Notas e de Protesto de Letras e Títulos — formalizando a vontade das pessoas e dando eficácia à cobrança de créditos."
        />
        <span className="sr-only" id="pillars-title">
          Nossos serviços
        </span>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <PillarCard
            icon="pen"
            title="Serviços de Notas"
            description="Escrituras, procurações, testamentos, atas notariais, reconhecimento de firma, autenticações e certidões — atos com fé pública que protegem seus negócios e sua família."
            href="/servicos/notas"
            services={notasServices}
            delay={0}
          />
          <PillarCard
            icon="scale"
            title="Serviços de Protesto"
            description="Protesto de títulos, consulta e certidões, emissão de boletos para pagamento e cancelamento — o caminho legal mais eficiente para a recuperação de créditos."
            href="/servicos/protesto"
            services={protestoServices}
            delay={120}
          />
        </div>
      </div>
    </section>
  );
}
