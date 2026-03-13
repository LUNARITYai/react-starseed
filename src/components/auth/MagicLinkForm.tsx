import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/auth/auth-context";
import { magicLinkSchema, type MagicLinkValues } from "@/auth/schemas";
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

export function MagicLinkForm() {
  const { signInWithMagicLink } = useAuth();
  const [sent, setSent] = useState(false);

  const form = useForm<MagicLinkValues>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: MagicLinkValues) => {
    try {
      await signInWithMagicLink(values.email);
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
      <div className="text-center text-sm text-muted-foreground">
        <p>Check your email for a magic link to sign in.</p>
        <Button
          variant="link"
          className="mt-2 h-auto p-0"
          onClick={() => setSent(false)}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
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
          {form.formState.isSubmitting ? "Sending..." : "Send magic link"}
        </Button>
      </form>
    </Form>
  );
}
