import { Button } from "../ui/button";
import { Bolt } from "lucide-react";

export default function EditPlanButton() {
  return (
    <Button
      variant={"ghost"}
      className="flex flex-row gap-2 hover:text-secondary"
    >
      <span>Edit trade</span> <Bolt className="icon w-2 h-2" />
    </Button>
  );
}
