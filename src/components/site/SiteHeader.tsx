import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { nav } from "@/lib/site";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="K-Means Lab home">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
        <circle cx="6" cy="7" r="2.2" className="fill-accent" />
        <circle cx="15" cy="5" r="1.6" className="fill-foreground" />
        <circle cx="13" cy="15" r="2.2" className="fill-c2" />
        <path d="M2 20 L20 2" className="stroke-border" strokeWidth="1" />
      </svg>
      <span className="font-serif text-xl tracking-tight">K-Means <em className="text-accent">Lab</em></span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: true }}
                  className="relative py-5 text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:after:absolute data-[status=active]:after:inset-x-0 data-[status=active]:after:-bottom-px data-[status=active]:after:h-px data-[status=active]:after:bg-accent"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="-mr-2 p-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t lg:hidden">
          <ul className="mx-auto max-w-[1360px] px-5 sm:px-8 py-2">
            {nav.map((n, i) => (
              <li key={n.to} className="border-b last:border-0">
                <Link
                  to={n.to}
                  activeOptions={{ exact: true }}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-3 text-foreground data-[status=active]:text-accent"
                >
                  <span className="font-mono text-xs text-muted-foreground">0{i}</span>
                  <span className="font-serif text-lg">{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
