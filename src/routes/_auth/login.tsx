import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/auth/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
