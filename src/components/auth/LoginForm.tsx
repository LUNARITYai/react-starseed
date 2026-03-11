import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useAuth } from "@/auth/auth-context";
import { loginSchema, type LoginValues } from "@/auth/schemas";
import { authConfig } from "@/lib/auth-config";
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
import { Separator } from "@/components/ui/separator";
import { OAuthButtons } from "./OAuthButtons";
import { MagicLinkForm } from "./MagicLinkForm";
import { PasskeyButton } from "./PasskeyButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LoginForm() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { redirect?: string };

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      await signIn(values.email, values.password);
      navigate({ to: search.redirect ?? "/" });
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  const hasAlternativeMethods =
    authConfig.enableOAuth ||
    authConfig.enableMagicLink ||
    authConfig.enablePasskeys;

  const showTabs = authConfig.enableMagicLink;

  const emailPasswordForm = (
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
                  placeholder="demo@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                {authConfig.enablePasswordReset && (
                  <Link
                    to="/forgot-password"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
          {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );

  return (
    <div className="grid gap-6">
      {showTabs ? (
        <Tabs defaultValue="password">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
          </TabsList>
          <TabsContent value="password">{emailPasswordForm}</TabsContent>
          <TabsContent value="magic-link">
            <MagicLinkForm />
          </TabsContent>
        </Tabs>
      ) : (
        emailPasswordForm
      )}

      {hasAlternativeMethods && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            {authConfig.enableOAuth && <OAuthButtons />}
            {authConfig.enablePasskeys && <PasskeyButton />}
          </div>
        </>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-foreground hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
