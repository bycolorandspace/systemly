import { positionsScale } from "@/helpers/positionScaling";
import {
  applyPositionScaling,
  calculateCumulativeProfits,
  calculateEntryPrice,
  calculateIndividualProfits,
  calculatePipDistances,
  convertSimpleAmounts,
  parseAndValidateInputs,
} from "@/helpers/trade-calculator";
import { TradePlan } from "@/types/trading/analysis";
import { useState } from "react";

export interface ProfitResults {
  total: number;
}

export default function useTradeCalculator() {
  const [calculations, setCalculations] = useState<ProfitResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateTrade = async (analysis: TradePlan) => {
    if (!analysis || !analysis.execution) {
      setError("Invalid trade analysis data");
      return;
    }

    try {
      const parsedData = parseAndValidateInputs(
        analysis.execution,
        analysis.calculationData,
        positionsScale
      );

      const entryPrice = calculateEntryPrice(
        analysis.execution.entryZone.data?.toString() || ""
      );

      const pipDistances = calculatePipDistances(
        entryPrice,
        parsedData.targets,
        parsedData.stopLoss
      );

      const scaledPositions = applyPositionScaling(
        parsedData.lotSize,
        positionsScale.percentages
      );

      const individualProfits = calculateIndividualProfits(
        pipDistances.targetPips,
        scaledPositions,
        analysis.calculationData.pipValue
      );

      const cumulativeProfits = calculateCumulativeProfits(individualProfits);

      const totalProfit = Math.round(
        cumulativeProfits[cumulativeProfits.length - 1]
      );

      // Prepare results
      const convertResults = await convertSimpleAmounts(totalProfit, "USD");

      const total: ProfitResults = {
        total: convertResults.convertedAmount as number,
      };

      setCalculations(total);
      setError(null);
    } catch (err) {
      console.error("Error calculating trade:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return {
    calculateTrade,
    calculations,
    error,
  };
}
