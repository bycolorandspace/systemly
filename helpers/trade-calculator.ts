import { convertFromUSD } from "@/lib/currencyExchange";
import { CalculationData, Execution } from "@/types/trading/analysis";
import { formatCurrrencytoString } from "./format-currency";

export interface UserInputs {
  accountCurrency: string;
  accountSize: number;
  riskPerTrade: number; // percentage (1 = 1%)
  tradingStyle: string;
}

export type ExecutionType =
  | "Buy Limit"
  | "Sell Limit"
  | "Buy Stop"
  | "Sell Stop"
  | "Market Buy"
  | "Market Sell";
export type TradeDirection = "BUY" | "SELL";

export interface ParsedExecutionData {
  executionType: ExecutionType;
  tradeDirection: TradeDirection;
  currentPrice: number;
  entryPrice: number;
  lotSize: number;
  stopLoss: number;
  targets: number[];
  support: number;
  resistance: number;
}

export interface PositionScaling {
  percentages: number[];
}

export interface TargetProfits {
  individual: number[];
  cumulative: number[];
  total: number;
}

export interface TargetPips {
  individual: number[];
  total: number;
}

export interface RiskAnalysis {
  totalRiskAmount: number;
  riskPercentage: number;
  riskRewardRatio: string;
  stopLossPips: number;
  isWithinRiskTolerance: boolean;
  recommendedLotSize?: number;
  profitPerPip: number;
}

export interface TradeSummary {
  entryPrice: number;
  stopLossPips: number;
  totalTargets: number;
  positionScaling: number[];
  accountSizeIncrease: number;
}

