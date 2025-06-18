import { LoaderPinwheel } from "lucide-react";

export default function UniversalPageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoaderPinwheel className="size-8 animate-spin" />
    </div>
  );
}
