import { CopyTradeData } from "@/helpers/copy-data";
import { Button } from "../ui/button";
import { AnalysisProps } from "@/types/trading/analysis";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export enum CopyButtonType {
  icon = "ICON",
  full = "FULL",
}

interface CopyHandlerProp extends AnalysisProps {
  contentName?: string;
  title: string;
  buttonType?: CopyButtonType;
  content?: string;
}

export default function CopyPlanButton({
  contentName,
  title,
  buttonType = CopyButtonType.icon,
  list,
}: CopyHandlerProp) {
  const CopyHandler = async () => {
    console.log("Copying trade data:", title, list);
    try {
      await CopyTradeData(title, list);
      toast.success("Copied to clipboard.");
    } catch (error) {
      console.error("Error copying trade data:", error);
      // Optionally, you can show a toast or alert here to inform the user
      toast.error(`Failed to copy trade data: ${error}`);
    }
  };

  switch (buttonType) {
    case CopyButtonType.icon:
      return (
        <Button
          onClick={CopyHandler}
          variant={"ghost"}
          className="flex flex-row gap-2 p-0 ml-1 cursor-pointer"
        >
          <Copy className="icon w-2 h-2 text-secondary hover:text-white" />
        </Button>
      );
      break;
    case CopyButtonType.full:
      return (
        <Button
          onClick={CopyHandler}
          variant={"outline"}
          className="flex flex-row gap-2 cursor-pointer hover:bg-card hover:border-card hover:text-secondary"
        >
          <span>Copy {contentName}</span> <Copy className="icon w-2 h-2" />
        </Button>
      );
      break;
    default:
      return (
        <Button
          onClick={CopyHandler}
          variant={"ghost"}
          className="flex flex-row gap-2 cursor-pointer"
        >
          <Copy className="icon w-2 h-2" />
        </Button>
      );
      break;
  }
}
