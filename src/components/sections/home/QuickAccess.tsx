import Link from "next/link";
import { popularServices, getServicePath } from "@/content/services";
import { serviceIcons } from "@/components/serviceIcons";
import { Icon } from "@/components/ui/Icon";

/**
 * Atalhos "mais procurados" flutuando sobre a emenda hero/conteúdo,
 * como uma bandeja de vidro que sai do painel escuro.
 */
export function QuickAccess() {
  return (
    <section aria-labelledby="quick-access-title" className="bg-surface-1">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative -mt-10 md:-mt-12">
          <div className="card rounded-3xl p-5 shadow-[0_24px_60px_rgba(8,21,39,0.18)] md:p-6">
            <h2
              id="quick-access-title"
              className="mb-4 flex items-center gap-3 text-[0.8125rem] font-semibold tracking-[0.16em] text-ink-500 uppercase"
            >
              Mais procurados
              <span className="hairline-gold flex-1" aria-hidden="true" />
            </h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {popularServices.map((service, i) => (
                <li
                  key={service.slug}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                >
                  <Link
                    href={getServicePath(service)}
                    className="group flex h-full flex-col gap-3 rounded-2xl border border-transparent bg-surface-1 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-400/40 hover:bg-surface-0 hover:shadow-md"
                  >
                    <span className="w-fit rounded-xl bg-action/10 p-2 text-link transition-colors group-hover:bg-action group-hover:text-white">
                      <Icon
                        name={serviceIcons[service.slug] ?? "document"}
                        className="h-5 w-5"
                      />
                    </span>
                    <span className="text-sm leading-snug font-medium text-heading">
                      {service.shortTitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
