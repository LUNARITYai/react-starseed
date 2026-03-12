import { SITE_NAME, SITE_AUTHOR, SITE_AUTHOR_URL } from "@/site.config";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {SITE_NAME}. Crafted with &hearts; by{" "}
        <a
          href={SITE_AUTHOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:underline"
        >
          {SITE_AUTHOR}
        </a>
      </div>
    </footer>
  );
}
