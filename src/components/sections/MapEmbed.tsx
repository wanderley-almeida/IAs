"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/**
 * Mapa com padrão facade (ADR-006) e consentimento explícito.
 *
 * Segurança e privacidade:
 * - Nada do Google é carregado até o usuário pedir. Isso evita cookies e
 *   fingerprinting de terceiros na navegação comum (relevante para a LGPD,
 *   já que a página declara não usar rastreamento).
 * - O iframe roda em sandbox restrito: sem formulários, sem downloads, sem
 *   navegação do topo. `allow-same-origin` é necessário para o mapa
 *   funcionar e se aplica à origem do Google, não à nossa.
 * - `referrerPolicy="no-referrer"` impede que a URL da nossa página seja
 *   enviada ao terceiro.
 * - A CSP libera apenas as origens do Google Maps em `frame-src`.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={site.address.mapsEmbedUrl}
        title={`Mapa - ${site.address.full}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        className="h-96 w-full rounded-2xl border border-line"
      />
    );
  }

  return (
    <div className="relative flex h-96 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-line bg-surface-2 p-6">
      {/* Grade decorativa de fundo sugerindo um mapa */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-link/10"
      >
        <defs>
          <pattern
            id="map-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M48 0H0v48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
      </svg>

      <span className="relative rounded-full bg-action p-3 text-white shadow-lg">
        <Icon name="mapPin" className="h-6 w-6" />
      </span>
      <p className="relative max-w-xs text-center text-sm text-ink-700">
        {site.address.full}
      </p>
      <div className="relative flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="rounded-full bg-action px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-action-hover"
        >
          Carregar mapa interativo
        </button>
        <a
          href={site.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-0 px-4 py-2.5 text-sm font-medium text-heading-soft transition-colors hover:border-azure-500"
        >
          Abrir no Google Maps
          <Icon name="external" className="h-4 w-4" />
        </a>
      </div>
      <p className="relative max-w-sm text-center text-xs leading-relaxed text-ink-500">
        O mapa é fornecido pelo Google. Ao carregá-lo, seu navegador se conecta
        aos servidores do Google, que podem registrar dados de acesso.
      </p>
    </div>
  );
}
