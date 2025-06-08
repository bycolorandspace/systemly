"use client";

import { Input } from "@/components/ui/input";
import { LoginViaGoogleButton } from "../buttons/login-buttons";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LogInFormSchema as formSchema } from "@/schema/auth-schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "../buttons/submit-button";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import Link from "next/link";

export function LoginForm() {
  const { logIn } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    try {
      await logIn(values.email, values.password);
      // Handle successful login, e.g., redirect to dashboard or show a success message
      console.log("Login successful:", values);
      // You can use a toast library to show a success message
      toast.success("Login successful! Redirecting...");
    } catch (error) {
      // Handle login error, e.g., show a toast notification
      console.error("Login failed:", error);
      // You can use a toast library to show an error message
      toast.error(
        `Login failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      return;
    }
    console.log(values);
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-2 text-center mb-4">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border-border"
                    placeholder="supertrader@example.com"
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
                <div className="flex w-full items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot?
                  </a>
                </div>

                <FormControl>
                  <Input
                    className="border-border"
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton />
          <div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t mb-4">
              <span className="bg-background text-muted-foreground relative z-10 px-2 ">
                Or continue with
              </span>
            </div>

            <LoginViaGoogleButton />
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
