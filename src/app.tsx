import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "./auth/auth-context";
import { authAdapter } from "./lib/auth-config";
import { queryClient } from "./lib/query-client";
import { routeTree } from "./routeTree.gen";
import type { AuthState } from "./auth/types";

const router = createRouter({
  routeTree,
  context: { auth: undefined! as AuthState },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();

  // Wait for session restoration before rendering routes
  // so that beforeLoad guards have accurate auth state
  if (auth.isLoading) return null;

  return <RouterProvider router={router} context={{ auth }} />;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider adapter={authAdapter}>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  );
}
