import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/auth/auth-context";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/auth/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function ForgotPasswordForm() {
  const { resetPasswordRequest } = useAuth();
  const [sent, setSent] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    try {
      await resetPasswordRequest(values.email);
      setSent(true);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  if (sent) {
    return (
      <div className="grid gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          If an account exists with that email, we&apos;ve sent a password reset
          link. Check your inbox.
        </p>
        <Link
          to="/login"
          className="text-sm font-medium text-foreground hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link
          to="/login"
          className="font-medium text-foreground hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
