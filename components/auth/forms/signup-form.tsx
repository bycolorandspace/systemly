"use client";

import { Input } from "@/components/ui/input";
import { LoginViaGoogleButton } from "../buttons/login-buttons";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "../buttons/submit-button";

import Link from "next/link";
import { Card } from "@/components/ui/card";

export function SignUpForm() {
  const { control } = useFormContext();

  return (
    <Card className="space-y-2 w-full bg-transparent border border-border p-6">
      <FormField
        control={control}
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
        control={control}
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
    </Card>
  );
}
