import { TradePlan, UserInputs } from "@/types/trading/analysis";

export const userInput: UserInputs = {
  accountCurrency: "USD",
  accountSize: 2500,
  riskPerTrade: 1,
  tradingStyle: "Position Trade",
};

// Alternative example with different setup type
export const dummyData: TradePlan = {
  id: "67267847837483",
  summary:
    "USD/JPY bullish ascending triangle breakout. Requires Asian session monitoring. Moderate setup.",
  signal:
    "Ascending triangle breakout above 148.50 resistance with momentum acceleration",
  confidence: "medium",
  timeframe: "1-hour",
  direction: "long",
  recommendation: "CAUTION",

  scores: {
    overall: 68,
    technical: {
      title: "Technical Analysis",
      score: 72,
      reasoning: "Triangle pattern decent but lacks volume confirmation",
    },
    timing: {
      title: "Entry Timing",
      score: 65,
      reasoning: "Breakout timing okay but needs more momentum confirmation",
    },
    riskReward: {
      title: "Risk Reward",
      score: 70,
      reasoning: "1:2.2 ratio acceptable but targets may face resistance",
    },
    tradability: {
      title: "Tradability",
      score: 65,
      reasoning: "Requires Asian session monitoring, challenging timezone",
    },
  },

  technical: {
    trendScore: {
      title: "Trend Score",
      score: 75,
      reasoning: "Uptrend intact but momentum slowing on higher timeframes",
    },
    setupScore: {
      title: "Setup Score",
      score: 70,
      reasoning: "Triangle pattern visible but not textbook perfect",
    },
    confluenceScore: {
      title: "Confluence Score",
      score: 65,
      reasoning: "Pattern and resistance level align, lacking other factors",
    },
    clarityScore: {
      title: "Clarity Score",
      score: 78,
      reasoning: "Triangle boundaries clear, breakout level well-defined",
    },
    volumeScore: {
      title: "Volume Score",
      score: 0,
      reasoning: "Volume data not available on this chart",
    },
    technicalSummary: {
      title: "Technical Summary",
      description:
        "Ascending triangle with moderate bullish bias, needs confirmation",
    },
  },

  tradingReality: {
    timeCommitment: {
      title: "Time Commitment",
      description: "2-3 hours during Asian session (11PM-2AM GMT)",
    },
    sessionOptimal: {
      title: "Optimal Session",
      description: "Asian session 11:00 PM - 2:00 AM GMT for JPY volatility",
    },
    sleepRisk: {
      title: "Sleep Risk",
      description: "High - requires overnight monitoring during Asian hours",
    },
    weekendHold: {
      title: "Weekend Hold",
      description: "No - exit before weekend due to gap risk in JPY",
    },
    newsRisk: {
      title: "News Risk",
      description: "BoJ meeting next week could impact JPY positioning",
    },
    multitaskingRisk: {
      title: "Multitasking Risk",
      description: "High - needs active monitoring during breakout phase",
    },
    skillLevel: {
      title: "Skill Level",
      description:
        "Intermediate - triangle patterns require patience and precision",
    },
  },

  exitStrategy: {
    primaryExit: {
      title: "Primary Exit",
      description: "Take 30% at 149.20, 50% at 149.80, trail remainder",
    },
    partialProfits: {
      title: "Partial Profits",
      description: "30% at 149.20, 50% at 149.80, 20% trail to 150.50",
    },
    stopAdjustment: {
      title: "Stop Adjustment",
      description: "Move stop to 148.40 after price hits 149.00",
    },
    breakeven: {
      title: "Breakeven",
      description: "Move stop to 148.55 when price reaches 149.20",
    },
    trailMethod: {
      title: "Trail Method",
      description: "Trail 25 pips behind price once 50+ pips in profit",
    },
    timeStop: {
      title: "Time Stop",
      description: "Exit if no movement after 2 Asian sessions",
    },
    signalInvalidation: {
      title: "Signal Invalidation",
      description: "Exit if price falls back below 148.30 triangle support",
    },
    maxTimeInTrade: {
      title: "Max Time In Trade",
      description: "3 trading days maximum for this momentum play",
    },
  },
  execution: {
    type: {
      title: "Execution",
      description: "Buy",
    },
    currentPrice: {
      title: "Current Price",
      description: "148.52",
    },
    entryZone: {
      title: "Entry Zone",
      description: "148.50-148.55",
    },
    lotSize: {
      title: "Lot Size",
      description: "0.11",
    },
    stopLoss: {
      title: "Stop Loss",
      description: "148.15",
    },
    target1: {
      title: "Target 1",
      description: "149.20",
    },
    target2: {
      title: "Target 2",
      description: "149.80",
    },
    target3: {
      title: "Target 3",
      description: "150.20",
    },
    finalTarget: {
      title: "Final Target",
      description: "150.50",
    },
    support: {
      title: "Key Support",
      description: "148.30",
    },
    resistance: {
      title: "Key Resistance",
      description: "148.50",
    },
    riskReward: {
      title: "Risk Reward",
      description: "1:2.2",
    },
  },

  position: {
    accountRisk: 375,
    positionSize: "1.5 lots",
    riskPercent: "1.5%",
    maxDailyRisk: "4% if taking multiple JPY trades",
    correlationWarning: "Monitor USD strength across all pairs",
  },

  alternativeScenarios: {
    bullishScenario: {
      title: "Bullish Scenario",
      description:
        "Strong break above 149.00 - add to position with 148.70 stop",
    },
    bearishScenario: {
      title: "Bearish Scenario",
      description: "If fails at 148.50, wait for breakdown below 148.20",
    },
    sidewaysScenario: {
      title: "Sideways Scenario",
      description: "If consolidates 148.30-148.50, wait for clearer direction",
    },
    breakoutScenario: {
      title: "Breakout Scenario",
      description: "Volume spike above 148.60 - aggressive long entry",
    },
    invalidationScenario: {
      title: "Invalidation Scenario",
      description: "Close below 148.20 breaks triangle support completely",
    },
  },

  beginnerGuidance: {
    shouldNewbiesTrade: {
      title: "Should Newbies Trade",
      description: "paperTrade - triangle breakouts tricky for beginners",
    },
    whyNot: {
      title: "Why Not",
      description: "False breakouts common, requires Asian session monitoring",
    },
    learningFocus: {
      title: "Learning Focus",
      description: "Study triangle patterns and breakout confirmation methods",
    },
    commonMistake: {
      title: "Common Mistake",
      description: "Entering on first touch of resistance without confirmation",
    },
    practiceFirst: {
      title: "Practice First",
      description: "Practice triangle identification and measuring targets",
    },
  },

  dataLimitations: [
    "Volume data not visible",
    "No RSI or momentum indicators",
    "Missing higher timeframe context",
    "No order flow or positioning data",
  ],

  riskWarnings: {
    primaryRisk: {
      title: "Primary Risk",
      description: "False breakout very common with triangle patterns",
    },
    falseBreakoutRisk: {
      title: "False Breakout Risk",
      description: "High - 40% chance of fake breakout before real move",
    },
    newsEventRisk: {
      title: "News Event Risk",
      description: "BoJ meeting could cause sudden JPY volatility spike",
    },
    liquidityRisk: {
      title: "Liquidity Risk",
      description: "Lower liquidity during Asian session increases slippage",
    },
    correlationRisk: {
      title: "Correlation Risk",
      description: "USD strength could reverse quickly on Fed news",
    },
  },

  calculationData: {
    riskPips: 37, // 148.52 - 148.15 = 37 pips
    rewardPips: 68, // 149.20 - 148.52 = 68 pips
    target2Pips: 128, // 149.80 - 148.52 = 128 pips
    target3Pips: 168, // 150.20 - 148.52 = 168 pips
    riskRewardRatio: 1.84, // 68/37 = 1.84 ratio
    averageTimeToTarget: 24, // 24 hours average to profit
    maxHoldTime: 72, // 3 days maximum hold
    pipValue: 10, // $10 per pip for USD/JPY
    contractSize: 100000, // Standard lot size
  },

  actionPlan: {
    rightNow: {
      title: "Right Now",
      description: "Set breakout alert above 148.55 with volume filter",
    },
    waitFor: {
      title: "Wait For",
      description: "1-hour candle close above 148.60 with momentum",
    },
    entryMethod: {
      title: "Entry Method",
      description: "Enter long on pullback to 148.50-148.55 after breakout",
    },
    afterEntry: {
      title: "After Entry",
      description: "Set stop at 148.15 and first target alert at 149.20",
    },
    monitoring: {
      title: "Monitoring",
      description: "Watch for BoJ news and price action at resistance levels",
    },
    dailyReview: {
      title: "Daily Review",
      description: "Review triangle integrity and adjust stops if needed",
    },
  },
};
