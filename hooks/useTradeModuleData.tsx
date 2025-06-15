import { useEffect, useState } from "react";
import {
  calculateTrade,
  CalculationResult,
  PositionScaling,
} from "@/helpers/trade-calculator";
import { TradePlan, UserInputs } from "@/types/trading/analysis";

export const useTradeModuleData = (
  validatedTradePlan: TradePlan | null,
  validatedUserInput: UserInputs | null
) => {
  const [accountSize, setAccountSize] = useState(0);
  const [riskPerTrade, setRiskPerTrade] = useState(0);
  const [calulations, setCalculations] = useState<CalculationResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state

  // Handle trade calculations
  useEffect(() => {
    const calculateMetrics = async () => {
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
        // MAKE POSITION SCALING DYNAMIC !!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const positions: PositionScaling = { percentages: [25, 25, 25, 25] };

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

        console.log("🔧 Transformed execution data:", transformedExecution);

        const result = await calculateTrade(
          validatedUserInput,
          transformedExecution, // Use transformed data
          validatedTradePlan.calculationData,
          positions
        );

        console.log("📊 calculateTrade result:", result);

        if (result.success) {
          setCalculations(result);
          console.log("Trade calculations successful:", result);
          setError(null);
        } else {
          setError(
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

    calculateMetrics();
  }, [validatedTradePlan, validatedUserInput]); // Dependencies

  return {
    calulations,
    accountSize,
    riskPerTrade,
    setRiskPerTrade,
    setAccountSize,
    error,
    loading, // Return loading state
  };
};
