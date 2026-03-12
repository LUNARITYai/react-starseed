import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24">
      <h1 className="text-4xl font-bold tracking-tight">About</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        <span className="font-bold text-foreground">React Starseed</span> is a
        starter template for building modern React single-page applications.
      </p>
      <ul className="mt-6 space-y-3 text-muted-foreground">
        <li>
          <a
            href="https://react.dev/learn"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-foreground underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground/80"
          >
            React 19
          </a>{" "}
          — Component-based UI library with hooks and server-friendly
          architecture
        </li>
        <li>
          <a
            href="https://vite.dev/guide/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-foreground underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground/80"
          >
            Vite 6
          </a>{" "}
          — Lightning-fast build tool with HMR and optimized production bundles
        </li>
        <li>
          <a
            href="https://tanstack.com/router/latest/docs/framework/react/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-foreground underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground/80"
          >
            TanStack Router
          </a>{" "}
          — Type-safe file-based routing with built-in search params validation
        </li>
        <li>
          <a
            href="https://tanstack.com/query/latest/docs/framework/react/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-foreground underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground/80"
          >
            TanStack Query
          </a>{" "}
          — Async state management with caching, refetching, and mutations
        </li>
        <li>
          <a
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-foreground underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground/80"
          >
            Tailwind CSS 4
          </a>{" "}
          — Utility-first CSS framework with OKLCh design tokens
        </li>
        <li>
          <a
            href="https://ui.shadcn.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-foreground underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground/80"
          >
            shadcn/ui
          </a>{" "}
          — Accessible, composable UI primitives built on Radix
        </li>
        <li>
          <a
            href="https://playwright.dev/docs/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-foreground underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground/80"
          >
            Playwright
          </a>{" "}
          — Cross-browser end-to-end testing framework
        </li>
      </ul>
    </div>
  );
}
