type Props = {
  size?: number;
  className?: string;
  title?: string;
};

/**
 * Zocalo icon mark: a geometric "Z" whose lower terminus resolves into two
 * interlocking rings, with a gold dot at the top-right terminus.
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
        cx="26"
        cy="42"
        r="11"
        fill="none"
        stroke="var(--secondary)"
        strokeWidth="4.5"
      />
      {/* Z stroke: top bar, diagonal, middle bar */}
      <path
        d="M20 13H45L19 34H38"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* front ring — accent blue, closing the form */}
      <circle
        cx="38"
        cy="42"
        r="11"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle cx="45.5" cy="13" r="3.4" fill="var(--gold)" />
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
