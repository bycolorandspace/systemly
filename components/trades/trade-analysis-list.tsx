import { AnalysisProps } from "@/types/trading/analysis";
import { X } from "lucide-react";
export default function TradeAnalysisList({ list }: AnalysisProps) {
  return (
    <div className="border rounded-xl ">
      {!Array.isArray(list)
        ? Object.entries(list ?? ["No data"]).map(([key, item]) => (
            <div
              key={key}
              className="w-full flex flex-col xl:justify-between xl:flex-row gap-2 not-last:border-b-1 px-4 py-4 m-0"
            >
              {item.title ? (
                <div className="flex flex-col justify-start">
                  <h3 className="tableLabel">{item.title}</h3>
                  <p className="tableData">{item.description}</p>
                </div>
              ) : (
                <span> No data available </span>
              )}
            </div>
          ))
        : list.map((items) => (
            <div
              key={items}
              className="w-full flex flex-row gap-2 not-last:border-b-1 px-4 py-4 m-0 justify-start items-center"
            >
              <X className="w-4 h-4 text-red-500" />
              <h3 className="font-bold">{items}</h3>
            </div>
          ))}
    </div>
  );
}
