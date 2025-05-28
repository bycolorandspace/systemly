import { AnalysisProps } from "@/types/trading/analysis";
import { Copy } from "lucide-react";
import { Button } from "../ui/button";

export default function TradeAnalysisListAlt({ list }: AnalysisProps) {
  return (
    <div className="border rounded-xl ">
      {!Array.isArray(list) &&
        Object.entries(list ?? ["No data"]).map(([key, item]) => (
          <div
            key={key}
            className="w-full flex flex-row justify-between items-center gap-1 not-last:border-b-1 px-4 py-2 m-0"
          >
            {item.title ? (
              <>
                <h3 className="font-bold text-secondary">{item.title}</h3>
                <div className="flex flex-row gap-1 items-center">
                  <p>{item.description}</p>
                  <Button variant={"ghost"}>
                    <Copy className="icon text-secondary" />
                  </Button>
                </div>
              </>
            ) : (
              <span> No data available </span>
            )}
          </div>
        ))}
    </div>
  );
}
