import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Faixa de contato reutilizada ao final das páginas de conteúdo. */
export function ContactStrip() {
  return (
    <section aria-label="Contato" className="bg-surface-0">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl bg-navy-900 px-8 py-12 text-white md:px-14 md:py-14"
        >
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 text-gold-400/[0.08]"
            viewBox="0 0 400 400"
            fill="none"
          >
            {[100, 150, 200].map((r) => (
              <circle key={r} cx="200" cy="200" r={r} stroke="currentColor" strokeWidth="1.5" />
            ))}
          </svg>
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-3xl leading-tight font-medium">
                Ficou com alguma dúvida?
              </h2>
              <p className="mt-3 max-w-xl text-lg text-white/75">
                Nossa equipe orienta você sobre documentos, prazos e valores
                antes de qualquer deslocamento. {site.hours.label}.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href={site.phoneHref} variant="gold" size="lg">
                <Icon name="phone" className="h-5 w-5" />
                {site.phone}
              </Button>
              <Button
                href="/contato"
                variant="secondary"
                size="lg"
                className="border-white/25 bg-transparent text-white hover:border-gold-400 hover:text-gold-400"
              >
                Página de contato
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
