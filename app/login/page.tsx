import { LoginFormLayout } from "@/components/auth/forms/login-form-layout";
import Logo from "@/components/common/logo";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginFormLayout />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          // src="/images/ayefeh.png"
          src="/images/yasna.png"
          alt="Image"
          width={1674}
          height={2878}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
