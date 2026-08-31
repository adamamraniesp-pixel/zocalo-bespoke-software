import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ZocaloLogo } from "./ZocaloLogo";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#industries", label: "Industries" },
  { href: "/#how-it-works", label: "Process" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-x flex h-16 items-center justify-between px-6 md:h-[4.5rem] md:px-10"
      >
        <Link to="/" className="rounded-sm text-foreground" aria-label="Zocalo home">
          <ZocaloLogo />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#book"
          className="amber-glow hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:inline-flex"
        >
          Book a free consultation
        </a>
      </nav>
    </header>
  );
}
