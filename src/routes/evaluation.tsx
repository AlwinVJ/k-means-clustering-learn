import { createFileRoute } from "@tanstack/react-router";
import { Container, PageHeader, Placeholder, PrevNext, SectionHeading, VizFrame } from "@/components/site/primitives";

export const Route = createFileRoute("/evaluation")({
  head: () => ({
    meta: [
      { title: "Evaluation & Optimization — K-Means Lab" },
      { name: "description", content: "Elbow method, silhouette score, choosing K and the limitations of K-Means." },
      { property: "og:title", content: "Evaluation & Optimization — K-Means Lab" },
      { property: "og:description", content: "Elbow method, silhouette score, choosing K and the limitations of K-Means." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const sections: { id: string; title: string }[] = [{id:"elbow",title:"The Elbow Method"},{id:"silhouette",title:"Silhouette Score"},{id:"choosing-k",title:"Choosing the optimal K"},{id:"evaluation",title:"Cluster evaluation"},{id:"limitations",title:"Limitations of K-Means"}];

function Page() {
  return (
    <>
      <PageHeader index="05" title="Evaluation & Optimization" lede="How to judge a clustering — and when K-Means is the wrong tool." crumbs={[{ label: "Home", to: "/" }, { label: "Evaluation & Optimization" }]} />
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
              <SectionHeading number={`05.${i + 1}`} title={s.title} id={s.id} />
              <div className="md:ml-24">
                <Placeholder label="Explanation" lines={4} className="border-0 border-l p-0 pl-5" />
                <VizFrame title={`Figure · ${s.title}`} className="mt-8"><div className="placeholder-lines aspect-[16/7]" /></VizFrame>
              </div>
            </section>
          ))}
        </article>
      </Container>
      <PrevNext prev={{ to: "/implementation", label: "Implementation" }} next={{ to: "/learn", label: "evaluation.tsx0" }} />
    </>
  );
}
