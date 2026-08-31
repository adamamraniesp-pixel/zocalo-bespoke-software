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
    "bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 text-sm font-medium rounded-md",
  gold: "bg-gold text-gold-foreground hover:bg-gold/90 px-7 py-3.5 text-sm font-medium rounded-md shadow-[0_10px_28px_-16px_color-mix(in_oklab,var(--gold)_70%,transparent)]",
  ghost: "text-muted-foreground hover:text-foreground text-sm",
};

export function MagneticCta({ to, children, variant = "primary", glow, className }: Props) {
  const magnetic = useMagnetic(0.26, 7);

  return (
    <Link
      to={to}
      {...magnetic.handlers}
      style={magnetic.style}
      className={`group inline-flex items-center gap-2 transition-colors duration-200 ease-out ${
        variants[variant]
      } ${glow ? "glow-pulse" : ""} ${className ?? ""}`}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
    </Link>
  );
}
