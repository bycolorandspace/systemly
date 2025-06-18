import { AnalysisProps } from "@/types/trading/analysis";
import CopyPlanButton from "./copy-plan-button";

export default function TradeAnalysisListAlt({ list }: AnalysisProps) {
  return (
    <div className="border rounded-xl ">
      {/* Object.entries(list ?? ["No data"]).map(([key, item], index) => ( */}
      {Object.entries(list ?? ["No data"]).map(([key, item]) => (
        <div
          key={key}
          className="w-full flex flex-row justify-between items-center gap-1 not-last:border-b-1 pl-4 pr-2 py-2 m-0"
        >
          {item.title ? (
            <>
              <h3 className="font-medium text-secondary">{item.title}</h3>
              <div className="flex flex-row gap-1 items-center">
                <p>{item.data}</p>
                <CopyPlanButton
                  contentName={item.title}
                  title={item.title}
                  list={[item.data]}
                />
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
