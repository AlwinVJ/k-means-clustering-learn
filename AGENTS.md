# Project Rules

- Shared site UI lives in `src/components/site` (`primitives.tsx` holds `PageHeader`, `SectionHeading`, `Placeholder`, `MathBlock`, `CodeBlock`, `VizFrame`, `PrevNext`, `Breadcrumbs`) — reuse these so pages stay visually consistent.
- Nav items and learning modules are defined once in `src/lib/site.ts` — edit there, not per page.
- Maintain the warm editorial design system: Newsreader serif, IBM Plex Sans body, JetBrains Mono code, and earthy palette.
