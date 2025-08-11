import {
  analyzeRisk,
  calculatePositionSize,
  calculateRiskScenario,
  getSymbolData,
  RiskAnalysis,
  RiskScenario,
} from "@/helpers/calculators/risk-calculators";
import {
  RiskCalculatorInputs,
  Update_RiskCalculatorInputs,
} from "@/schema/risk-calculator-schema";
import { ExecutionType } from "@/types/calculator-types";
import { useCallback, useEffect, useState } from "react";

export default function useRiskCalculator(
  data: RiskCalculatorInputs | undefined,
  stopDistance: number,
  stopLossValue: number,
  entry: number,
  updateData?: Partial<Update_RiskCalculatorInputs>
) {
  const [lotSize, setLotSize] = useState<number | unknown>();
  const [riskAmount, setRiskAmount] = useState<number>(0);
  const [riskAssessment, setRiskAssessment] = useState<
    RiskAnalysis | undefined
  >(undefined);
  const [riskScenerios, setRiskScenerios] = useState<RiskScenario | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);

  const runCalculation = useCallback(() => {
    console.log("=== HOOK DEBUG ===");
    console.log("updateData:", updateData);
    console.log("entry param:", entry);
    console.log("stopDistance param:", stopDistance);
    console.log("stopLossValue param:", stopLossValue);

    // Clear any previous errors
    setError(null);

    // Validation: ensure we have minimum required data
    if (!data?.accountSize || !data?.riskPerTrade || !data?.pair) {
      setError("Missing required data for calculation");
      return;
    }

    try {
      const execution = data.exectutionType ?? ExecutionType.BUY;
      const accountSize = data.accountSize;
      const riskPercentage = data.riskPerTrade;
      const symbol = data.pair;

      // 🔥 FIX 1: Always ensure entry_ has a value
      const entry_ = updateData?.entryZone ?? entry;

      if (!entry_ || entry_ === 0) {
        setError("Entry price is required for calculations");
        return;
      }

      // 🔥 FIX 2: Determine stop loss pips with better logic
      let stopLossPips;

      if (updateData?.stopLossPips) {
        stopLossPips = updateData.stopLossPips;
        console.log("Using updated stopLossPips:", stopLossPips);
      } else if (updateData?.stopLoss && entry_) {
        // Convert stopLoss level to pips
        const symbol_ = getSymbolData(symbol);
        if (!symbol_?.pipVal) {
          setError(`Invalid symbol data for ${symbol}`);
          return;
        }
        stopLossPips = Math.abs(updateData.stopLoss - entry_) / symbol_.pipVal;
        console.log("Calculated stopLossPips from price:", stopLossPips);
      } else {
        stopLossPips = stopDistance;
        console.log("Using default stopDistance:", stopLossPips);
      }

      console.log(
        "Final values - entry_:",
        entry_,
        "stopLossPips:",
        stopLossPips
      );

      // Calculate position size
      const calculationResult = calculatePositionSize(
        accountSize,
        riskPercentage,
        stopLossPips,
        symbol
      );

      if (!calculationResult) {
        setError("Failed to calculate position size");
        return;
      }

      // Update basic calculations
      setLotSize(calculationResult.lotSize);
      setRiskAmount(calculationResult.cashAmount);

      // Calculate risk analysis
      const riskAnalysis = analyzeRisk(
        stopLossPips,
        calculationResult.cashAmount,
        accountSize,
        symbol
      );
      setRiskAssessment(riskAnalysis);

      // 🔥 FIX 3: Better condition check (use && instead of ||)
      if (
        entry_ &&
        calculationResult &&
        symbol &&
        execution &&
        stopLossPips > 0
      ) {
        // 🔥 FIX 4: Calculate actual stop loss value correctly
        let actualStopLossValue = stopLossValue;

        if (updateData?.stopLoss) {
          actualStopLossValue = updateData.stopLoss;
          console.log("Using updated stopLoss price:", actualStopLossValue);
        } else {
          // Calculate stop loss price from pips and entry
          const symbol_ = getSymbolData(symbol);
          if (symbol_?.pipVal) {
            actualStopLossValue =
              execution === ExecutionType.BUY
                ? entry_ - stopLossPips * symbol_.pipVal
                : entry_ + stopLossPips * symbol_.pipVal;
            console.log("Calculated stopLoss price:", actualStopLossValue);
          }
        }

        console.log("=== SCENARIO CALCULATION INPUTS ===");
        console.log("entry_:", entry_);
        console.log("stopLossPips:", stopLossPips);
        console.log("lotSize:", calculationResult.lotSize);
        console.log("symbol:", symbol);
        console.log("execution:", execution);
        console.log("actualStopLossValue:", actualStopLossValue);

        const scenario = calculateRiskScenario(
          entry_,
          stopLossPips,
          calculationResult.lotSize,
          symbol,
          execution,
          updateData?.takeProfit ? 1.0 : 1.618,
          updateData?.takeProfit,
          actualStopLossValue
        );

        console.log("Calculated scenario:", scenario);
        setRiskScenerios(scenario);
      } else {
        console.log("Scenario calculation skipped - missing required values");
        console.log("entry_:", entry_);
        console.log("calculationResult:", !!calculationResult);
        console.log("symbol:", symbol);
        console.log("execution:", execution);
        console.log("stopLossPips:", stopLossPips);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed");
      console.error("Risk calculation error:", err);
    }
  }, [
    data?.accountSize,
    data?.riskPerTrade,
    data?.pair,
    data?.exectutionType,
    stopDistance,
    stopLossValue,
    entry,
    updateData,
  ]);

  useEffect(() => {
    if (data || updateData) {
      runCalculation();
    }
  }, [data, runCalculation, updateData]);

  return {
    runCalculation,
    lotSize,
    riskAmount,
    riskAssessment,
    scenerio: riskScenerios,
    error,
  };
}
