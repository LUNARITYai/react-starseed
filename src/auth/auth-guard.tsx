import { redirect } from "@tanstack/react-router";
import type { AuthState } from "./types";

/**
 * Use in `beforeLoad` of protected route layouts to redirect
 * unauthenticated users to the login page.
 */
export function requireAuth({
  context,
  location,
}: {
  context: { auth: AuthState };
  location: { href: string };
}) {
  if (!context.auth.isAuthenticated) {
    throw redirect({
      to: "/login",
      search: { redirect: location.href },
    });
  }
}

/**
 * Use in `beforeLoad` of auth route layouts (login, register, etc.)
 * to redirect authenticated users away.
 */
export function redirectIfAuthenticated({
  context,
}: {
  context: { auth: AuthState };
}) {
  if (context.auth.isAuthenticated) {
    throw redirect({ to: "/" });
  }
}
