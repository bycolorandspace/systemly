import { Button } from "../ui/button";
import { Copy } from "lucide-react";

export default function CopyPlanButton({
  contentName,
}: {
  contentName?: string;
}) {
  return (
    <Button variant={"outline"} className="flex flex-row gap-2">
      <span>Copy {contentName}</span> <Copy className="icon w-2 h-2" />
    </Button>
  );
}
