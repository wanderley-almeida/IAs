import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Emblema oficial: interpretação vetorial flat do selo aprovado pelo cliente
 * (arte de referência gerada por IA, ver docs/06-identidade-visual.md).
 * Selo circular: anel dourado com serrilha, campo navy, estrela de quatro
 * pontas, monograma CP e bico de pena. Vetor puro: nítido em qualquer
 * tamanho, imprime em uma cor e funciona em fundo claro ou escuro.
 */
function Emblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {/* Anel externo */}
      <circle
        cx="24"
        cy="24"
        r="22.6"
        fill="none"
        stroke="#B08C3E"
        strokeWidth="1.4"
      />
      {/* Serrilha do selo */}
      <circle
        cx="24"
        cy="24"
        r="20.6"
        fill="none"
        stroke="#CFA95E"
        strokeWidth="0.9"
        strokeDasharray="0.4 2.4"
        strokeLinecap="round"
      />
      {/* Campo navy com filete interno */}
      <circle cx="24" cy="24" r="18.7" fill="#0F2643" />
      <circle
        cx="24"
        cy="24"
        r="18.7"
        fill="none"
        stroke="#CFA95E"
        strokeWidth="0.7"
      />
      {/* Estrela de quatro pontas */}
      <path
        d="M24 10.4l.85 2.35L27.2 13.6l-2.35.85L24 16.8l-.85-2.35-2.35-.85 2.35-.85z"
        fill="#CFA95E"
      />
      {/* Monograma */}
      <text
        x="24"
        y="28.6"
        textAnchor="middle"
        fontFamily="var(--font-fraunces), Georgia, 'Times New Roman', serif"
        fontSize="13"
        fontWeight="600"
        fill="#CFA95E"
        letterSpacing="0.6"
      >
        CP
      </text>
      {/* Bico de pena */}
      <path
        d="M24 31.2c2 1.05 2.9 2.5 2.9 4.1L24 38l-2.9-2.7c0-1.6.9-3.05 2.9-4.1z"
        fill="#CFA95E"
      />
      <line
        x1="24"
        y1="33.1"
        x2="24"
        y2="36.4"
        stroke="#0F2643"
        strokeWidth="0.7"
      />
      <circle cx="24" cy="33.2" r="0.75" fill="#0F2643" />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label={`${site.shortName} - página inicial`}
    >
      <Emblem className="h-11 w-11 shrink-0" />
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display text-[1.0625rem] font-semibold tracking-tight",
            dark ? "text-white" : "text-heading",
          )}
        >
          Cartório de Potirendaba
        </span>
        <span
          className={cn(
            "text-[0.6875rem] font-medium tracking-[0.14em] uppercase",
            dark ? "text-gold-400" : "text-gold-500",
          )}
        >
          Notas e Protesto · SP
        </span>
      </span>
    </Link>
  );
}
