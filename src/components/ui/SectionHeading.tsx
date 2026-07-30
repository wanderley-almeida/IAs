import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  dark?: boolean;
  as?: "h1" | "h2" | "h3";
}

/** Cabeçalho de seção: eyebrow dourado + título serifado + lede. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  dark = false,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-[0.8125rem] font-semibold uppercase tracking-[0.18em]",
            dark ? "text-gold-400" : "text-gold-500",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "font-display text-3xl leading-tight font-medium md:text-4xl",
          dark ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </Heading>
      {lede && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-white/75" : "text-ink-500",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
