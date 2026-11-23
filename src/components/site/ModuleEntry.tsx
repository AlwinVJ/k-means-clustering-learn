import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { NavTo } from "@/lib/site";

export function ModuleEntry({ n, title, time, to, compact }: { n: number; title: string; time: string; to: NavTo; compact?: boolean }) {
  return (
    <li className="group border-b first:border-t">
      <Link to={to} className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-6 md:grid-cols-[5rem_1fr_7rem_2rem] md:py-8">
        <span className="font-mono text-sm text-accent">{String(n).padStart(2, "0")}</span>
        <div>
          <h3 className="text-2xl leading-snug transition-colors group-hover:text-accent md:text-[1.75rem]">{title}</h3>
          {!compact && (
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Module summary to be written — a two-line description of what this module covers and why it matters.
            </p>
          )}
        </div>
        <span className="hidden font-mono text-xs text-muted-foreground md:block">{time}</span>
        <span className="flex items-center gap-2 text-sm">
          <span className="font-mono text-xs text-muted-foreground md:hidden">{time}</span>
          <ArrowUpRight size={18} className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-label={`Open ${title}`} />
        </span>
      </Link>
    </li>
  );
}
