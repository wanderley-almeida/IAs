import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import type { Crumb } from "@/lib/jsonld";

/** Cabeçalho padrão das páginas internas: navy, breadcrumb, H1 serifado. */
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
    <section className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-14 sm:px-6 md:pt-10 md:pb-16">
        <Breadcrumbs crumbs={crumbs} dark />
        <div className="mt-8 max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-gold-400">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-3xl leading-tight font-medium md:text-[2.75rem]">
            {title}
          </h1>
          {lede && (
            <p className="mt-4 text-lg leading-relaxed text-white/75">{lede}</p>
          )}
        </div>
      </div>
    </section>
  );
}
