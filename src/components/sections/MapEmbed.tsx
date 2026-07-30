"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/**
 * Mapa com padrão facade (ADR-006): o iframe do Google Maps (~1 MB) só é
 * carregado quando o usuário pede, preservando a performance da página.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={site.address.mapsEmbedUrl}
        title={`Mapa — ${site.address.full}`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="h-96 w-full rounded-2xl border border-line"
      />
    );
  }

  return (
    <div className="relative flex h-96 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-line bg-surface-2">
      {/* Grade decorativa de fundo sugerindo um mapa */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-navy-700/10"
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

      <span className="relative rounded-full bg-navy-700 p-3 text-white shadow-lg">
        <Icon name="mapPin" className="h-6 w-6" />
      </span>
      <p className="relative max-w-xs text-center text-sm text-ink-700">
        {site.address.full}
      </p>
      <div className="relative flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="rounded-lg bg-navy-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-600"
        >
          Carregar mapa interativo
        </button>
        <a
          href={site.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-0 px-4 py-2.5 text-sm font-medium text-navy-800 transition-colors hover:border-navy-600"
        >
          Abrir no Google Maps
          <Icon name="external" className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
