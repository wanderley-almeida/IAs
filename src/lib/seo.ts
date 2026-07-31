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

/**
 * Serializa JSON-LD para injeção segura em <script>.
 *
 * Defesa em profundidade: embora todo o conteúdo estruturado venha de
 * módulos compilados (nunca de entrada de usuário), a serialização escapa
 * os caracteres capazes de encerrar o bloco de script ou de quebrar o
 * parser JavaScript, cobrindo o caso de uma futura fonte dinâmica.
 */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    // Separadores de linha Unicode quebram o parser JavaScript.
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
