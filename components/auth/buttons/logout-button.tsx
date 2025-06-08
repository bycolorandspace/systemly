"use client";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "../../ui/button";
import { Loader } from "lucide-react";

export default function LogoutButton() {
  const { logOut, loading } = useAuth();
  const hidden = loading ? "" : "hidden";
  return (
    <Button className="rounded-full cursor-pointer" onClick={logOut}>
      <Loader className={`mr-2 size-4 animate-spin ${hidden}`} />
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
}
