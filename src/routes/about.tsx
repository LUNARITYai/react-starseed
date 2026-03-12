import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24">
      <h1 className="text-4xl font-bold tracking-tight">About</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        React Starseed is a starter template for building modern React
        single-page applications with{" "}
        <a
          href="https://vite.dev/guide/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground"
        >
          Vite
        </a>
        ,{" "}
        <a
          href="https://tanstack.com/router/latest/docs/framework/react/overview"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground"
        >
          TanStack Router
        </a>
        ,{" "}
        <a
          href="https://tanstack.com/query/latest/docs/framework/react/overview"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground"
        >
          TanStack Query
        </a>
        ,{" "}
        <a
          href="https://tailwindcss.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground"
        >
          Tailwind CSS 4
        </a>
        , and{" "}
        <a
          href="https://ui.shadcn.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground"
        >
          shadcn/ui
        </a>
        .
      </p>
    </div>
  );
}
