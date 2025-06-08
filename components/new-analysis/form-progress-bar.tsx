import { useTradeAnalysisContext } from "@/contexts/trade-analysis-context";

export default function FormProgressBar() {
  const { stepIndex, totalSteps } = useTradeAnalysisContext();
  const progressPercentage = ((stepIndex + 1) / totalSteps) * 100; // Calculate the progress percentage
  return (
    <div className="w-full  h-[1px] bg-border">
      <span
        className="bg-white h-[1px] flex transition-all duration-300 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      ></span>
    </div>
  );
}
