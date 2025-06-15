"use client";

import TradePlanLeftCol from "@/components/trades/trade-plan-left-col";
import TradeHeader from "@/components/trades/trade-header";
import TradePlanRightCol from "@/components/trades/trade-plan-right-col";
import {
  BadgeCheck,
  CookingPot,
  Crosshair,
  // Skull,
  Wallet,
} from "lucide-react";
import React from "react";
import TradeResultsModule from "@/components/trades/trade-results-module";
import { useTradeModuleData } from "@/hooks/useTradeModuleData";
//import { calculateTradeMetrics } from "@/helpers/trade-calculator";
import { dummyData, userInput } from "@/data/dummy-data";
import SectionHeader from "@/components/common/section-header";
import TradeTechnicals from "@/components/trades/trade-technicals";
// import TradeAnalysisProgress from "@/components/trades/trade-analysis-progress";
import { useTradeAnalysisContext } from "@/contexts/trade-analysis-context";
import { formatCurrrencytoSymbol } from "@/helpers/format-currency";

export default function TradeDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let { validatedTradePlan, validatedUserInput } = useTradeAnalysisContext(); // Custom hook to manage trade plan state
  const { calulations } = useTradeModuleData(); // Custom hook to calculate trade metrics

  validatedTradePlan = dummyData;
  validatedUserInput = userInput;

  const TradeModuleData = [
    {
      icon: <Crosshair className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
      title: "Direction",
      value: `${validatedTradePlan ? validatedTradePlan.direction : "N/A"}`,
      description: `Entry ${
        validatedTradePlan ? validatedTradePlan.execution.entryZone.data : "N/A"
      }`,
    },
    {
      icon: <Wallet className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
      title: "PNL",
      value: `${formatCurrrencytoSymbol(validatedUserInput.accountCurrency)}${
        calulations?.success ? calulations.data.profits.total : 0
      }`, // ✅ Add $ sign
      description: `${
        calulations?.success
          ? `RR ${calulations.data.risk.riskRewardRatio}  •  ${
              calulations.data.pips.individual[
                calulations.data.pips.individual.length - 1
              ]
            } pips`
          : "RR N/A  •  Lot size N/A"
      }`, // ✅ Add % sign
    },
    {
      // <Skull className="w-6 h-6 text-secondary" strokeWidth={0.75} />
      icon: (
        <CookingPot className="w-6 h-6 text-secondary" strokeWidth={0.75} />
      ),
      title: "Max Loss",
      value: `${formatCurrrencytoSymbol(validatedUserInput.accountCurrency)}${
        calulations?.success ? calulations?.data.risk.totalRiskAmount : 0
      }`, // ✅ Add $ sign
      description: `Stop ${
        validatedTradePlan ? validatedTradePlan.execution.stopLoss.data : "N/A"
      }`,
    },
    {
      icon: (
        <BadgeCheck className="w-6 h-6 text-secondary" strokeWidth={0.75} />
      ),
      title: "Trade Quality Score",
      value: `${
        validatedTradePlan
          ? validatedTradePlan.technical.technicalSummary.score
          : "N/A"
      }`,
      description: `Confidence: ${
        validatedTradePlan ? `${validatedTradePlan.confidence}` : "N/A"
      }`,
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        <TradeHeader
          title={validatedTradePlan?.title}
          userInputs={validatedUserInput}
          pnl={calulations?.success ? calulations.data.profits.total : 0}
        />
        <div className="w-full my-8 space-y-6">
          <SectionHeader title="Snapshot" />
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
        </div>
        <div className="flex flex-col lg:flex-row mt-10 space-y-6">
          <div className="lg:w-3/5 mb-6 lg:mb-0  space-y-6">
            <SectionHeader title="Take action" />
            <TradePlanRightCol data={validatedTradePlan} />
          </div>
          <div className="lg:w-2/5 mb-6 lg:mb-0 lg:pl-8 space-y-6">
            <div className="space-y-6">
              <SectionHeader title="Analysis" />
              <TradePlanLeftCol data={validatedTradePlan} />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <SectionHeader title="Technicals" />
          <div>
            <TradeTechnicals data={validatedTradePlan} />
          </div>
        </div>
      </div>
    </>
  );
}
