type Props = {
  size?: number;
  className?: string;
  title?: string;
};

/**
 * Zocalo icon mark: a rounded accent-blue "Z" that resolves into an open loop,
 * overlapping a secondary-blue ring, with a gold dot at the top-right terminus.
 */
export function ZocaloMark({ size = 32, className, title = "Zocalo" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
    >
      {/* rear ring — secondary blue */}
      <circle
        cx="25"
        cy="41.5"
        r="10.5"
        fill="none"
        stroke="var(--secondary)"
        strokeWidth="5"
      />
      {/* Z stroke: top bar, diagonal, then open loop */}
      <path
        d="M17.5 13H40L20 34.5H24A9.6 9.6 0 1 1 21.4 48.4"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="13" r="3.3" fill="var(--gold)" />
    </svg>
  );
}


export function ZocaloLogo({ size = 30, className }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <ZocaloMark size={size} />
      <span className="text-[1.05rem] font-medium tracking-[-0.02em] lowercase">zocalo</span>
    </span>
  );
}
