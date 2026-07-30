import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/** Ramo de louro (metade do brasão). Espelhado para compor o par. */
function Laurel({ mirrored = false }: { mirrored?: boolean }) {
  const leaves: [number, number, number, number][] = [
    // [cx, cy, rotação, escala]
    [16.6, 43.4, -62, 1],
    [15.1, 39.2, -70, 1],
    [14.2, 34.9, -79, 1],
    [14.0, 30.6, -88, 1],
    [14.5, 26.8, -99, 1],
    [20.4, 42.2, -54, 0.72],
    [18.9, 38.0, -64, 0.72],
    [18.1, 33.6, -74, 0.72],
    [18.0, 29.4, -84, 0.72],
  ];

  return (
    <g
      transform={
        mirrored
          ? "translate(64,0) scale(-1,1) translate(-2.2,0)"
          : "translate(-2.2,0)"
      }
      fill="#CFA95E"
    >
      <path
        d="M19.8 46.6C15.4 40.6 14.4 33.4 16.4 26.6"
        fill="none"
        stroke="#CFA95E"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {leaves.map(([cx, cy, rot, scale]) => (
        <ellipse
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          rx={3.1 * scale}
          ry={1.45 * scale}
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      ))}
    </g>
  );
}

/**
 * Emblema institucional: versão vetorial do selo aprovado pelo cliente.
 * Composição fiel à arte de referência (docs/06-identidade-visual.md):
 * oval com anel duplo dourado e serrilha, campo navy, estrela superior,
 * ramos de louro flanqueando o monograma "CP" e bico de pena na base.
 * Em vetor, mantém nitidez de 16 px a impressão em grande formato.
 */
function Emblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {/* Anel externo e ornamentos */}
      <ellipse
        cx="32"
        cy="32"
        rx="26.4"
        ry="30.4"
        fill="none"
        stroke="#B08C3E"
        strokeWidth="1.7"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="23.9"
        ry="27.9"
        fill="none"
        stroke="#CFA95E"
        strokeWidth="0.8"
      />
      {/* Serrilha do selo */}
      <ellipse
        cx="32"
        cy="32"
        rx="22.2"
        ry="26.2"
        fill="none"
        stroke="#CFA95E"
        strokeWidth="1.1"
        strokeDasharray="0.5 2.6"
        strokeLinecap="round"
      />
      {/* Campo navy com filete interno */}
      <ellipse cx="32" cy="32" rx="21.2" ry="25.2" fill="#0F2643" />
      <ellipse
        cx="32"
        cy="32"
        rx="21.2"
        ry="25.2"
        fill="none"
        stroke="#CFA95E"
        strokeWidth="0.7"
      />

      {/* Fleurões nas extremidades do eixo vertical */}
      <path
        d="M32 0.6l1.5 2.2-1.5 2.2-1.5-2.2z"
        fill="#B08C3E"
      />
      <path
        d="M32 59l1.5 2.2-1.5 2.2-1.5-2.2z"
        fill="#B08C3E"
      />

      {/* Louros */}
      <Laurel />
      <Laurel mirrored />

      {/* Estrela de quatro pontas */}
      <path
        d="M32 11.4l1.15 3.15L36.3 15.7l-3.15 1.15L32 20l-1.15-3.15L27.7 15.7l3.15-1.15z"
        fill="#CFA95E"
      />

      {/* Monograma */}
      <text
        x="32"
        y="40.2"
        textAnchor="middle"
        fontFamily="var(--font-lora), Georgia, 'Times New Roman', serif"
        fontSize="19"
        fontWeight="600"
        fill="#CFA95E"
        letterSpacing="0.5"
      >
        CP
      </text>

      {/* Bico de pena */}
      <path
        d="M32 43.4c2.35 1.25 3.4 3 3.4 4.85L32 51.9l-3.4-3.65c0-1.85 1.05-3.6 3.4-4.85z"
        fill="#CFA95E"
      />
      <line
        x1="32"
        y1="45.7"
        x2="32"
        y2="49.7"
        stroke="#0F2643"
        strokeWidth="0.8"
      />
      <circle cx="32" cy="45.9" r="0.9" fill="#0F2643" />
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
      <Emblem className="h-12 w-12 shrink-0" />
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
