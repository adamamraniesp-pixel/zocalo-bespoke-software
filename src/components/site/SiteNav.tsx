import { useEffect, useState } from "react";
import { ZocaloLogo } from "./ZocaloLogo";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "What We Build" },
  { href: "#process", label: "Process" },
  { href: "#why", label: "Why Zócalo" },
];

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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-x flex h-16 items-center justify-between px-6 md:h-[4.5rem] md:px-10"
      >
        <a href="#top" className="rounded-sm" aria-label="Zócalo home">
          <ZocaloLogo />
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="rounded-md border border-border-strong px-4 py-2 text-sm text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
        >
          Book a Consultation
        </a>
      </nav>
    </header>
  );
}
