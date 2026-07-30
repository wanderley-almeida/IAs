"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    VLibras?: { Widget: new (url: string) => unknown };
  }
}

const PLUGIN_URL = "https://vlibras.gov.br/app/vlibras-plugin.js";

/**
 * VLibras: tradutor oficial de Libras do Governo Federal.
 *
 * A marcação abaixo é a integração padrão do plugin e precisa existir no
 * DOM antes da inicialização (foi essa a causa da falha anterior, em que o
 * container era criado no momento do clique). O script é carregado após a
 * montagem, em tempo ocioso, para não competir com o conteúdo principal;
 * o avatar 3D só é baixado quando o usuário abre o tradutor.
 */
export function VLibrasWidget() {
  useEffect(() => {
    if (document.querySelector(`script[src="${PLUGIN_URL}"]`)) return;

    let cancelled = false;

    const load = () => {
      if (cancelled) return;
      const script = document.createElement("script");
      script.src = PLUGIN_URL;
      script.async = true;
      script.onload = () => {
        if (window.VLibras) {
          new window.VLibras.Widget("https://vlibras.gov.br/app");
        }
      };
      document.body.appendChild(script);
    };

    // requestIdleCallback não existe em todos os navegadores (Safari antigo).
    const supportsIdle = "requestIdleCallback" in window;
    const handle = supportsIdle
      ? window.requestIdleCallback(load, { timeout: 3000 })
      : window.setTimeout(load, 1500);

    return () => {
      cancelled = true;
      if (supportsIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  // Atributos exigidos pelo plugin (não são atributos padrão do HTML).
  const container = { vw: "", className: "enabled" };
  const accessButton = { "vw-access-button": "", className: "active" };
  const pluginWrapper = { "vw-plugin-wrapper": "" };

  return (
    <div {...container}>
      <div {...accessButton} />
      <div {...pluginWrapper}>
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}
