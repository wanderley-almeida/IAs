/**
 * Política de segurança de cabeçalhos HTTP.
 *
 * Este site é estático (SSG), sem backend, banco de dados, autenticação ou
 * upload. A defesa se concentra, portanto, na camada de entrega: restringir
 * o que o navegador aceita executar, carregar e revelar.
 *
 * Ver docs/07-auditoria-seguranca.md para o racional completo de cada
 * diretiva, as medições que embasaram as escolhas e os riscos aceitos.
 */

/** Origem do mapa, carregado sob demanda pelo usuário (padrão facade). */
const MAPS_ORIGIN = "https://www.google.com https://maps.google.com";

/**
 * Decisão sobre `script-src` (medida empiricamente, não presumida):
 *
 * O App Router injeta a carga RSC em scripts inline cujo conteúdo varia por
 * página. Três caminhos foram avaliados:
 *
 * 1. Hash do nosso script + 'unsafe-inline': INVÁLIDO. Por especificação, a
 *    presença de qualquer hash faz o navegador ignorar 'unsafe-inline', o que
 *    bloqueia os scripts do Next e derruba a hidratação (verificado em
 *    navegador: 35 violações, site não interativo).
 * 2. Hash de todos os scripts inline: INVIÁVEL. Medição no build: 430 hashes
 *    distintos, cerca de 23 KB de cabeçalho, acima do limite prático de 8 KB.
 *    Por rota seria possível, mas qualquer edição de conteúdo alteraria os
 *    hashes e quebraria o site silenciosamente.
 * 3. Nonce por requisição: exige renderização dinâmica (documentação oficial
 *    do Next), eliminando SSG e cache de CDN.
 *
 * Escolha: 'unsafe-inline' sem hash, com controles compensatórios:
 * - nenhum conteúdo de usuário é persistido ou renderizado;
 * - todo o conteúdo vem de módulos TypeScript compilados;
 * - nenhum script de terceiros é carregado;
 * - `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` e
 *   `frame-ancestors 'none'` fecham os vetores de escalonamento clássicos.
 *
 * Revisar esta decisão quando o site passar a ter backend, área autenticada
 * ou qualquer renderização dinâmica: nesse cenário, adotar nonce via proxy.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  // Tailwind e estilos inline do React exigem 'unsafe-inline' em style-src.
  // Não há execução de código: o abuso possível é exfiltração via CSS,
  // contida por connect-src e img-src restritos.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  // Fontes são self-hosted pelo next/font; nenhuma origem externa.
  "font-src 'self'",
  "connect-src 'self'",
  `frame-src ${MAPS_ORIGIN}`,
  "media-src 'none'",
  "object-src 'none'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

export const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: csp,
  },
  {
    // Força HTTPS por 2 anos, incluindo subdomínios. `preload` permite
    // inscrição na lista do navegador após o domínio definitivo entrar no ar.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Redundante com frame-ancestors, mantido para navegadores legados.
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Envia origem apenas em navegação same-origin; para terceiros, nada.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Nega por padrão todo recurso sensível: o site não usa nenhum deles.
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "usb=()",
      "xr-spatial-tracking=()",
      "browsing-topics=()",
      "interest-cohort=()",
    ].join(", "),
  },
  {
    // Impede que outros sites embutam nossos recursos.
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    // Isola o contexto de navegação (proteção contra XS-Leaks e tabnabbing).
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    // credentialless (e não require-corp) porque o iframe do mapa é
    // cross-origin e não envia CORP; credentialless preserva o isolamento
    // sem quebrar o recurso.
    key: "Cross-Origin-Embedder-Policy",
    value: "credentialless",
  },
  {
    // Isolamento de agente por origem (mitiga XS-Leaks entre subdomínios).
    key: "Origin-Agent-Cluster",
    value: "?1",
  },
  {
    // Evita vazamento de navegação para resolvedores DNS de terceiros.
    key: "X-DNS-Prefetch-Control",
    value: "off",
  },
];
