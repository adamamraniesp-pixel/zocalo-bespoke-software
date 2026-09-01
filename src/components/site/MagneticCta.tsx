import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useMagnetic } from "./motion";

type Props = {
  to: "/" | "/services" | "/what-we-build" | "/process" | "/why-zocalo" | "/contact";
  children: ReactNode;
  variant?: "primary" | "gold" | "ghost";
  size?: "default" | "compact";
  glow?: boolean;
  className?: string;
};

/**
 * Shared primary CTA. Layered shadow + 1px inner highlight for depth, a gold
 * arrow that slides on hover, and a gold hairline that draws in underneath.
 */
const variants: Record<string, string> = {
  primary:
    "bg-gradient-to-b from-primary to-[color-mix(in_oklab,var(--primary)_80%,black)] text-primary-foreground shadow-[inset_0_1px_0_color-mix(in_oklab,white_38%,transparent),0_1px_2px_color-mix(in_oklab,var(--primary)_28%,transparent),0_10px_26px_-14px_color-mix(in_oklab,var(--primary)_70%,transparent)] hover:shadow-[inset_0_1px_0_color-mix(in_oklab,white_46%,transparent),0_2px_4px_color-mix(in_oklab,var(--primary)_30%,transparent),0_20px_46px_-14px_color-mix(in_oklab,var(--primary)_78%,transparent),0_0_0_1px_color-mix(in_oklab,var(--primary)_45%,transparent)]",
  gold: "bg-gradient-to-b from-gold to-[color-mix(in_oklab,var(--gold)_78%,black)] text-gold-foreground shadow-[inset_0_1px_0_color-mix(in_oklab,white_40%,transparent),0_1px_2px_color-mix(in_oklab,var(--gold)_28%,transparent),0_12px_30px_-16px_color-mix(in_oklab,var(--gold)_72%,transparent)] hover:shadow-[inset_0_1px_0_color-mix(in_oklab,white_50%,transparent),0_2px_4px_color-mix(in_oklab,var(--gold)_32%,transparent),0_22px_50px_-14px_color-mix(in_oklab,var(--gold)_80%,transparent)]",
  ghost:
    "border border-border bg-background/60 text-foreground backdrop-blur shadow-[inset_0_1px_0_color-mix(in_oklab,white_60%,transparent)] hover:border-primary hover:shadow-[inset_0_1px_0_color-mix(in_oklab,white_70%,transparent),0_16px_40px_-18px_color-mix(in_oklab,var(--primary)_58%,transparent)]",
};

const sizes: Record<string, string> = {
  default: "px-9 py-4 text-[0.95rem]",
  compact: "px-6 py-2.5 text-sm",
};

export function MagneticCta({
  to,
  children,
  variant = "primary",
  size = "default",
  glow,
  className,
}: Props) {
  const magnetic = useMagnetic(0.26, 7);
  const arrowGold = variant !== "gold";

  return (
    <Link
      to={to}
      {...magnetic.handlers}
      style={magnetic.style}
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full font-medium tracking-[0.005em] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] ${
        sizes[size]
      } ${variants[variant]} ${glow ? "glow-pulse" : ""} ${className ?? ""}`}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight
        className={`relative z-10 size-4 transition-transform duration-300 ease-out group-hover:translate-x-1 ${
          arrowGold ? "text-gold" : ""
        }`}
        style={arrowGold ? { color: "var(--gold)" } : undefined}
      />
      {/* gold hairline draws in on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-5 bottom-[0.35rem] h-px origin-left scale-x-0 bg-gold/70 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </Link>
  );
}
