type Props = {
  size?: number;
  className?: string;
  title?: string;
};

/**
 * Zócalo icon mark: two interlocking ring shapes with a bold "Z" stroke
 * running through them, plus a gold dot at the top-right terminus.
 */
export function ZocaloMark({ size = 32, className, title = "Zócalo" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
    >
      <circle
        cx="24"
        cy="32"
        r="17"
        fill="none"
        stroke="var(--secondary)"
        strokeWidth="3"
        opacity="0.95"
      />
      <circle
        cx="40"
        cy="32"
        r="17"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3"
        opacity="0.55"
      />
      <path
        d="M19 22H45L19 42H45"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="47.5" cy="20" r="3.6" fill="var(--gold)" />
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
