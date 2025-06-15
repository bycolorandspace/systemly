"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpFormSchema as formSchema } from "@/schema/auth-schemas";

import { Form } from "@/components/ui/form";
import { useAuth } from "@/contexts/auth-context";
import { SignUpData } from "@/types/auth/types";
import { toast } from "sonner";
import { SignUpForm } from "./signup-form";
import FormHeader from "./form-header";
import { AuthServiceError } from "@/lib/authService";

export function SignUpFormLayout() {
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
      toast.success("Sign up successful! Redirecting...");
    } catch (error) {
      if (error instanceof AuthServiceError) {
        console.error("Sign up failed:", error);
        toast.error(`Sign up failed: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred during sign up.");
      }
      return;
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-2 text-center">
        <FormHeader
          title="Create your Systemly account"
          subTitle="One free trade per day, no credit card
          required."
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <SignUpForm />
        </form>
      </Form>
    </div>
  );
}
