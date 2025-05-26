export interface UserInputs {
  accountSize: number;
  riskPerTrade: number;
  tradingStyle: "Day Trade" | "Swing Trade" | "Position Trade";
  instrument: string;
}

export interface AnalysisResponse {
  makeOrBreak: {
    riskRewardRatio: {
      score: number;
      assessment: string;
      ratio: string;
    };
    keyLevelContext: {
      score: number;
      assessment: string;
      levels: string[];
    };
    trendAlignment: {
      score: number;
      assessment: string;
      direction: "bullish" | "bearish" | "neutral";
    };
  };
  needToKnow: {
    entryTriggerQuality: {
      score: number;
      assessment: string;
      trigger: string;
    };
    marketTiming: {
      score: number;
      assessment: string;
      timing: string;
    };
    setupInvalidation: {
      score: number;
      assessment: string;
      stopLevel: string;
    };
  };
  totalScore: number;
  recommendation: "take" | "caution" | "pass" | "avoid";
}
