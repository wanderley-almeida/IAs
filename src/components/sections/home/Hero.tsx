import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HeroSearchTrigger } from "./HeroSearchTrigger";

export function Hero() {
  return (
    <section className="aurora grain dotgrid relative overflow-hidden text-white">
      {/* Anéis concêntricos: eco do selo notarial */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -right-48 h-[42rem] w-[42rem] text-gold-400/[0.08]"
        viewBox="0 0 400 400"
        fill="none"
      >
        {[70, 110, 150, 190, 230].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} stroke="currentColor" />
        ))}
        <circle
          cx="200"
          cy="200"
          r={170}
          stroke="currentColor"
          strokeDasharray="2 10"
          className="text-gold-400/20"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 md:pt-28 md:pb-32">
        <div className="max-w-3xl">
          <p
            data-reveal
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[0.8125rem] font-medium tracking-wide text-white/85 backdrop-blur"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
            Serventia oficial de Potirendaba desde {site.foundedYear}
          </p>

          <h1
            data-reveal
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
            className="font-display text-[2.375rem] leading-[1.14] font-medium tracking-[-0.005em] md:text-[3.25rem]"
          >
            Segurança jurídica com atendimento{" "}
            <span className="text-gold-400">próximo e humano</span>
          </h1>

          <p
            data-reveal
            style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            Escrituras, procurações, reconhecimento de firma, protesto de
            títulos e muito mais, com a fé pública de quem serve a região há
            mais de um século.
          </p>

          <div
            data-reveal
            style={{ "--reveal-delay": "270ms" } as React.CSSProperties}
            className="mt-9"
          >
            <HeroSearchTrigger />
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "360ms" } as React.CSSProperties}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Button href="/servicos" variant="gold" size="lg">
              Conhecer os serviços
              <Icon name="arrowRight" className="h-5 w-5" />
            </Button>
            <Button
              href="/contato"
              variant="secondary"
              size="lg"
              className="border-white/20 bg-white/[0.04] text-white backdrop-blur hover:border-gold-400/70 hover:text-gold-300"
            >
              Falar com o cartório
            </Button>
          </div>

          <ul
            data-reveal
            style={{ "--reveal-delay": "440ms" } as React.CSSProperties}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/65"
          >
            <li className="flex items-center gap-2.5">
              <Icon name="mapPin" className="h-4.5 w-4.5 text-gold-400" />
              {site.address.street}, {site.address.number}, Centro
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="clock" className="h-4.5 w-4.5 text-gold-400" />
              {site.hours.label}
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Icon name="phone" className="h-4.5 w-4.5 text-gold-400" />
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
