"use client";

/**
 * Fronteira de erro do layout raiz. Substitui todo o documento, por isso
 * repete <html> e <body> e não pode depender de componentes do layout.
 *
 * Mantém o mesmo princípio de fail secure: nenhuma informação técnica é
 * exposta ao usuário, apenas um identificador opaco para correlação.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#ffffff",
          color: "#3d4a5c",
        }}
      >
        <main>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.75rem",
              color: "#0f2a47",
              margin: "0 0 0.75rem",
            }}
          >
            Serviço temporariamente indisponível
          </h1>
          <p style={{ margin: "0 0 1.5rem", lineHeight: 1.7 }}>
            Não foi possível carregar o site. Tente novamente em instantes ou
            ligue para o cartório: (17) 3249-1499.
          </p>
          {error.digest && (
            <p style={{ fontSize: "0.75rem", color: "#61718a" }}>
              Código de referência: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "999px",
              border: "none",
              background: "#2e6fb5",
              color: "#fff",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Tentar novamente
          </button>
        </main>
      </body>
    </html>
  );
}
