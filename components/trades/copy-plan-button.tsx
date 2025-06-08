import { CopyTradeData } from "@/helpers/copy-data";
import { Button } from "../ui/button";
import { AnalysisProps } from "@/types/trading/analysis";
import { Copy } from "lucide-react";

interface CopyHandlerProp extends AnalysisProps {
  contentName?: string;
  title: string;
}

export default function CopyPlanButton({
  contentName,
  title,
  list,
}: CopyHandlerProp) {
  const CopyHandler = async () => {
    CopyTradeData(title, list);
  };

  return (
    <Button
      onClick={CopyHandler}
      variant={"outline"}
      className="flex flex-row gap-2"
    >
      <span>Copy {contentName}</span> <Copy className="icon w-2 h-2" />
    </Button>
  );
}
