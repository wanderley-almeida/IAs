import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  dark?: boolean;
  as?: "h1" | "h2" | "h3";
}

/** Cabeçalho de seção: eyebrow com filete dourado, título serifado e lede. */
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
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.18em]",
            align === "center" && "justify-center",
            dark ? "text-gold-400" : "text-gold-500",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-8",
              dark ? "bg-gold-400/70" : "bg-gold-500/60",
            )}
          />
          {eyebrow}
          {align === "center" && (
            <span aria-hidden="true" className="h-px w-8 bg-gold-500/60" />
          )}
        </p>
      )}
      <Heading
        className={cn(
          "font-display text-[2rem] leading-[1.15] font-medium tracking-[-0.01em] md:text-[2.6rem]",
          dark ? "text-white" : "text-heading",
        )}
      >
        {title}
      </Heading>
      {lede && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-white/70" : "text-ink-500",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
