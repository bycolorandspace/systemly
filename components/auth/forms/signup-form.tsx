"use client";

import { Input } from "@/components/ui/input";
import { LoginViaGoogleButton } from "../buttons/login-buttons";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpFormSchema as formSchema } from "@/schema/auth-schemas";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "../buttons/submit-button";
import { useAuth } from "@/contexts/auth-context";
import { SignUpData } from "@/types/auth/types";
import { toast } from "sonner";
import Link from "next/link";

export function SignUpForm() {
  const { signUp } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      // firstName: "",
      // lastName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data: SignUpData = {
      email: values.email,
      password: values.password,
    };

    console.log("Form submitted with values:", data);
    try {
      await signUp(data);
      console.log("Sign up successful:", data);
      toast.success("Sign up successful! Redirecting...");
    } catch (error) {
      console.error("Sign up failed:", error);
      toast.error(
        `Sign up failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      return;
    }
    console.log(data);
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-2 text-center mb-4">
        <h1 className="text-2xl font-bold"> Create your Systemly account</h1>
        <p className="text-primary text-md text-balance">
          One free trade per day & unlimited risk calculation, no credit card
          required.
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
                <FormDescription className="text-secondary flex flex-col gap-1 ">
                  <span>Mix of uppercase & lowercase letters</span>
                  <span>Minimum 7 characters long</span>
                  <span>Contain at least 1 number</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton />
          <div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t mb-4">
              <span className="bg-background text-secondary relative z-10 px-2 ">
                Or continue with
              </span>
            </div>

            <LoginViaGoogleButton />
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
