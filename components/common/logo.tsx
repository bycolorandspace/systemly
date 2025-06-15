import { Navigation2 } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link href="/" className="flex items-center gap-1 font-bold">
        <div className="bg-transparent text-primary-foreground flex size-10 items-center justify-center rounded-md">
          <Navigation2 className="size-5 text-white" />
          {/* <GalleryVerticalEnd className="size-4" /> */}
        </div>
        Systemly.ai
      </Link>
    </div>
  );
}
