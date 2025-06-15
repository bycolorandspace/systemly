"use client";
import LogoutButton from "@/components/auth/buttons/logout-button";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import Router from "next/navigation";

// WE ARE BEHIND YOU.
// BE SAFE OUT THERE.
// GODSPEED, TRADER
// LOCK IN, YOUNG RENEGADE
// LIVE TO SEE ANOTHER DAY

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const router = Router.useRouter();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to Systemly.ai</h1>
        {isAuthenticated ? (
          <div className="flex gap-4 flex-col items-center">
            <h2 className="text-lg">Hello, {user?.email}!</h2>
            <p className="text-md text-secondary mb-4">You are logged in.</p>
            <div className="flex flex-col gap-1">
              <Button
                className="rounded-full cursor-pointer"
                onClick={() => {
                  // Redirect to analysis page or handle navigation logic
                  router.push("/analysis/new");
                }}
              >
                Start New Analysis
              </Button>
              <LogoutButton />
            </div>
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center gap-2">
            <p className="text-lg">Please log in to continue.</p>
            <div className="flex">
              <Button
                className="rounded-full cursor-pointer"
                onClick={() => {
                  // Redirect to login page or handle login logic
                  router.push("/login");
                }}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
