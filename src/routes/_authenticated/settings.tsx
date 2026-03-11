import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24">
      <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Account settings</CardTitle>
          <CardDescription>
            Manage your account preferences and configuration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Settings page — customize this for your application.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
