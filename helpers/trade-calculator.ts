import { TradePlan } from "@/types/trading/analysis";

export const calculateRiskAmount = (
  accountSize: number,
  riskPercent: number
) => {
  const riskAmount = accountSize * (riskPercent / 100);
  return riskAmount;
};

export const calculateTradeMetrics = (
  analysis: TradePlan,
  accountSize: number,
  riskPercent: number
) => {
  const { calculationData } = analysis;

  // Calculate position sizing
  const riskAmount = accountSize * (riskPercent / 100);
  const positionSize =
    riskAmount / (calculationData.riskPips * calculationData.pipValue);

  // Calculate potential profits/losses
  const potentialLoss = riskAmount;
  const potentialProfit =
    positionSize * calculationData.rewardPips * calculationData.pipValue;
  const target2Profit =
    positionSize * calculationData.target2Pips * calculationData.pipValue;
  const target3Profit =
    positionSize * calculationData.target3Pips * calculationData.pipValue;

  // Calculate percentages
  const accountIncrease = (potentialProfit / accountSize) * 100;
  const accountDecrease = (potentialLoss / accountSize) * 100;

  // Calculate hourly return potential
  const hourlyReturn = potentialProfit / calculationData.averageTimeToTarget;

  // Calculate balance after loss
  const balanceAfterLoss = accountSize - potentialLoss;

  return {
    // Card 1: Potential Profit
    potentialProfit: Math.round(potentialProfit),
    accountIncrease: Math.round(accountIncrease * 10) / 10,

    // Card 2: Potential Loss
    potentialLoss: Math.round(potentialLoss),
    balanceAfterLoss: Math.round(balanceAfterLoss),
    accountDecrease: Math.round(accountDecrease * 10) / 10,

    // Card 3: Risk-Reward
    riskRewardRatio: `1:${calculationData.riskRewardRatio.toFixed(1)}`,

    // Card 4: Time to Profit
    averageHours: calculationData.averageTimeToTarget,
    maxHours: calculationData.maxHoldTime,
    hourlyReturn: Math.round(hourlyReturn),

    // Card 5: Quality Score (from existing data)
    overallScore: analysis.scores.overall,
    recommendation: analysis.recommendation,

    // Additional useful metrics
    positionSize: Math.round(positionSize * 100) / 100,
    target2Profit: Math.round(target2Profit),
    target3Profit: Math.round(target3Profit),
  };
};
