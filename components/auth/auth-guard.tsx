"use client";

import { useAuth } from "@/contexts/auth-context";
import { LoaderPinwheel } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderPinwheel className="size-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderPinwheel className="size-8 animate-spin" />
      </div>
    );
  }
  // If user is authenticated, render the children components
  return <>{children}</>;
}
