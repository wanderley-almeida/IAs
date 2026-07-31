"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Fronteira de erro das rotas (fail secure).
 *
 * Nunca expõe mensagem de exceção, pilha ou detalhe de infraestrutura ao
 * usuário: apenas um identificador opaco (digest) que permite correlacionar
 * o caso com os logs do servidor sem revelar nada sobre o sistema.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Em produção, encaminhar para o coletor de logs quando houver um.
    // Nunca registrar dados pessoais nem conteúdo de formulário.
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <section className="bg-surface-0">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center sm:px-6">
        <span className="inline-flex rounded-2xl bg-warning/10 p-3 text-warning">
          <Icon name="alert" className="h-7 w-7" />
        </span>
        <h1 className="font-display mt-5 text-3xl font-medium text-heading">
          Algo não saiu como esperado
        </h1>
        <p className="mt-4 max-w-md text-lg text-ink-500">
          Tivemos um problema ao exibir esta página. Você pode tentar de novo
          ou falar diretamente com o cartório.
        </p>
        {error.digest && (
          <p className="mt-3 text-xs text-ink-500">
            Código de referência: <code>{error.digest}</code>
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} variant="primary" size="lg">
            Tentar novamente
          </Button>
          <Button href={site.phoneHref} variant="secondary" size="lg">
            <Icon name="phone" className="h-4.5 w-4.5" />
            {site.phone}
          </Button>
        </div>
        <Link
          href="/"
          className="mt-8 text-sm font-medium text-link underline underline-offset-2"
        >
          Voltar para o início
        </Link>
      </div>
    </section>
  );
}
