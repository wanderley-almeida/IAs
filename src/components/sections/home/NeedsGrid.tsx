import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";

interface Need {
  icon: IconName;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

/** Entrada alternativa por necessidade - o usuário nem sempre conhece o nome do ato. */
const needs: Need[] = [
  {
    icon: "home",
    title: "Vou comprar ou vender um imóvel",
    description:
      "A escritura pública formaliza o negócio com segurança para as duas partes.",
    href: "/servicos/notas/escrituras",
    linkLabel: "Escrituras",
  },
  {
    icon: "userCheck",
    title: "Preciso que alguém me represente",
    description:
      "Uma procuração pública dá poderes a quem você confia, no limite que você definir.",
    href: "/servicos/notas/procuracoes",
    linkLabel: "Procurações",
  },
  {
    icon: "scale",
    title: "Preciso cobrar um cliente",
    description:
      "O protesto é o meio legal mais rápido e barato de cobrança formal - a maioria paga em dias.",
    href: "/servicos/protesto/protesto-de-titulos",
    linkLabel: "Protesto de títulos",
  },
  {
    icon: "alert",
    title: "Recebi um aviso de protesto",
    description:
      "Você tem 3 dias úteis para regularizar. Emitimos o boleto e orientamos o passo a passo.",
    href: "/servicos/protesto/emissao-de-boletos",
    linkLabel: "Emissão de boletos",
  },
  {
    icon: "shield",
    title: "Quero proteger minha família",
    description:
      "Testamento público e planejamento sucessório com sigilo e segurança jurídica.",
    href: "/servicos/notas/testamentos",
    linkLabel: "Testamentos",
  },
  {
    icon: "eye",
    title: "Preciso provar um fato",
    description:
      "A ata notarial transforma conversas, sites e situações em prova com fé pública.",
    href: "/servicos/notas/atas-notariais",
    linkLabel: "Atas notariais",
  },
];

export function NeedsGrid() {
  return (
    <section aria-labelledby="needs-title" className="bg-surface-1">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <SectionHeading
          eyebrow="Como podemos ajudar"
          title="Comece pela sua necessidade"
          lede="Você não precisa conhecer o nome técnico do ato. Encontre o serviço certo a partir da sua situação."
          align="center"
        />
        <span className="sr-only" id="needs-title">
          Como podemos ajudar
        </span>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {needs.map((need, i) => (
            <Link
              key={need.href + need.title}
              href={need.href}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
              className="card card-hover group flex flex-col p-6"
            >
              <span className="w-fit rounded-xl bg-gold-500/10 p-2.5 text-gold-500">
                <Icon name={need.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg leading-snug font-semibold text-heading">
                {need.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
                {need.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-link">
                {need.linkLabel}
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
