"use client";

import TradePlanLeftCol from "@/components/trades/trade-plan-left-col";
import TradeHeader from "@/components/trades/trade-header";
import TradePlanRightCol from "@/components/trades/trade-plan-right-col";
import { BadgeCheck, Crosshair, Skull, Wallet } from "lucide-react";
import React, { useState, useEffect } from "react";
import TradeResultsModule from "@/components/trades/trade-results-module";
import { AnalysisResponse } from "@/types/trading/analysis";
import { dummyData } from "@/data/dummy-data";

const TradeModuleData = [
  {
    icon: <Crosshair className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
    title: "Direction",
    value: "Sell",
    description: "Not Recommended",
  },
  {
    icon: <Wallet className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
    title: "PNL",
    value: "$50-$254",
    description: "Balance after trade",
  },
  {
    icon: <Skull className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
    title: "Max Loss",
    value: "$25",
    description: "Balance after loss",
  },
  {
    icon: <BadgeCheck className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
    title: "Trade Quality Score",
    value: "68",
    description: "Not Recommended",
  },
];

export default function TradeDetail() {
  const [tradePlan, setTradePlan] = useState<AnalysisResponse | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentTradePlan");
    if (stored) {
      setTradePlan(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <TradeHeader
        title={`${tradePlan?.userInput.instrument || dummyData.direction} ${
          tradePlan?.analysis.timeframe || dummyData.timeframe
        } timeframe move breakdown`}
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
          <TradePlanLeftCol data={tradePlan?.analysis} />
        </div>
        <div className="lg:w-3/5 mb-6 lg:mb-0">
          <TradePlanRightCol data={tradePlan?.analysis} />
        </div>
      </div>
    </div>
  );
}

// <Loader strokeWidth={1} />
