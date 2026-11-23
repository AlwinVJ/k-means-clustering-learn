import { createFileRoute } from "@tanstack/react-router";
import { ModuleEntry } from "@/components/site/ModuleEntry";
import { Container, PageHeader, PrevNext } from "@/components/site/primitives";
import { modules } from "@/lib/site";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learning Path — K-Means Lab" },
      { name: "description", content: "Nine structured modules taking you from unsupervised learning to real-world K-Means applications." },
      { property: "og:title", content: "Learning Path — K-Means Lab" },
      { property: "og:description", content: "Nine structured modules taking you from unsupervised learning to real-world K-Means applications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Learn,
});

function Learn() {
  return (
    <>
      <PageHeader index="01" title="The Learning Path" lede="Nine modules, read in order. Each builds on the previous one." crumbs={[{ label: "Home", to: "/" }, { label: "Learning Path" }]}
        aside={<><p className="eyebrow mb-2">Total</p><p className="font-serif text-3xl text-foreground">~4 hrs</p><p className="mt-1">9 modules · self-paced</p></>} />
      <Container className="py-16"><ol className="md:ml-0">{modules.map((m) => <ModuleEntry key={m.n} {...m} />)}</ol></Container>
      <PrevNext prev={{ to: "/", label: "Home" }} next={{ to: "/explorer", label: "Algorithm Explorer" }} />
    </>
  );
}
