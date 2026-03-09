import { createFileRoute } from "@tanstack/react-router";
import { SITE_NAME, SITE_TAGLINE } from "@/site.config";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        {SITE_NAME}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">{SITE_TAGLINE}</p>
    </div>
  );
}
