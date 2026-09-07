import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useMagnetic } from "./motion";

type Props = {
  to: "/" | "/loan-products" | "/how-it-works" | "/why-zocalo" | "/contact";
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: "default" | "compact";
  className?: string;
};

/**
 * Shared CTA. Flat solid or outline fills only — no gradients. Shadow appears
 * on hover only; gold is used purely as a micro-accent (arrow + hairline).
 */
const variants: Record<string, string> = {
  solid:
    "bg-navy text-white border border-[color-mix(in_oklab,var(--navy)_80%,black)] hover:bg-[color-mix(in_oklab,var(--navy)_92%,black)] hover:shadow-[0_16px_36px_-18px_color-mix(in_oklab,var(--navy)_55%,transparent)]",
  outline:
    "border border-border bg-transparent text-foreground hover:border-primary hover:shadow-[0_16px_36px_-20px_color-mix(in_oklab,var(--primary)_50%,transparent)]",
};

const sizes: Record<string, string> = {
  default: "px-9 py-4 text-[0.95rem]",
  compact: "px-6 py-2.5 text-sm",
};

export function MagneticCta({
  to,
  children,
  variant = "solid",
  size = "default",
  className,
}: Props) {
  const magnetic = useMagnetic(0.26, 7);

  return (
    <Link
      to={to}
      {...magnetic.handlers}
      style={magnetic.style}
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-md font-medium tracking-[0.005em] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:scale-[0.99] ${
        sizes[size]
      } ${variants[variant]} ${className ?? ""}`}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight
        className="relative z-10 size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
        style={{ color: "var(--gold)" }}
      />
      {/* gold hairline draws in on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-4 bottom-[0.3rem] h-px origin-left scale-x-0 bg-gold/70 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </Link>
  );
}
