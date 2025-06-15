"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LogInFormSchema as formSchema } from "@/schema/auth-schemas";

import { Form } from "@/components/ui/form";

import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import LoginForm from "./login-form";
import FormHeader from "./form-header";
import { AuthServiceError } from "@/lib/authService";

export function LoginFormLayout() {
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
      // Call the logIn function from the auth context
      await logIn(values.email, values.password);
      toast.success("Login successful!");
    } catch (error) {
      // Handle login error, e.g., show a toast notification
      console.error("Login failed:", error);
      if (error instanceof AuthServiceError) {
        toast.error(`Login failed: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred during login.");
      }
      return;
    }
    console.log(values);
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-2 text-center mb-4">
        <FormHeader
          title="Welcome back"
          subTitle="Enter your email below to login to your account"
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <LoginForm />
        </form>
      </Form>
    </div>
  );
}
