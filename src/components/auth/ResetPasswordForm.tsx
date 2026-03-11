import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearch } from "@tanstack/react-router";
import { useAuth } from "@/auth/auth-context";
import { resetPasswordSchema, type ResetPasswordValues } from "@/auth/schemas";
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

export function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const search = useSearch({ strict: false }) as { token?: string };
  const [done, setDone] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    const token = search.token;
    if (!token) {
      form.setError("root", { message: "Missing reset token" });
      return;
    }
    try {
      await resetPassword(token, values.password);
      setDone(true);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  if (done) {
    return (
      <div className="grid gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          Your password has been reset successfully.
        </p>
        <Link
          to="/login"
          className="text-sm font-medium text-foreground hover:underline"
        >
          Sign in with your new password
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
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
            {form.formState.isSubmitting ? "Resetting..." : "Reset password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
