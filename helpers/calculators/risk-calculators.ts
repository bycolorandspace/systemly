import { TRADABLE_ASSETS } from "@/data/trading-pairs-data";
import { ExecutionType } from "@/types/calculator-types";

export enum RiskStyle {
  LOW = "Low risk",
  MID = "Medium risk",
  HIGH = "High risk",
  SUPERHIGH = "Very high risk",
}

export interface RiskAnalysis {
  success: boolean;
  capitalRisk?: RiskStyle; // Money at risk
  executionRisk?: RiskStyle; // Probability of success
  overall?: RiskStyle; // Combined assessment
}

// Updated types for single target
export interface SingleTargetResult {
  target: number;
  pips: number;
  pnl: number;
  rr: number;
}

export interface RiskScenario {
  type: ExecutionType;
  totalPNL: number;
  riskRewardRatio: number;
  riskAmount: number;
  stopLoss: number;
  stopLossDistance: number;
  target: SingleTargetResult;
}

export type StopLossRange = {
  min: number;
  max: number;
  default: number;
  step: number;
};

// Position Size = Risk Amount ÷ (Stop Loss Distance × Pip Value)
export const calculatePositionSize = (
  accountSize: number,
  riskPercentage: number,
  stopLoss: number,
  symbol: string | undefined
) => {
  if (!symbol) {
    console.log("NO SYMBOL - CALCULATION -", symbol);
    return null;
  }

  const riskAmount = (accountSize / 100) * riskPercentage;
  const symbolData = getSymbolData(symbol);

  if (symbolData) {
    const position = riskAmount / (stopLoss * symbolData.pipVal);
    const lotSize = position / symbolData.standardLot;

    const cash = stopLoss * symbolData.pipVal * position;

    return { lotSize: formatLotSize(lotSize), cashAmount: cash };
  } else {
    return null;
  }
};

export const analyzeRisk = (
  stopLossPips: number,
  riskAmount: number,
  accountSize: number,
  symbol: string | undefined
): RiskAnalysis => {
  if (!symbol) {
    console.log("NO SYMBOL - RISK ANALYSIS");
    return { success: false };
  }

  // === CAPITAL RISK: Based on risk percentage ===
  const riskPercentage = (riskAmount / accountSize) * 100;

  let capitalRisk: RiskStyle;
  if (riskPercentage <= 1) {
    capitalRisk = RiskStyle.LOW; // 1% or less - very conservative
  } else if (riskPercentage <= 2) {
    capitalRisk = RiskStyle.MID; // 1-2% - standard risk management
  } else if (riskPercentage <= 5) {
    capitalRisk = RiskStyle.HIGH; // 2-5% - aggressive
  } else {
    capitalRisk = RiskStyle.SUPERHIGH; // 5%+ - very dangerous
  }

  // === EXECUTION RISK: Based on stop loss distance ===
  const symbolData = getSymbolData(symbol);
  let executionRisk: RiskStyle;

  if (symbolData?.assetType === "forex") {
    if (stopLossPips >= 80) {
      executionRisk = RiskStyle.LOW; // Wide stop - good probability
    } else if (stopLossPips >= 40) {
      executionRisk = RiskStyle.MID; // Moderate stop
    } else if (stopLossPips >= 15) {
      executionRisk = RiskStyle.HIGH; // Tight stop - day trading
    } else {
      executionRisk = RiskStyle.SUPERHIGH; // Very tight - scalping
    }
  } else if (symbolData?.assetType === "indices") {
    if (stopLossPips >= 150) {
      executionRisk = RiskStyle.LOW;
    } else if (stopLossPips >= 75) {
      executionRisk = RiskStyle.MID;
    } else if (stopLossPips >= 30) {
      executionRisk = RiskStyle.HIGH;
    } else {
      executionRisk = RiskStyle.SUPERHIGH;
    }
  } else if (symbolData?.assetType === "commodities") {
    if (stopLossPips >= 200) {
      // $2.00 for gold
      executionRisk = RiskStyle.LOW;
    } else if (stopLossPips >= 100) {
      // $1.00 for gold
      executionRisk = RiskStyle.MID;
    } else if (stopLossPips >= 50) {
      // $0.50 for gold
      executionRisk = RiskStyle.HIGH;
    } else {
      executionRisk = RiskStyle.SUPERHIGH;
    }
  } else {
    // Default for stocks or unknown
    executionRisk = RiskStyle.MID;
  }

  // === OVERALL RISK: Combined assessment ===
  // Convert to numeric scores for calculation
  const capitalScore = getRiskScore(capitalRisk);
  const executionScore = getRiskScore(executionRisk);

  // Weight capital risk more heavily (75/25 split) -
  const overallScore = Math.round(capitalScore * 0.75 + executionScore * 0.25);
  const overall = getStyleFromScore(overallScore);

  return { success: true, capitalRisk, executionRisk, overall };
};

