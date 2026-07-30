import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import type { Crumb } from "@/lib/jsonld";

/** Cabeçalho padrão das páginas internas: aurora, breadcrumb e H1 serifado. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="aurora grain dotgrid relative overflow-hidden text-white">
      <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 md:pt-10 md:pb-20">
        <Breadcrumbs crumbs={crumbs} dark />
        <div className="mt-9 max-w-3xl">
          {eyebrow && (
            <p className="mb-4 flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-gold-400">
              <span aria-hidden="true" className="h-px w-8 bg-gold-400/70" />
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-[2rem] leading-[1.16] font-medium tracking-[-0.005em] md:text-[2.75rem]">
            {title}
          </h1>
          {lede && (
            <p className="mt-5 text-lg leading-relaxed text-white/70">{lede}</p>
          )}
        </div>
      </div>
    </section>
  );
}
