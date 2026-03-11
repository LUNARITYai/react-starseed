import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";
import type { AuthState } from "@/auth/types";

interface RouterContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
