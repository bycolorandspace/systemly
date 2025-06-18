import { BadgeCheck, Crosshair, Skull, Wallet } from "lucide-react";
import TradeResultsModule from "../trade-results-module";
import { formatCurrrencytoSymbol } from "@/helpers/format-currency";
import { TradePlan, UserInputs } from "@/types/trading/analysis";
import { useEffect } from "react";
import { useTradeModuleData } from "@/hooks/useTradeModuleData";

export default function TradeSnapshot({
  analysis,
  userInputs,
}: {
  analysis: TradePlan;
  // calulations: CalculationResult;
  userInputs: UserInputs;
}) {
  const { calculateMetrics, calulations } = useTradeModuleData();

  useEffect(() => {
    calculateMetrics(analysis, userInputs);
  }, [analysis, userInputs]);

  const TradeModuleData = [
    {
      icon: <Crosshair className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
      title: "Direction",
      value: `${analysis ? analysis.direction : "N/A"}`,
      description: `Entry ${
        analysis ? analysis.execution.entryZone.data : "N/A"
      }`,
    },
    {
      icon: <Wallet className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
      title: "PNL",
      value: `${
        userInputs ? formatCurrrencytoSymbol(userInputs.accountCurrency) : "$"
      }${calulations?.success ? calulations.data.profits.total.toFixed(2) : 0}`, // ✅ Add $ sign
      description: `${
        calulations?.success
          ? `RR ${
              calulations.data.risk.riskRewardRatio
            }  •  ${calulations.data.pips.total.toFixed(2)} pips`
          : "RR N/A  •  Lot size N/A"
      }`, // ✅ Add % sign
    },
    {
      // <Skull className="w-6 h-6 text-secondary" strokeWidth={0.75} />
      icon: <Skull className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
      title: "Max Loss",
      value: `${
        userInputs ? formatCurrrencytoSymbol(userInputs.accountCurrency) : "$"
      }${
        calulations?.success
          ? calulations?.data.risk.totalRiskAmount.toFixed(2)
          : 0
      }`, // ✅ Add $ sign
      description: `Stop ${
        analysis ? analysis.execution.stopLoss.data : "N/A"
      }`,
    },
    {
      icon: (
        <BadgeCheck className="w-6 h-6 text-secondary" strokeWidth={0.75} />
      ),
      title: "Trade Quality Score",
      value: `${analysis ? analysis.technical.technicalSummary.score : "N/A"}`,
      description: `Confidence: ${analysis ? `${analysis.confidence}` : "N/A"}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:flex-row  gap-4  justify-evenly w-full">
      {TradeModuleData.map((item, index) => (
        <TradeResultsModule
          key={index}
          icon={item.icon}
          title={item.title}
          value={item.value}
          description={item.description}
        />
      ))}
    </div>
  );
}
