import { site } from "@/content/site";
import { PENDING } from "@/types/content";
import type { Service, ServiceFaq } from "@/types/content";

/**
 * Construtores de dados estruturados Schema.org (SEO).
 * Renderizados via <script type="application/ld+json"> nas páginas.
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Notary",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.legalName,
    url: site.url,
    telephone: "+55 17 3249-1499",
    email: site.email,
    foundingDate: String(site.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.number}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "BR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: site.hours.open,
      closes: site.hours.close,
    },
    ...(site.cnpj !== PENDING ? { taxID: site.cnpj } : {}),
  };
}

export function serviceJsonLd(service: Service, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: `${site.url}${path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: {
      "@type": "City",
      name: `${site.address.city} - ${site.address.state}`,
    },
  };
}

export function faqJsonLd(items: ServiceFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export interface Crumb {
  label: string;
  href: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `${site.url}${crumb.href}`,
    })),
  };
}

