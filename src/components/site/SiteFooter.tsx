import { Link } from "@tanstack/react-router";
import { nav } from "@/lib/site";
import { Logo } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-5 sm:px-8 lg:px-12 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            An open study of the K-Means clustering algorithm — from first intuition to working code.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Sections</p>
          <ul className="space-y-2 text-sm">
            {nav.slice(0, 3).map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-accent">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Reference</p>
          <ul className="space-y-2 text-sm">
            {nav.slice(3).map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-accent">{n.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-[1360px] justify-between px-5 sm:px-8 lg:px-12 py-5 font-mono text-xs text-muted-foreground">
          <span>K-Means Lab · Phase 1</span>
          <span>argmin Σ ‖x − μ‖²</span>
        </div>
      </div>
    </footer>
  );
}
