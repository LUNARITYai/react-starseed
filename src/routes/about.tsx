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
        single-page applications with Vite, TanStack Router, TanStack Query,
        Tailwind CSS 4, and shadcn/ui.
      </p>
    </div>
  );
}
