import Link from "next/link";
import type { Service } from "@/types/content";
import { getServicePath } from "@/content/services";
import { serviceIcons } from "@/components/serviceIcons";
import { Icon } from "@/components/ui/Icon";

export function ServiceCard({
  service,
  delay = 0,
}: {
  service: Service;
  delay?: number;
}) {
  return (
    <Link
      href={getServicePath(service)}
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface-0 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-navy-600/40 hover:shadow-lg"
    >
      <span className="w-fit rounded-xl bg-navy-700/[0.08] p-2.5 text-navy-700 transition-colors group-hover:bg-navy-700 group-hover:text-white">
        <Icon
          name={serviceIcons[service.slug] ?? "document"}
          className="h-6 w-6"
        />
      </span>
      <h3 className="mt-4 text-lg leading-snug font-semibold text-navy-900">
        {service.shortTitle}
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
        {service.summary}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-navy-700">
        Saiba mais
        <Icon
          name="arrowRight"
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
