"use client";
import LogoutButton from "@/components/auth/buttons/logout-button";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to Systemly.ai</h1>
        {isAuthenticated ? (
          <div className="flex gap-4 flex-col items-center">
            <h2 className="text-lg">Hello, {user?.email}!</h2>
            <p className="text-md text-secondary mb-4">You are logged in.</p>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center">
            <p className="text-lg">Please log in to continue.</p>
            <Button
              className="mt-4 rounded-full cursor-pointer"
              onClick={() => {
                // Redirect to login page or handle login logic
                window.location.href = "/login";
              }}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
