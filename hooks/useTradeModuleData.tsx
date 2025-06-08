import { useEffect, useMemo, useState } from "react";
import { calculateTradeMetrics } from "@/helpers/trade-calculator";
import { useTradeAnalysisContext } from "@/contexts/trade-analysis-context";

export const useTradeModuleData = () => {
  const { validatedTradePlan, validatedUserInput } = useTradeAnalysisContext(); // Custom hook to manage trade plan state
  const [accountSize, setAccountSize] = useState(0);
  const [riskPerTrade, setRiskPerTrade] = useState(0);

  const metrics = useMemo(() => {
    console.log("useMemo running with tradePlan:", validatedTradePlan?.id);

    if (!validatedTradePlan) return null;
    return calculateTradeMetrics(validatedTradePlan, accountSize, riskPerTrade);
  }, [validatedTradePlan, accountSize, riskPerTrade]);

  useEffect(() => {
    const userInfo = validatedUserInput;
    if (userInfo) {
      setAccountSize(userInfo.accountSize || 0);
      setRiskPerTrade(userInfo.riskPerTrade || 0);
    }
  }, [validatedUserInput]);

  return {
    metrics,
    accountSize,
    riskPerTrade,
    setRiskPerTrade,
    setAccountSize,
  };
};