// Single target risk calculator
export const calculateRiskScenario = (
  entry: number,
  stopLossPips: number,
  lotSize: number,
  symbol: string,
  tradeType: string, // "buy" or "sell"
  // New parameters for single target
  fibLevel: number = 1.618, // Default to 1.618 Fibonacci level
  customTarget?: number, // Optional user-provided target
  stopLossValue?: number // Optional user-provided stop loss price
): RiskScenario => {
  const symbolData = getSymbolData(symbol);
  const pipValue = symbolData?.pipVal || 0.0001;
  const standardLotSize = symbolData?.standardLot || 100000;
  const decimalPlaces = symbolData?.pipVal === 0.01 ? 2 : 4;

  // Step 1: Calculate stop loss level
  let stopLoss: number;

  if (stopLossValue) {
    stopLoss = stopLossValue;
  } else {
    stopLoss =
      tradeType === "Buy"
        ? entry - stopLossPips * pipValue // Stop below entry for buy
        : entry + stopLossPips * pipValue; // Stop above entry for sell
  }

  // Step 2: Calculate position size in base currency units
  const positionSize = lotSize * standardLotSize;

  // Step 3: Calculate target
  let target: SingleTargetResult;

  if (customTarget) {
    // User provided custom target - calculate metrics from it
    const targetPrice = customTarget;

    // Calculate distance in pips from entry to target
    const targetDistancePips = Math.abs(targetPrice - entry) / pipValue;

    // Calculate PnL
    const pnl = targetDistancePips * pipValue * positionSize;

    // Calculate risk:reward ratio
    const rr = targetDistancePips / stopLossPips;

    target = {
      target: Number(targetPrice.toFixed(decimalPlaces)),
      pips: Math.round(targetDistancePips),
      pnl: Number(pnl.toFixed(2)),
      rr: Number(rr.toFixed(3)),
    };
  } else {
    // Calculate target using Fibonacci level
    const targetDistancePips = stopLossPips * fibLevel;

    const targetPrice =
      tradeType === "Buy"
        ? entry + targetDistancePips * pipValue // Target above entry for buy
        : entry - targetDistancePips * pipValue; // Target below entry for sell

    const pnl = targetDistancePips * pipValue * positionSize;

    target = {
      target: Number(targetPrice.toFixed(decimalPlaces)),
      pips: Math.round(targetDistancePips),
      pnl: Number(pnl.toFixed(2)),
      rr: Number(fibLevel.toFixed(3)),
    };
  }

  // Step 4: Calculate risk amount (for reference)
  const riskAmount = stopLossPips * pipValue * positionSize;

  const executionType = tradeType as ExecutionType;

  return {
    type: executionType,
    totalPNL: target.pnl,
    riskRewardRatio: target.rr,
    riskAmount: riskAmount,
    stopLoss: Number(stopLoss.toFixed(decimalPlaces)),
    stopLossDistance: stopLossPips,
    target,
  };
};

// Helper function to recalculate with new Fibonacci level
export const updateFibLevel = (
  entry: number,
  stopLossPips: number,
  lotSize: number,
  symbol: string,
  tradeType: "buy" | "sell",
  newFibLevel: number,
  stopLossValue?: number
): RiskScenario => {
  return riskScenario(
    entry,
    stopLossPips,
    lotSize,
    symbol,
    tradeType,
    newFibLevel, // Updated fib level
    undefined, // No custom target when using fib
    stopLossValue
  );
};

// Helper function to update with custom target
export const updateCustomTarget = (
  entry: number,
  stopLossPips: number,
  lotSize: number,
  symbol: string,
  tradeType: "buy" | "sell",
  customTarget: number,
  stopLossValue?: number
): RiskScenario => {
  return riskScenario(
    entry,
    stopLossPips,
    lotSize,
    symbol,
    tradeType,
    1.0, // Fib level irrelevant when using custom target
    customTarget,
    stopLossValue
  );
};

