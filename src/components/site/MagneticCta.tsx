import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useMagnetic } from "./motion";

type Props = {
  to: "/" | "/services" | "/what-we-build" | "/process" | "/why-zocalo" | "/contact";
  children: ReactNode;
  variant?: "primary" | "gold" | "ghost";
  glow?: boolean;
  className?: string;
};

const variants: Record<string, string> = {
  primary:
    "rounded-full bg-gradient-to-b from-primary to-[color-mix(in_oklab,var(--primary)_82%,black)] px-7 py-3 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-14px_color-mix(in_oklab,var(--primary)_75%,transparent)] hover:scale-105 hover:shadow-[0_16px_40px_-14px_color-mix(in_oklab,var(--primary)_75%,transparent)]",
  gold: "rounded-full bg-gradient-to-b from-gold to-[color-mix(in_oklab,var(--gold)_82%,black)] px-8 py-3.5 text-sm font-medium text-gold-foreground shadow-[0_10px_28px_-16px_color-mix(in_oklab,var(--gold)_75%,transparent)] hover:scale-105 hover:shadow-[0_18px_44px_-14px_color-mix(in_oklab,var(--gold)_80%,transparent)]",
  ghost:
    "rounded-full border border-border bg-background/60 px-7 py-3 text-sm font-medium text-foreground backdrop-blur hover:scale-105 hover:border-primary hover:shadow-[0_14px_36px_-18px_color-mix(in_oklab,var(--primary)_60%,transparent)]",
};


export function MagneticCta({ to, children, variant = "primary", glow, className }: Props) {
  const magnetic = useMagnetic(0.26, 7);

  return (
    <Link
      to={to}
      {...magnetic.handlers}
      style={magnetic.style}
      className={`group inline-flex items-center gap-2 transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out ${
        variants[variant]
      } ${glow ? "glow-pulse" : ""} ${className ?? ""}`}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
    </Link>
  );
}
