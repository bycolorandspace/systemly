import { TradePlan } from "@/types/trading/analysis";
import { useMemo, useState } from "react";
import { calculateTradeMetrics } from "@/helpers/trade-calculator";

//   // Price metrics (in pips for forex, points for other instruments)
//   riskPips: number; // Distance to stop loss
//   rewardPips: number; // Distance to primary target
//   target2Pips: number; // Distance to second target
//   target3Pips: number; // Distance to third target

//   // Risk ratios
//   riskRewardRatio: number; // Primary risk:reward as decimal (e.g., 2.2)

//   // Time metrics (in hours)
//   averageTimeToTarget: number; // Average hours to reach profit
//   maxHoldTime: number; // Maximum recommended hold time

//   // Instrument specifics
//   pipValue: number; // Value of one pip/point in account currency
//   contractSize: number; // Standard contract/lot size

export const useTradeModuleData = (tradePlan: TradePlan | undefined) => {
  const [accountSize, setAccountSize] = useState(0);
  const [riskPerTrade, setRiskPerTrade] = useState(0);

  const metrics = useMemo(() => {
    console.log("useMemo running with tradePlan:", tradePlan?.id);
    if (!tradePlan) return null;
    return calculateTradeMetrics(tradePlan, accountSize, riskPerTrade);
  }, [tradePlan, accountSize, riskPerTrade]);

  return {
    metrics,
    accountSize,
    riskPerTrade,
    setRiskPerTrade,
    setAccountSize,
  };
};
