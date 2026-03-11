import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_auth/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Forgot password</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
}
