import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/jsonld";

/**
 * Trilha de navegação com Schema.org BreadcrumbList.
 * O primeiro item ("Início") é implícito; o último é a página atual.
 */
export function Breadcrumbs({
  crumbs,
  dark = false,
}: {
  crumbs: Crumb[];
  dark?: boolean;
}) {
  const all: Crumb[] = [{ label: "Início", href: "/" }, ...crumbs];
  const base = dark ? "text-white/65" : "text-ink-500";
  const link = dark ? "hover:text-white" : "hover:text-link";
  const current = dark ? "text-white" : "text-heading";

  return (
    <nav aria-label="Trilha de navegação" className={`text-sm ${base}`}>
      <JsonLd data={breadcrumbJsonLd(all)} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((crumb, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <Icon name="chevronRight" className="h-3.5 w-3.5 opacity-60" />
              )}
              {isLast ? (
                <span aria-current="page" className={`font-medium ${current}`}>
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className={`transition-colors ${link}`}>
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
