import type { Metadata } from "next";
import { site } from "@/content/site";

/** Metadata padrão por página, com Open Graph e canonical. */
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.shortName}`,
      description,
      url: `${site.url}${path}`,
      siteName: site.name,
      locale: "pt_BR",
      type: "website",
    },
  };
}

/** Serializa JSON-LD com segurança para uso em <script>. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
