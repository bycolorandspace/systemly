export const inputLimits = {
  accountSize: { min: 50, max: 1_000_000 },
  riskPerTrade: { min: 0.01, max: 100 },
} as const;

export const formatMoney = (num: number): string => {
  if (num >= 1_000_000) {
    return `${parseFloat((num / 1_000_000).toFixed(1))}M`;
  }
  if (num >= 1_000) {
    return `${parseFloat((num / 1_000).toFixed(1))}K`;
  }

  return num.toString();
};
