import { APP_NAME, APP_AUTHOR, APP_AUTHOR_URL } from "@/app.config";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {APP_NAME}. Crafted with &hearts; by{" "}
        <a
          href={APP_AUTHOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:underline"
        >
          {APP_AUTHOR}
        </a>
      </div>
    </footer>
  );
}
