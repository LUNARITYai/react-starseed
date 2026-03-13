import { createFileRoute } from "@tanstack/react-router";
import { APP_NAME, APP_TAGLINE } from "@/app.config";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const techStack = [
  { name: "React", href: "https://react.dev/learn" },
  {
    name: "TanStack Router",
    href: "https://tanstack.com/router/latest/docs/framework/react/overview",
  },
  {
    name: "TanStack Query",
    href: "https://tanstack.com/query/latest/docs/framework/react/overview",
  },
  { name: "Tailwind CSS", href: "https://tailwindcss.com/docs" },
  { name: "shadcn/ui", href: "https://ui.shadcn.com/docs" },
  { name: "Playwright", href: "https://playwright.dev/docs/intro" },
] as const;

function HomePage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {APP_NAME}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">{APP_TAGLINE}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Built with{" "}
          {techStack.map((tech, i) => (
            <span key={tech.name}>
              <a
                href={tech.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground"
              >
                {tech.name}
              </a>
              {i < techStack.length - 1 && " · "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