// Predefined Fibonacci levels for quick access
export const FIBONACCI_LEVELS = {
  CONSERVATIVE: 0.618,
  BREAK_EVEN: 1.0,
  STANDARD: 1.618,
  AGGRESSIVE: 2.618,
  VERY_AGGRESSIVE: 4.236,
} as const;

// Helper functions
const getRiskScore = (risk: RiskStyle): number => {
  switch (risk) {
    case RiskStyle.LOW:
      return 1;
    case RiskStyle.MID:
      return 2;
    case RiskStyle.HIGH:
      return 3;
    case RiskStyle.SUPERHIGH:
      return 4;
    default:
      return 2;
  }
};

const getStyleFromScore = (score: number): RiskStyle => {
  if (score <= 1) return RiskStyle.LOW;
  if (score <= 2) return RiskStyle.MID;
  if (score <= 3) return RiskStyle.HIGH;
  return RiskStyle.SUPERHIGH;
};

export function getSymbolData(symbol: string) {
  // Search in forex first (most common for pip calculations)
  const commoditiesPair = TRADABLE_ASSETS.commodities.find(
    (pair) => pair.symbol === symbol
  );
  if (commoditiesPair) {
    return {
      commoditiesPair,
      assetType: "commodities",
      pipVal: commoditiesPair.pip,
      standardLot: commoditiesPair.standard_lot_size,
    };
  }

  // Search in forex first (most common for pip calculations)
  const forexPair = TRADABLE_ASSETS.forex.find(
    (pair) => pair.symbol === symbol
  );
  if (forexPair) {
    return {
      forexPair,
      assetType: "forex",
      pipVal: forexPair.pip,
      standardLot: forexPair.standard_lot_size,
    };
  }

  // Search in indices (typically 1 point = 1 pip)
  const indexPair = TRADABLE_ASSETS.indices.find(
    (pair) => pair.symbol === symbol
  );
  if (indexPair) {
    return {
      indexPair,
      assetType: "indices",
      pipVal: 1,
      standardLot: indexPair.standard_lot_size,
    };
  }

  // Search in stocks (typically 0.01, but can vary)
  const stockPair = TRADABLE_ASSETS.stocks.find(
    (pair) => pair.symbol === symbol
  );
  if (stockPair) {
    return {
      stockPair,
      assetType: "stock",
      pipVal: 0.01,
      standardLot: stockPair.standard_lot_size,
    };
  }

  return null;
}

export const getStopLossRange = (symbol: string): StopLossRange => {
  const symbolData = getSymbolData(symbol);

  if (symbolData?.assetType === "forex") {
    return { min: 5, max: 200, default: 40, step: 5 };
  }
  if (symbolData?.assetType === "commodities") {
    return { min: 10, max: 300, default: 50, step: 5 };
  }
  if (symbolData?.assetType === "indices") {
    return { min: 10, max: 1000, default: 100, step: 10 };
  }

  return { min: 5, max: 200, default: 40, step: 5 };
};

const formatLotSize = (lotSize: number) => {
  if (lotSize >= 1) {
    return parseFloat(lotSize.toFixed(2)); // 1.25 lots
  } else if (lotSize >= 0.1) {
    return parseFloat(lotSize.toFixed(3)); // 0.909 lots
  } else {
    return parseFloat(lotSize.toFixed(4)); // 0.0250 lots
  }
};

// Example usage:
/*
// Using default 1.618 Fib level
const scenario1 = riskScenario(1.0850, 20, 0.5, "EURUSD", "buy");

// Using custom Fib level
const scenario2 = riskScenario(1.0850, 20, 0.5, "EURUSD", "buy", 2.618);

// Using custom target price
const scenario3 = riskScenario(1.0850, 20, 0.5, "EURUSD", "buy", 1.0, 1.0950);

// Dynamically update Fib level
const updated = updateFibLevel(1.0850, 20, 0.5, "EURUSD", "buy", 0.618);

// Update with custom target
const customUpdated = updateCustomTarget(1.0850, 20, 0.5, "EURUSD", "buy", 1.0920);
*/
