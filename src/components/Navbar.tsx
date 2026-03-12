import { Link } from "@tanstack/react-router";
import { SITE_NAME } from "@/site.config";
import { useAuth } from "@/auth/auth-context";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./auth/UserMenu";
import { Button } from "./ui/button";

export function Navbar() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <nav className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-bold">
          {SITE_NAME}
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "text-foreground font-medium" }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "text-foreground font-medium" }}
          >
            About
          </Link>
          <ThemeToggle />
          {!isLoading &&
            (isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
            ))}
        </div>
      </div>
    </nav>
  );
}
