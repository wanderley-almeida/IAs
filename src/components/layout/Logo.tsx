import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Logotipo provisório (ADR-008): emblema tipográfico "CP" com filete dourado.
 * Quando o cartório fornecer o logotipo oficial, substituir apenas este
 * componente.
 */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label={`${site.shortName} — página inicial`}
    >
      <svg
        viewBox="0 0 44 44"
        className="h-11 w-11 shrink-0"
        aria-hidden="true"
      >
        <rect
          x="1.5"
          y="1.5"
          width="41"
          height="41"
          rx="8"
          fill={dark ? "#16385E" : "#102A47"}
        />
        <rect
          x="4.5"
          y="4.5"
          width="35"
          height="35"
          rx="6"
          fill="none"
          stroke="#C9A55C"
          strokeWidth="1"
        />
        <text
          x="22"
          y="28.5"
          textAnchor="middle"
          fontFamily="var(--font-lora), Georgia, serif"
          fontSize="17"
          fontWeight="600"
          fill="#FFFFFF"
          letterSpacing="0.5"
        >
          CP
        </text>
      </svg>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display text-[1.0625rem] font-semibold tracking-tight",
            dark ? "text-white" : "text-navy-900",
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
