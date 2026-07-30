import Link from "next/link";
import { popularServices, getServicePath } from "@/content/services";
import { serviceIcons } from "@/components/serviceIcons";
import { Icon } from "@/components/ui/Icon";

/** Atalhos para os serviços mais procurados, logo abaixo do hero. */
export function QuickAccess() {
  return (
    <section aria-labelledby="quick-access-title" className="bg-surface-1">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2
          id="quick-access-title"
          data-reveal
          className="mb-6 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-ink-500"
        >
          Mais procurados
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
                className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface-0 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-600/50 hover:shadow-md"
              >
                <span className="w-fit rounded-lg bg-navy-700/[0.08] p-2 text-navy-700 transition-colors group-hover:bg-navy-700 group-hover:text-white">
                  <Icon
                    name={serviceIcons[service.slug] ?? "document"}
                    className="h-5 w-5"
                  />
                </span>
                <span className="text-sm leading-snug font-medium text-navy-900">
                  {service.shortTitle}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
