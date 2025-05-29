"use client";

import TradePlanLeftCol from "@/components/trades/trade-plan-left-col";
import TradeHeader from "@/components/trades/trade-header";
import TradePlanRightCol from "@/components/trades/trade-plan-right-col";
import { BadgeCheck, Crosshair, Skull, Wallet } from "lucide-react";
import React, { useState, useEffect } from "react";
import TradeResultsModule from "@/components/trades/trade-results-module";
import {
  AnalysisResponse,
  TradePlan,
  UserInputs,
} from "@/types/trading/analysis";
import { useTradeModuleData } from "@/hooks/useTradeModuleData";
import { dummyData, userInput } from "@/data/dummy-data";
//import { calculateTradeMetrics } from "@/helpers/trade-calculator";

export default function TradeDetail() {
  const [tradePlan, setTradePlan] = useState<TradePlan>(dummyData);
  const [userInfo, setUserInput] = useState<UserInputs>(userInput);
  const { metrics, setAccountSize, setRiskPerTrade } =
    useTradeModuleData(tradePlan);

  useEffect(() => {
    const stored = localStorage.getItem("currentTradePlan");

    if (stored && stored !== "null" && stored !== "undefined") {
      console.log("About to parse:", stored);
      try {
        const fullAnalysis: AnalysisResponse = JSON.parse(stored);
        setTradePlan(fullAnalysis.analysis);
        setUserInput(fullAnalysis.userInput);
        setAccountSize(fullAnalysis.userInput.accountSize);
        setRiskPerTrade(fullAnalysis.userInput.riskPerTrade);
      } catch (error) {
        console.error("Failed to parse stored data:", error);
        setTradePlan(dummyData);
        setUserInput(userInput);
        setAccountSize(userInput.accountSize);
        setRiskPerTrade(userInput.riskPerTrade);
      }
    } else {
      setTradePlan(dummyData);
      setUserInput(userInput);
      setAccountSize(userInput.accountSize);
      setRiskPerTrade(userInput.riskPerTrade);
    }
  }, []);

  const TradeModuleData = [
    {
      icon: <Crosshair className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
      title: "Direction",
      value: `${tradePlan ? tradePlan.execution.type.description : "N/A"}`,
      description: `Entry ${
        tradePlan ? tradePlan.execution.entryZone.description : "unknown"
      }`,
    },
    {
      icon: <Wallet className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
      title: "PNL",
      value: `$${metrics ? metrics.potentialProfit : 0}`, // ✅ Add $ sign
      description: `${
        metrics
          ? `+${metrics.accountIncrease}%  |  RR ${tradePlan.calculationData.riskRewardRatio}`
          : "PNL unknown"
      }`, // ✅ Add % sign
    },
    {
      icon: <Skull className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
      title: "Max Loss",
      value: `$${metrics ? metrics.potentialLoss : 0}`, // ✅ Add $ sign
      description: `Stop ${
        tradePlan ? tradePlan.execution.stopLoss.description : "unknown"
      }`,
    },
    {
      icon: (
        <BadgeCheck className="w-6 h-6 text-secondary" strokeWidth={0.75} />
      ),
      title: "Trade Quality Score",
      value: `${tradePlan ? tradePlan.scores.overall : "N/A"}`,
      description: `Confidence: ${
        tradePlan ? `${tradePlan.confidence}` : "unknown"
      }`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <TradeHeader
        title={`Strategy: ${tradePlan?.summary || ""}`}
        userInputs={userInfo}
      />
      <div className="w-full my-8">
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
      <div className="flex flex-col lg:flex-row mt-10">
        <div className="lg:w-2/5 mb-6 lg:mb-0">
          <TradePlanLeftCol data={tradePlan} />
        </div>
        <div className="lg:w-3/5 mb-6 lg:mb-0">
          <TradePlanRightCol data={tradePlan} />
        </div>
      </div>
    </div>
  );
}

// <Loader strokeWidth={1} />
