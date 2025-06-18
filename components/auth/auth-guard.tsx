"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UniversalPageLoader from "../common/universal-page-loader";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <UniversalPageLoader />;
  }

  if (!user) {
    return <UniversalPageLoader />;
  }
  // If user is authenticated, render the children components
  return <>{children}</>;
}
