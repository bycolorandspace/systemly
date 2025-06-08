"use client";

import { Loader } from "lucide-react";
import { Button } from "../../ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function SubmitButton() {
  const { loading } = useAuth();
  const hidden = loading ? "" : "hidden";

  return (
    <Button className="w-full rounded-full cursor-pointer" type="submit">
      <Loader className={`mr-2 size-4 animate-spin ${hidden}`} />
      {loading ? "Logging in..." : "Login"}
    </Button>
  );
}
