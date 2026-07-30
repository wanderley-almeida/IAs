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
      className="card card-hover group flex h-full flex-col p-6"
    >
      <span className="w-fit rounded-2xl bg-action/10 p-2.5 text-link transition-colors group-hover:bg-action group-hover:text-white">
        <Icon
          name={serviceIcons[service.slug] ?? "document"}
          className="h-6 w-6"
        />
      </span>
      <h3 className="mt-4 text-lg leading-snug font-semibold text-heading">
        {service.shortTitle}
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">
        {service.summary}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-link">
        Saiba mais
        <Icon
          name="arrowRight"
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
