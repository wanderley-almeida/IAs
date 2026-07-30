import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HeroSearchTrigger } from "./HeroSearchTrigger";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      {/* Textura sutil: linhas finas douradas em arco */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] text-gold-400/[0.07]"
        viewBox="0 0 400 400"
        fill="none"
      >
        {[80, 120, 160, 200, 240].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} stroke="currentColor" />
        ))}
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6 md:pt-24 md:pb-20">
        <div className="max-w-3xl">
          <p
            data-reveal
            className="mb-4 flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-gold-400"
          >
            <Icon name="seal" className="h-4.5 w-4.5" />
            Serventia oficial · Potirendaba desde {site.foundedYear}
          </p>

          <h1
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            className="font-display text-4xl leading-[1.12] font-medium md:text-6xl"
          >
            Segurança jurídica com atendimento{" "}
            <span className="text-gold-400">próximo e humano</span>
          </h1>

          <p
            data-reveal
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl"
          >
            Escrituras, procurações, reconhecimento de firma, protesto de
            títulos e muito mais — com a fé pública de quem serve a região há
            mais de um século.
          </p>

          <div
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            className="mt-8"
          >
            <HeroSearchTrigger />
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Button href="/servicos" variant="gold" size="lg">
              Conhecer os serviços
              <Icon name="arrowRight" className="h-5 w-5" />
            </Button>
            <Button
              href="/contato"
              variant="secondary"
              size="lg"
              className="border-white/25 bg-transparent text-white hover:border-gold-400 hover:text-gold-400"
            >
              Falar com o cartório
            </Button>
          </div>
        </div>
      </div>

      {/* Faixa de dados essenciais */}
      <div className="relative border-t border-white/10 bg-navy-900/60">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 text-sm text-white/80 sm:grid-cols-3 sm:px-6">
          <p className="flex items-center gap-2.5">
            <Icon name="mapPin" className="h-4.5 w-4.5 shrink-0 text-gold-400" />
            {site.address.street}, {site.address.number} — {site.address.city}/
            {site.address.state}
          </p>
          <p className="flex items-center gap-2.5">
            <Icon name="clock" className="h-4.5 w-4.5 shrink-0 text-gold-400" />
            {site.hours.label}
          </p>
          <a
            href={site.phoneHref}
            className="flex items-center gap-2.5 transition-colors hover:text-white"
          >
            <Icon name="phone" className="h-4.5 w-4.5 shrink-0 text-gold-400" />
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
