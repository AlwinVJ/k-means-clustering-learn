import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import katex from "katex";
import { useMemo, type ReactNode } from "react";
import type { NavTo } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-[1360px] w-full px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

export function Breadcrumbs({ items }: { items: { label: string; to?: NavTo }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {it.to ? (
              <Link to={it.to} className="hover:text-foreground">{it.label}</Link>
            ) : (
              <span aria-current="page" className="text-foreground">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  index, title, lede, crumbs, aside,
}: {
  index: string; title: ReactNode; lede: ReactNode; crumbs: { label: string; to?: NavTo }[]; aside?: ReactNode;
}) {
  return (
    <header className="border-b">
      <Container className="pt-10 pb-14 md:pt-14 md:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_17rem] md:items-end">
          <div>
            <p className="eyebrow mb-5"><span className="text-accent">§ {index}</span></p>
            <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-[2.75rem] lg:text-[3.25rem] leading-[1.08]">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg sm:text-xl lg:text-[1.25rem] leading-[1.65] text-muted-foreground">{lede}</p>
          </div>
          {aside && <div className="border-l pl-6 text-sm sm:text-[15px] leading-relaxed text-muted-foreground">{aside}</div>}
        </div>
      </Container>
    </header>
  );
}

export function SectionHeading({ number, title, kicker, id }: { number?: string; title: string; kicker?: string; id?: string }) {
  return (
    <div className="mb-8 grid gap-2 md:grid-cols-[5rem_1fr] lg:grid-cols-[6rem_1fr]">
      <span className="pt-2 font-mono text-sm sm:text-base text-accent">{number}</span>
      <div>
        {kicker && <p className="eyebrow mb-2">{kicker}</p>}
        <h2 id={id} className="scroll-mt-24 text-3xl sm:text-[2rem] md:text-[2.25rem] leading-tight font-serif text-foreground">{title}</h2>
      </div>
    </div>
  );
}

/** Marks a slot reserved for future content. */
export function Placeholder({ label, lines = 3, className }: { label: string; lines?: number; className?: string }) {
  return (
    <div className={cn("border border-dashed p-5", className)} role="note" aria-label={`Placeholder: ${label}`}>
      <p className="eyebrow mb-4">Reserved · {label}</p>
      <div className="space-y-2.5" aria-hidden>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-2 rounded-full bg-muted" style={{ width: `${92 - ((i * 17) % 40)}%` }} />
        ))}
      </div>
    </div>
  );
}

export function InlineMath({ math, className }: { math: string; className?: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, { displayMode: false, throwOnError: false });
    } catch {
      return math;
    }
  }, [math]);

  return (
    <span
      className={cn("inline-math font-serif align-baseline", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function BlockMath({ math, className }: { math: string; className?: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, { displayMode: true, throwOnError: false });
    } catch {
      return math;
    }
  }, [math]);

  return (
    <div
      className={cn("overflow-x-auto overflow-y-hidden max-w-full py-1 text-center font-serif text-xl sm:text-2xl text-foreground", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function MathBlock({
  label,
  number,
  math,
  children,
}: {
  label: string;
  number?: string;
  math?: string;
  children?: ReactNode;
}) {
  const html = useMemo(() => {
    if (!math) return null;
    try {
      return katex.renderToString(math, { displayMode: true, throwOnError: false });
    } catch {
      return null;
    }
  }, [math]);

  return (
    <figure className="my-10 border-y py-9">
      <div className="flex items-center gap-6">
        <div className="flex-1 text-center font-serif text-2xl sm:text-[1.75rem] md:text-[1.875rem] text-foreground leading-normal overflow-x-auto max-w-full py-1">
          {html ? (
            <div dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            children ?? <span className="text-muted-foreground/60 not-italic font-mono text-sm">[ equation · {label} ]</span>
          )}
        </div>
        {number && <span className="font-mono text-xs sm:text-sm text-muted-foreground shrink-0">({number})</span>}
      </div>
      <figcaption className="mt-5 text-center eyebrow">{label}</figcaption>
    </figure>
  );
}

export function CodeBlock({ filename, lang = "python", code }: { filename: string; lang?: string; code?: string }) {
  return (
    <figure className="my-8 overflow-hidden rounded-md border bg-foreground text-background">
      <figcaption className="flex items-center justify-between border-b border-background/15 px-5 py-3 font-mono text-xs sm:text-sm">
        <span className="font-medium">{filename}</span>
        <span className="text-background/50 uppercase text-[11px]">{lang}</span>
      </figcaption>
      <pre className="overflow-x-auto p-5 sm:p-6 font-mono text-[13.5px] sm:text-[14.5px] leading-6 sm:leading-7">
        <code>{code ?? "# Code example will appear here in a later phase.\n#\n# ...\n"}</code>
      </pre>
    </figure>
  );
}

export function VizFrame({ title, children, toolbar, className }: { title: string; children: ReactNode; toolbar?: ReactNode; className?: string }) {
  return (
    <figure className={cn("border bg-paper", className)}>
      <div className="flex items-center justify-between border-b px-4 py-2.5">
        <figcaption className="eyebrow">{title}</figcaption>
        {toolbar}
      </div>
      {children}
    </figure>
  );
}

export function PrevNext({ prev, next }: { prev?: { to: NavTo; label: string }; next?: { to: NavTo; label: string } }) {
  return (
    <Container className="mt-24">
      <nav aria-label="Pagination" className="grid border-y sm:grid-cols-2">
        {prev ? (
          <Link to={prev.to} className="group flex flex-col gap-2 py-6 sm:pr-6 hover:text-accent">
            <span className="eyebrow flex items-center gap-2"><ArrowLeft size={12} /> Previous</span>
            <span className="font-serif text-2xl">{prev.label}</span>
          </Link>
        ) : <span />}
        {next && (
          <Link to={next.to} className="group flex flex-col items-end gap-2 border-t py-6 text-right sm:border-t-0 sm:border-l sm:pl-6 hover:text-accent">
            <span className="eyebrow flex items-center gap-2">Next <ArrowRight size={12} /></span>
            <span className="font-serif text-2xl">{next.label}</span>
          </Link>
        )}
      </nav>
    </Container>
  );
}
