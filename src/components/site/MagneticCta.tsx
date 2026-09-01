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
  primary: "bg-blue-600 text-white border border-white/20 hover:shadow-[0_8px_30px_rgb(59,130,246,0.4)]",
  gold: "bg-amber-500 text-white border border-white/20 hover:shadow-[0_8px_30px_rgb(245,158,11,0.4)]",
  ghost: "bg-transparent text-white border border-white/20 hover:bg-white/10",
};

const sizes: Record<string, string> = {
  default: "px-9 py-4 text-[0.95rem]",
  compact: "px-6 py-2.5 text-sm",
};

export function MagneticCta({ to, children, variant = "primary", size = "default", glow, className }: Props) {
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