export interface CalculationResults {
  profits: TargetProfits;
  pips: TargetPips;
  risk: RiskAnalysis;
  summary: TradeSummary;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type CalculationResult =
  | { success: true; data: CalculationResults }
  | { success: false; errors: ValidationError[] };

// ======================= SERVICES =======================

// Determines trade direction ("BUY" or "SELL") based on execution type.
export function determineTradeDirection(
  executionType: ExecutionType
): TradeDirection {
  return executionType.toLowerCase().includes("buy") ? "BUY" : "SELL";
}

// Parses a string to a number and throws an error if invalid.
export function parseNumber(value: string, fieldName: string): number {
  const parsed = parseFloat(value);
  if (isNaN(parsed)) {
    throw new Error(`Invalid number format for ${fieldName}: ${value}`);
  }
  return parsed;
}

// Validates that targets are in correct order for the trade direction.
export function validateTargetOrder(
  targets: number[],
  direction: TradeDirection,
  errors: ValidationError[]
): void {
  for (let i = 0; i < targets.length - 1; i++) {
    if (direction === "BUY") {
      if (targets[i] >= targets[i + 1]) {
        errors.push({
          field: "targets",
          message: `For BUY trades, targets must be in ascending order. Target ${
            i + 1
          } (${targets[i]}) should be < Target ${i + 2} (${targets[i + 1]})`,
        });
      }
    } else {
      if (targets[i] <= targets[i + 1]) {
        errors.push({
          field: "targets",
          message: `For SELL trades, targets must be in descending order. Target ${
            i + 1
          } (${targets[i]}) should be > Target ${i + 2} (${targets[i + 1]})`,
        });
      }
    }
  }
}

// Parses and validates all user and execution inputs, throws on error.
export function parseAndValidateInputs(
  rawExecution: Execution,
  calculationData: CalculationData,
  positionScaling: PositionScaling
): ParsedExecutionData {
  const errors: ValidationError[] = [];

  const executionType = rawExecution.type.data as ExecutionType;
  const tradeDirection = determineTradeDirection(executionType);

  const currentPrice = parseNumber(
    rawExecution.currentPrice.data?.toString() || "",
    "currentPrice"
  );
  const lotSize = parseNumber(
    rawExecution.lotSize.data?.toString() || "0",
    "lotSize"
  );
  const stopLoss = parseNumber(
    rawExecution.stopLoss.data?.toString() || "0",
    "stopLoss"
  );
  const support = parseNumber(
    rawExecution.support.data?.toString() || "0",
    "support"
  );
  const resistance = parseNumber(
    rawExecution.resistance.data?.toString() || "0",
    "resistance"
  );

  const targets = [
    parseNumber(rawExecution.target1.data?.toString() || "0", "target1"),
    parseNumber(rawExecution.target2.data?.toString() || "0", "target2"),
    parseNumber(rawExecution.target3.data?.toString() || "0", "target3"),
    parseNumber(
      rawExecution.finalTarget.data?.toString() || "0",
      "finalTarget"
    ),
  ];

  console.log("lotsize: ", lotSize);
  if (lotSize < 0)
    errors.push({ field: "lotSize", message: "Lot size must be positive" });

  if (calculationData.pipValue <= 0)
    errors.push({ field: "pipValue", message: "Pip value must be positive" });

  const scalingSum = positionScaling.percentages.reduce(
    (sum, pct) => sum + pct,
    0
  );
  if (Math.abs(scalingSum - 100) > 0.01) {
    errors.push({
      field: "positionScaling",
      message: `Position scaling must sum to 100%, got ${scalingSum}%`,
    });
  }

  if (positionScaling.percentages.length !== targets.length) {
    errors.push({
      field: "positionScaling",
      message: `Position scaling array length (${positionScaling.percentages.length}) must match targets length (${targets.length})`,
    });
  }

  //validateTargetOrder(targets, tradeDirection, errors);

  if (errors.length > 0) {
    throw new Error(errors.map((e) => `${e.field}: ${e.message}`).join("; "));
  }

  return {
    executionType,
    tradeDirection,
    currentPrice,
    entryPrice: 0, // Will be calculated in step 2
    lotSize,
    stopLoss,
    targets,
    support,
    resistance,
  };
}

// Calculates entry price from a string (single value or range).
export function calculateEntryPrice(entryZoneString: string): number {
  const trimmed = entryZoneString.trim();

  if (trimmed.includes("-")) {
    const parts = trimmed.split("-").map((part) => part.trim());

    if (parts.length !== 2) {
      throw new Error(
        `Invalid entry zone format: ${entryZoneString}. Expected format: "21650-21670" or "21660"`
      );
    }

    const lowerBound = parseNumber(parts[0], "entryZone lower bound");
    const upperBound = parseNumber(parts[1], "entryZone upper bound");

    if (lowerBound >= upperBound) {
      throw new Error(
        `Invalid entry zone: lower bound (${lowerBound}) must be less than upper bound (${upperBound})`
      );
    }

    return (lowerBound + upperBound) / 2;
  } else {
    return parseNumber(trimmed, "entryZone single point");
  }
}

// Calculates pip distances to each target and stop loss.
export function calculatePipDistances(
  entryPrice: number,
  targets: number[],
  stopLoss: number
): {
  targetPips: number[];
  stopLossPips: number;
  totalPips: number;
} {
  const targetPips = targets.map((target) => Math.abs(target - entryPrice));
  const stopLossPips = Math.abs(stopLoss - entryPrice);
  const totalPips = targetPips.reduce((sum, pips) => sum + pips, 0);

  return {
    targetPips,
    stopLossPips,
    totalPips,
  };
}

// Splits total lot size into scaled positions based on percentages.
export function applyPositionScaling(
  totalLotSize: number,
  scalingPercentages: number[]
): number[] {
  return scalingPercentages.map(
    (percentage) => totalLotSize * (percentage / 100)
  );
}

// Calculates profit for each target based on pips, position, and pip value.
export function calculateIndividualProfits(
  targetPips: number[],
  scaledPositions: number[],
  pipValue: number
): number[] {
  return targetPips.map(
    (pips, index) => pips * scaledPositions[index] * pipValue
  );
}

// Calculates cumulative profits for each target.
export function calculateCumulativeProfits(
  individualProfits: number[]
): number[] {
  const cumulative: number[] = [];
  let runningTotal = 0;

  for (const profit of individualProfits) {
    runningTotal += profit;
    cumulative.push(runningTotal);
  }

  return cumulative;
}

// Calculates risk metrics: total risk, risk %, risk-reward ratio, profit per pip.
export function calculateRiskMetrics(
  stopLossPips: number,
  totalLotSize: number,
  pipValue: number,
  accountSize: number
): {
  totalRiskAmount: number;
  riskPercentage: number;
  riskRewardRatio: string;
  profitPerPip: number;
} {
  const totalRiskAmount =
    Math.round(stopLossPips * totalLotSize * pipValue * 100) / 100;
  const riskPercentage = (totalRiskAmount / accountSize) * 100;

  const profitPerPip = totalLotSize * pipValue;

  // Calculate risk-reward ratio (using first target)
  const firstTargetProfit = 190 * totalLotSize * pipValue; // This should be calculated properly
  const ratio = firstTargetProfit / totalRiskAmount;
  const riskRewardRatio = `1:${ratio.toFixed(2)}`;

  return {
    totalRiskAmount,
    riskPercentage,
    riskRewardRatio,
    profitPerPip,
  };
}

export function calculateBasicRisk(accountSize: number, riskPerTrade: number) {
  const riskAmount = Math.round((accountSize * riskPerTrade) / 100);

  return riskAmount;
}

// Checks if risk is within user tolerance and suggests lot size if not.
export function validateRiskTolerance(
  riskMetrics: { totalRiskAmount: number; riskPercentage: number },
  userRiskTolerance: number,
  accountSize: number,
  stopLossPips: number,
  pipValue: number
): {
  isWithinTolerance: boolean;
  recommendedLotSize?: number;
} {
  const isWithinTolerance = riskMetrics.riskPercentage <= userRiskTolerance;

  let recommendedLotSize: number | undefined;
  if (!isWithinTolerance) {
    const maxRiskAmount = accountSize * (userRiskTolerance / 100);
    recommendedLotSize =
      Math.round((maxRiskAmount / (stopLossPips * pipValue)) * 100000) / 100000;
  }

  return {
    isWithinTolerance,
    recommendedLotSize,
  };
}

export async function convertSimpleAmounts(
  amount: number,
  targetCurrency: string
) {
  if (targetCurrency.toUpperCase() === "USD" || targetCurrency === "$") {
    return {
      amount,
    };
  }

  const currency = formatCurrrencytoString(targetCurrency);

  const convertedProfits = await convertFromUSD(amount, currency);

  return {
    convertedAmount: convertedProfits.convertedAmount,
  };
}

// Converts profits and risk metrics to the user's target currency.
export async function convertCurrencyAmounts(
  individualProfits: number[],
  cumulativeProfits: number[],
  targetCurrency: string,
  riskMetrics: {
    totalRiskAmount: number;
    riskPercentage: number;
    riskRewardRatio: string;
    profitPerPip: number;
  }
) {
  if (targetCurrency.toUpperCase() === "USD" || targetCurrency === "$") {
    return {
      profits: individualProfits,
      cumulative: cumulativeProfits,
      risk: riskMetrics,
    };
  }

  const currency = formatCurrrencytoString(targetCurrency);

  const convertedProfits = await Promise.all(
    individualProfits.map((amount) => convertFromUSD(amount, currency))
  );

  const convertedCumulative = await Promise.all(
    cumulativeProfits.map((amount) => convertFromUSD(amount, currency))
  );

  const convertedRisk = await convertFromUSD(
    riskMetrics.totalRiskAmount,
    currency
  );

  const convertedProfitPerPip = await convertFromUSD(
    riskMetrics.profitPerPip,
    currency
  );

  return {
    profits: convertedProfits.map((result) => result.convertedAmount),
    cumulative: convertedCumulative.map((result) => result.convertedAmount),
    risk: {
      ...riskMetrics,
      totalRiskAmount: convertedRisk.convertedAmount,
      profitPerPip: convertedProfitPerPip.convertedAmount,
    },
  };
}
// Builds the final calculation result object.
export function buildResults(
  individualProfits: number[],
  cumulativeProfits: number[],
  pipDistances: {
    targetPips: number[];
    stopLossPips: number;
    totalPips: number;
  },
  riskMetrics: {
    totalRiskAmount: number;
    riskPercentage: number;
    riskRewardRatio: string;
    profitPerPip: number;
  },
  riskValidation: { isWithinTolerance: boolean; recommendedLotSize?: number },
  entryPrice: number,
  scalingPercentages: number[],
  accountSize: number,
  targetCount: number
): CalculationResult {
  const totalProfit = cumulativeProfits[cumulativeProfits.length - 1];
  const accountSizeIncrease = (totalProfit / accountSize) * 100;

  const results: CalculationResults = {
    profits: {
      individual: individualProfits,
      cumulative: cumulativeProfits,
      total: totalProfit,
    },
    pips: {
      individual: pipDistances.targetPips,
      total: pipDistances.totalPips,
    },
    risk: {
      totalRiskAmount: riskMetrics.totalRiskAmount,
      riskPercentage: riskMetrics.riskPercentage,
      riskRewardRatio: riskMetrics.riskRewardRatio,
      stopLossPips: pipDistances.stopLossPips,
      isWithinRiskTolerance: riskValidation.isWithinTolerance,
      recommendedLotSize: riskValidation.recommendedLotSize,
      profitPerPip: riskMetrics.profitPerPip,
    },
    summary: {
      entryPrice,
      stopLossPips: pipDistances.stopLossPips,
      totalTargets: targetCount,
      positionScaling: scalingPercentages,
      accountSizeIncrease,
    },
  };

  return {
    success: true,
    data: results,
  };
}

// ======================= MAIN CALCULATION PIPELINE =======================

export async function calculateTrade(
  userInputs: UserInputs | null,
  rawExecution: Execution | null,
  calculationData: CalculationData | null,
  positionScaling: PositionScaling
): Promise<CalculationResult> {
  if (!userInputs || !rawExecution || !calculationData) {
    return {
      success: false,
      errors: [
        {
          field: "general",
          message: "Missing required inputs for trade calculation",
        },
      ],
    };
  }

  try {
    const parsedData = parseAndValidateInputs(
      rawExecution,
      calculationData,
      positionScaling
    );

    const entryPrice = calculateEntryPrice(
      rawExecution.entryZone.data?.toString() || ""
    );

    const pipDistances = calculatePipDistances(
      entryPrice,
      parsedData.targets,
      parsedData.stopLoss
    );

    const scaledPositions = applyPositionScaling(
      parsedData.lotSize,
      positionScaling.percentages
    );

    const individualProfits = calculateIndividualProfits(
      pipDistances.targetPips,
      scaledPositions,
      calculationData.pipValue
    );

    const cumulativeProfits = calculateCumulativeProfits(individualProfits);

    const riskMetrics = calculateRiskMetrics(
      pipDistances.stopLossPips,
      parsedData.lotSize,
      calculationData.pipValue,
      userInputs.accountSize
    );

    const riskValidation = validateRiskTolerance(
      riskMetrics,
      userInputs.riskPerTrade,
      userInputs.accountSize,
      pipDistances.stopLossPips,
      calculationData.pipValue
    );

    const convertedAmounts = await convertCurrencyAmounts(
      individualProfits,
      cumulativeProfits,
      userInputs.accountCurrency,
      riskMetrics
    );

    return buildResults(
      convertedAmounts.profits,
      convertedAmounts.cumulative,
      pipDistances,
      convertedAmounts.risk,
      riskValidation,
      entryPrice,
      positionScaling.percentages,
      userInputs.accountSize,
      parsedData.targets.length
    );
  } catch (error) {
    return {
      success: false,
      errors: [
        {
          field: "general",
          message:
            error instanceof Error ? error.message : "Unknown error occurred",
        },
      ],
    };
  }
}
