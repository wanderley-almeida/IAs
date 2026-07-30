import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-700 text-white hover:bg-navy-600 active:bg-navy-800 shadow-sm",
  secondary:
    "border border-line bg-surface-0 text-navy-800 hover:border-navy-600 hover:text-navy-600",
  ghost: "text-navy-700 hover:bg-surface-2",
  gold: "bg-gold-500 text-navy-950 hover:bg-gold-400 shadow-sm font-semibold",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-[0.9375rem] gap-2",
  lg: "px-6 py-3 text-base gap-2",
};

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}

/** Botão/link com aparência unificada. Com `href`, renderiza um Link. */
export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
