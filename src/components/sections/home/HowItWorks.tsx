import { site } from "@/content/site";
import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

const steps = [
  {
    title: "Fale conosco",
    description:
      "Por telefone, e-mail ou no balcão. Entendemos sua necessidade e indicamos o ato certo e os documentos exatos, sem idas desnecessárias.",
  },
  {
    title: "Traga seus documentos",
    description:
      "Analisamos tudo com antecedência, calculamos os emolumentos oficiais e preparamos o ato para a sua assinatura.",
  },
  {
    title: "Assine com fé pública",
    description:
      "Presencialmente ou por videoconferência, quando cabível. Você sai com o documento válido em todo o território nacional.",
  },
];

const currentYear = new Date().getFullYear();

const stats = [
  {
    value: currentYear - site.foundedYear,
    prefix: "+",
    label: "anos servindo Potirendaba e região",
  },
  {
    value: services.length,
    prefix: "",
    label: "serviços de notas e protesto à sua disposição",
  },
  {
    value: 3,
    prefix: "",
    label: "dias úteis para regularizar um título após a intimação",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="bg-surface-0">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
        <SectionHeading
          eyebrow="Atendimento"
          title="Simples para você, rigoroso na forma"
          lede="Cuidamos da complexidade jurídica para que sua experiência seja direta e sem surpresas."
        />
        <span className="sr-only" id="how-title">
          Como funciona o atendimento
        </span>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              className="card rounded-3xl p-8"
            >
              <span
                aria-hidden="true"
                className="font-display inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/45 text-[1.0625rem] font-medium text-gold-500"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-heading">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        {/* Faixa de números em painel escuro */}
        <div
          data-reveal
          className="aurora grain relative mt-12 overflow-hidden rounded-3xl border border-white/10 px-8 py-10 md:px-14"
        >
          <dl className="grid gap-8 text-white sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  i > 0 ? "sm:border-l sm:border-white/10 sm:pl-8" : undefined
                }
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[2rem] leading-none font-medium text-gold-400 md:text-[2.25rem]">
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} />
                </dd>
                <dd
                  aria-hidden="true"
                  className="mt-3 max-w-[15rem] text-[0.9375rem] leading-snug text-white/65"
                >
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
