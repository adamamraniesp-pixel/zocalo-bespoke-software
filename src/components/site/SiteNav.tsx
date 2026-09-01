import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import navMark from "@/assets/zocalo-mark.png.asset.json";
import { EASE } from "./motion";
import { useHeaderTheme } from "./HeaderTheme";
import { MagneticCta } from "./MagneticCta";

const links = [
  { to: "/services", label: "Services" },
  { to: "/what-we-build", label: "What We Build" },
  { to: "/process", label: "Process" },
  { to: "/why-zocalo", label: "Why Zocalo" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const { inFinalCta } = useHeaderTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const listRef = useRef<HTMLUListElement | null>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const headerBg = inFinalCta
    ? "border-transparent bg-transparent"
    : scrolled
      ? "border-b border-border bg-background/85 backdrop-blur-xl"
      : "border-b border-transparent";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const active = list.querySelector<HTMLElement>('[data-nav-active="true"]');
      if (!active) {
        setIndicator(null);
        return;
      }
      const parent = list.getBoundingClientRect();
      const rect = active.getBoundingClientRect();
      setIndicator({ left: rect.left - parent.left, width: rect.width });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[border-color,background-color] duration-500 ${headerBg}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
        style={{ opacity: inFinalCta ? 1 : 0 }}
      >
        <div className="final-cta-header-bg absolute inset-0 backdrop-blur-xl" />
      </div>
      <nav
        aria-label="Primary"
        className="container-x flex h-16 items-center justify-between px-6 md:h-[4.5rem] md:px-10"
      >
        <Link to="/" className="inline-flex items-center gap-2.5 rounded-sm" aria-label="Zocalo home">
          <img src={navMark.url} alt="" aria-hidden className="h-10 w-10 object-contain" />
          <span className="text-[1.25rem] font-medium tracking-[-0.02em] lowercase">zocalo</span>
        </Link>



        <ul ref={listRef} className="relative hidden items-center gap-9 md:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-nav-active={active ? "true" : "false"}
                  className={`block py-1 text-sm transition-colors duration-200 ease-out ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-1 h-px bg-primary"
            style={{
              left: indicator?.left ?? 0,
              width: indicator?.width ?? 0,
              opacity: indicator ? 1 : 0,
              transition: `left 420ms ${EASE}, width 420ms ${EASE}, opacity 220ms ease-out`,
            }}
          />
        </ul>

        <MagneticCta to="/contact" variant="gold" size="compact">
          Book a Consultation
        </MagneticCta>
      </nav>

      <div className="border-t border-border/60 px-6 pb-3 md:hidden">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 pt-2">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-xs text-muted-foreground transition-colors duration-200 ease-out"
                activeProps={{ className: "text-xs text-primary" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
