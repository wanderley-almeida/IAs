import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security";

const nextConfig: NextConfig = {
  // Não revelar o framework em uso (reduz reconhecimento automatizado).
  poweredByHeader: false,

  // Impede que a URL canônica seja duplicada com/sem barra final.
  trailingSlash: false,

  // Falhar seguro: erro de tipo deve quebrar o build, nunca ser ignorado
  // silenciosamente em produção. (No App Router, Strict Mode do React já é
  // padrão desde a 13.5.1; o lint roda como passo próprio de CI.)
  typescript: { ignoreBuildErrors: false },

  // Não publicar source maps do cliente: evita expor a árvore de código.
  productionBrowserSourceMaps: false,

  async headers() {
    return [
      {
        // Aplica a todas as rotas, inclusive assets e páginas de erro.
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Arquivos com hash no nome são imutáveis: cache longo e seguro.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
