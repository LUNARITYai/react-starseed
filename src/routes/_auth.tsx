import { createFileRoute, Outlet } from "@tanstack/react-router";
import { redirectIfAuthenticated } from "@/auth/auth-guard";
import { APP_NAME } from "@/app.config";

export const Route = createFileRoute("/_auth")({
  beforeLoad: redirectIfAuthenticated,
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">{APP_NAME}</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
