import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

export const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** True when the user asked for reduced motion. SSR-safe (false until hydrated). */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/* --------------------------- Scroll progress bar -------------------------- */

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / max)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-px">
      <div
        className="h-full origin-left bg-primary"
        style={{ transform: `scaleX(${progress})`, transition: "transform 120ms linear" }}
      />
    </div>
  );
}

/* ------------------------------ Scroll reveal ----------------------------- */

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  distance?: number;
  style?: CSSProperties;
};

export function Reveal({ children, delay = 0, className, as, distance = 16, style }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown || reduced ? "none" : `translateY(${distance}px)`,
        transition: reduced
          ? `opacity 400ms ease-out ${delay}ms`
          : `opacity 700ms ${EASE} ${delay}ms, transform 700ms ${EASE} ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* --------------------------- Word-stagger heading -------------------------- */

export function StaggerWords({
  text,
  className,
  stagger = 55,
  as,
}: {
  text: string;
  className?: string;
  stagger?: number;
  as?: ElementType;
}) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span
            className="inline-block"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown || reduced ? "none" : "translateY(0.7em)",
              transition: reduced
                ? `opacity 400ms ease-out ${i * 30}ms`
                : `opacity 620ms ${EASE} ${i * stagger}ms, transform 620ms ${EASE} ${i * stagger}ms`,
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------ Magnetic hover ---------------------------- */

/** Returns handlers + style for a small magnetic pull toward the cursor. */
export function useMagnetic(strength = 0.28, max = 7) {
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      setOffset({
        x: Math.max(-max, Math.min(max, dx * strength)),
        y: Math.max(-max, Math.min(max, dy * strength)),
      });
    },
    [reduced, strength, max],
  );

  const onMouseLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return {
    handlers: { onMouseMove, onMouseLeave, onBlur: onMouseLeave },
    style: {
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      transition: `transform 260ms ${EASE}`,
    } as CSSProperties,
  };
}

/* ---------------------------- Page transitions ---------------------------- */

export function PageTransition({ routeKey, children }: { routeKey: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = window.setTimeout(() => setVisible(true), 20);
    return () => window.clearTimeout(t);
  }, [routeKey]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible || reduced ? "none" : "translateY(10px)",
        transition: reduced
          ? "opacity 220ms ease-out"
          : `opacity 480ms ${EASE}, transform 480ms ${EASE}`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------- SVG draw-in reveal --------------------------- */

/**
 * Wraps an inline SVG and triggers a stroke-dashoffset draw-in the first time
 * it scrolls into view. Honours prefers-reduced-motion via CSS.
 */
export function DrawIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`draw-svg ${className ?? ""}`}
      data-drawn={drawn ? "true" : "false"}
      style={{ ["--draw-delay" as never]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
