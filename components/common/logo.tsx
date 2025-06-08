import { Navigation2 } from "lucide-react";

export default function Logo() {
  return (
    <div>
      <a href="#" className="flex items-center gap-2 font-medium">
        <div className="bg-transparent text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <Navigation2 className="size-5 text-white" />
          {/* <GalleryVerticalEnd className="size-4" /> */}
        </div>
        Systemly.ai
      </a>
    </div>
  );
}
