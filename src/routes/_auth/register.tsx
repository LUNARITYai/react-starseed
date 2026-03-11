import { createFileRoute } from "@tanstack/react-router";
import { RegisterForm } from "@/components/auth/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>Get started with your new account</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
