import { useState } from "react";
import { calculateTrade, CalculationResult } from "@/helpers/trade-calculator";
import { TradePlan, UserInputs } from "@/types/trading/analysis";
import { positionsScale } from "@/helpers/positionScaling";
import { updateAnalysisData } from "@/lib/analysisDataService";

export const useTradeModuleData = () => {
  const [calulations, setCalculations] = useState<CalculationResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const calculateMetrics = async (
    validatedTradePlan: TradePlan | null,
    validatedUserInput: UserInputs | null
  ) => {
    // Reset state
    if (!validatedTradePlan || !validatedUserInput) {
      console.log("❌ Skipping calculation - missing data");
      setCalculations(null);
      setError(null);
      setLoading(false);
      return;
    }

    // Only calculate if we have the required data
    if (!validatedUserInput || !validatedTradePlan) {
      console.log("Missing required data - skipping calculation");
      return;
    }
    console.log(
      "All data present - starting calculation for tradePlan:",
      validatedTradePlan.id
    );
    setLoading(true);

    try {
      // 🔧 Transform/validate the data before passing
      const transformedExecution = {
        ...validatedTradePlan.execution,
        // Ensure all data fields are proper types
        currentPrice: {
          ...validatedTradePlan.execution.currentPrice,
          data: Number(validatedTradePlan.execution.currentPrice.data),
        },
        lotSize: {
          ...validatedTradePlan.execution.lotSize,
          data: Number(validatedTradePlan.execution.lotSize.data),
        },
        stopLoss: {
          ...validatedTradePlan.execution.stopLoss,
          data: Number(validatedTradePlan.execution.stopLoss.data),
        },
        target1: {
          ...validatedTradePlan.execution.target1,
          data: Number(validatedTradePlan.execution.target1.data),
        },
        target2: {
          ...validatedTradePlan.execution.target2,
          data: Number(validatedTradePlan.execution.target2.data),
        },
        target3: {
          ...validatedTradePlan.execution.target3,
          data: Number(validatedTradePlan.execution.target3.data),
        },
        finalTarget: {
          ...validatedTradePlan.execution.finalTarget,
          data: Number(validatedTradePlan.execution.finalTarget.data),
        },
        support: {
          ...validatedTradePlan.execution.support,
          data: Number(validatedTradePlan.execution.support.data),
        },
        resistance: {
          ...validatedTradePlan.execution.resistance,
          data: Number(validatedTradePlan.execution.resistance.data),
        },
      };

      if (
        validatedTradePlan.execution.type.data === "N/A" ||
        validatedTradePlan.execution.type.data === "Wait" ||
        validatedTradePlan.execution.lotSize.data === 0
      )
        return;

      const result = await calculateTrade(
        validatedUserInput,
        transformedExecution, // Use transformed data
        validatedTradePlan.calculationData,
        positionsScale
      );
      if (result.success) {
        setCalculations(result); // Set the calculations state
        setError(null);

        if (validatedTradePlan.id) {
          await updateAnalysisData(validatedTradePlan.id, {
            calculations: result.data,
          }); // Update database with calculations
        }
      } else {
        setError(
          result.errors.length > 0
            ? result.errors.map((error) => error.message).join(", ")
            : "Failed to calculate trade metrics"
        );
        console.error(
          "Trade calculation error:",
          result.errors.length > 0
            ? result.errors.map((error) => error.message).join(", ")
            : "Failed to calculate trade metrics"
        );
        setCalculations(null);
      }
    } catch (err) {
      setError("Unexpected error calculating trade metrics");
      setCalculations(null);
      console.error("Trade calculation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    calculateMetrics,
    calulations,
    error,
    loading, // Return loading state
  };
};
