import { createFileRoute } from "@tanstack/react-router";
import { Container, MathBlock, PageHeader, Placeholder, PrevNext, SectionHeading } from "@/components/site/primitives";

export const Route = createFileRoute("/mathematics")({
  head: () => ({
    meta: [
      { title: "Mathematical Foundations — K-Means Lab" },
      { name: "description", content: "Euclidean distance, centroids, WCSS and the K-Means objective, presented like a textbook chapter." },
      { property: "og:title", content: "Mathematical Foundations — K-Means Lab" },
      { property: "og:description", content: "Euclidean distance, centroids, WCSS and the K-Means objective, presented like a textbook chapter." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const sections: { id: string; title: string }[] = [{id:"distance",title:"Euclidean distance"},{id:"centroid",title:"Centroid calculation"},{id:"wcss",title:"Within-Cluster Sum of Squares"},{id:"objective",title:"The K-Means objective"},{id:"notation",title:"Notation and derivations"}];

function Page() {
  return (
    <>
      <PageHeader index="03" title="Mathematical Foundations" lede="The formal machinery behind K-Means, set out as numbered definitions and derivations." crumbs={[{ label: "Home", to: "/" }, { label: "Mathematical Foundations" }]} />
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
              <SectionHeading number={`03.${i + 1}`} title={s.title} id={s.id} />
              <div className="md:ml-24">
                <Placeholder label="Explanation" lines={4} className="border-0 border-l p-0 pl-5" />
                <MathBlock label={s.title} number={`${i + 1}`} />
              </div>
            </section>
          ))}
        </article>
      </Container>
      <PrevNext prev={{ to: "/explorer", label: "Explorer" }} next={{ to: "/implementation", label: "mathematics.tsx0" }} />
    </>
  );
}
