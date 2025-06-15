import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { LoginViaGoogleButton } from "../buttons/login-buttons";
import SubmitButton from "../buttons/submit-button";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import { Card } from "@/components/ui/card";

export default function LoginForm() {
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
    </Card>
  );
}
