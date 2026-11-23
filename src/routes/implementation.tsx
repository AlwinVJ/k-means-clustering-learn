import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock, Container, PageHeader, Placeholder, PrevNext, SectionHeading } from "@/components/site/primitives";

export const Route = createFileRoute("/implementation")({
  head: () => ({
    meta: [
      { title: "Practical Implementation — K-Means Lab" },
      { name: "description", content: "Code tutorials implementing K-Means from scratch, with NumPy and with scikit-learn." },
      { property: "og:title", content: "Practical Implementation — K-Means Lab" },
      { property: "og:description", content: "Code tutorials implementing K-Means from scratch, with NumPy and with scikit-learn." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const sections: { id: string; title: string }[] = [{id:"scratch",title:"Python from scratch"},{id:"numpy",title:"NumPy implementation"},{id:"sklearn",title:"scikit-learn implementation"},{id:"dataset",title:"Dataset exploration"},{id:"examples",title:"Code examples"},{id:"outputs",title:"Output visualisations"}];

function Page() {
  return (
    <>
      <PageHeader index="04" title="Practical Implementation" lede="Working code, in three registers: from first principles, vectorised, and production-ready." crumbs={[{ label: "Home", to: "/" }, { label: "Practical Implementation" }]} />
      <Container className="grid gap-12 py-16 lg:grid-cols-[13rem_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="eyebrow mb-4">On this page</p>
            <ol className="space-y-2 border-l text-sm">
              {sections.map((s, i) => (
                <li key={s.id}><a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-muted-foreground hover:border-accent hover:text-foreground">{i + 1}. {s.title}</a></li>
              ))}
            </ol>
          </div>
        </nav>
        <article className="max-w-3xl space-y-20">
          {sections.map((s, i) => (
            <section key={s.id} aria-labelledby={s.id}>
              <SectionHeading number={`04.${i + 1}`} title={s.title} id={s.id} />
              <div className="md:ml-24">
                <Placeholder label="Explanation" lines={4} className="border-0 border-l p-0 pl-5" />
                <CodeBlock filename={`${s.id}.py`} />
              </div>
            </section>
          ))}
        </article>
      </Container>
      <PrevNext prev={{ to: "/mathematics", label: "Mathematics" }} next={{ to: "/evaluation", label: "implementation.tsx0" }} />
    </>
  );
}
