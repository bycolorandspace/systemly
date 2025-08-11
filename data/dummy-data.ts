import { TradePlan, UserInputs } from "@/types/trading/analysisV2";

export const userInput: UserInputs = {
  accountCurrency: "GBP",
  accountSize: 1000,
  riskPerTrade: 1,
  tradingStyle: "Swing",
};

export const dummyData: TradePlan = {
  quickSignal: {
    direction: "BUY",
    strength: "MODERATE",
    confidence: "Medium",
    primaryReason:
      "Gold bouncing from weekly support at 2650 with hammer reversal pattern forming",
    timeframe: "Execute within next 4 hours",

    tradeJustification: {
      setup:
        "Hammer reversal candle forming at weekly support zone around 2650 level",
      momentum:
        "Oversold bounce with RSI showing bullish divergence from recent lows",
      keyLevels:
        "Strong support at 2650 (weekly level), resistance at 2675-2680 zone",
      riskReward:
        "1:1.8 ratio acceptable given high probability support level defense",
      timing:
        "London session opening coincides with potential reversal confirmation",
      invalidation:
        "Break and close below 2640 would signal major support failure",
    },

    execution: {
      entryMethod: "Stop",
      entryZone: "2652-2655",
      stopLoss: "2640",
      target1: "2675",
      target2: "2690",
      riskReward: "1:1.8",
    },

    position: {
      lotSize: "0.15",
      riskAmount: "$300",
      maxTimeInTrade: "24 hours",
    },
  },

  professionalInsights: {
    marketContext: {
      higherTimeframeTrend:
        "Daily shows consolidation within broader uptrend, weekly support holding strong",
      trendStage:
        "Middle stage of larger bullish cycle, healthy pullback to key support zone",
      weeklyMonthlyContext:
        "Monthly chart shows gold in multi-year bull market, current level is 38.2% retrace",
      trendAlignment:
        "Trading WITH the major trend on pullback to significant support level",
    },

    institutionalIntelligence: {
      smartMoneyClues:
        "Large volume spike at 2650 with immediate bounce suggests institutional accumulation",
      liquidityLevels:
        "Retail stops clustered below 2640, likely target for liquidity grab before rally",
      algorithmicLevels:
        "2650 is major round number and 200-period MA confluence creating algo buying zone",
      orderFlowSignals:
        "Absorption pattern visible - selling being absorbed by larger buyers at support",
      retailVsPro:
        "Retail likely short from higher levels, institutions accumulating at weekly support",
    },

    marketMicrostructure: {
      sessionDynamics:
        "London session opening providing increased liquidity for potential breakout move",
      correlationSignals:
        "USD weakening and bond yields falling supporting gold bullish bias currently",
      liquidityConsiderations:
        "Best execution during London-NY overlap for tightest spreads and fills",
      algorithmicBehavior:
        "Algos programmed to defend 2650 level based on historical significance",
    },

    psychologicalEdge: {
      crowdPositioning:
        "Retail sentiment overly bearish after recent decline, contrarian opportunity emerging",
      sentimentExtremes:
        "Fear domininating at key support - classic reversal setup for contrarian play",
      contrarianOpportunities:
        "When everyone expects breakdown below 2650, smart money often defends level",
      fundamentalBackdrop:
        "Fed pivot expectations and geopolitical tensions supporting gold demand",
    },

    executionMastery: {
      optimalEntry:
        "Use buy stop above current resistance to confirm momentum before committing capital",
      scalingStrategy:
        "Add 50% more size if breaks above 2665 with volume confirmation of breakout",
      profitOptimization:
        "Take 60% at first target, trail remaining 40% with 10-point trailing stop",
      dynamicStops:
        "Move stop to breakeven once trade shows 1:1 profit, then trail aggressively",
      exitScenarios: {
        quickProfit:
          "If hits target 1 within 4 hours, take full profit due to momentum",
        runner:
          "If sustained break above 2670, trail with 8-period EMA for potential 2700+ run",
        breakdown:
          "Exit immediately if closes below 2645 - support failure invalidates thesis",
      },
    },

    riskIntelligence: {
      hiddenRisks:
        "FOMC minutes release tomorrow could trigger volatility regardless of technical setup",
      invalidationSignals:
        "Any close below 2645 would signal major support failure and trend change",
      correlationRisks:
        "Long USD positions would work against this gold trade - manage exposure",
      timeBasedRisks:
        "Asian session gaps can occur overnight - consider reducing size before close",
      positionOptimization:
        "0.15 lot size optimal for this volatility environment and setup reliability",
    },

    marketRegimeContext: {
      currentRegime:
        "Transitional market between consolidation and trend resumption phase",
      regimeStrategy:
        "Use smaller size but higher conviction trades during transitional periods",
      volatilityEnvironment:
        "Medium volatility environment - normal position sizing appropriate",
      seasonalFactors:
        "London session provides best liquidity for gold trades during current market hours",
    },
  },
};

// export const dummyData: TradePlan = {
//   id: "trade_analysis_001",
//   title: "NAS100 4H : Long at Support amid Bullish Breakout",
//   summary: "Bullish breakout setup near support with solid upside targets",
//   detailedSummary:
//     "NASDAQ 100 on 4H shows bullish continuation after recent breakout above resistance. Clean structure with rising moving averages, positive RSI momentum and institutional accumulation. Defined entry with clear stop and multi-target exit strategy in line with swing trading approach.",
//   signal: "Bullish breakout with pullback entry near recent support zone",
//   confidence: "High",
//   timeframe: "4H - execute in the next 4-8 hours",
//   direction: "Long",
//   symbol: "NAS100",
//   trend: "Strong Bullish continuation",
//   recommendation: "Great opportunity",
//   scores: {
//     overall: {
//       title: "Overall Score",
//       score: 84,
//       status: "🟢 GOOD",
//       reasoning:
//         "Strong bullish continuation with clear structure & confluence",
//     },
//     technical: {
//       title: "Technical Analysis",
//       score: 85,
//       status: "🟢 EXCELLENT",
//       reasoning:
//         "Clear bullish structure, breakout confirmed, rising MA, RSI supportive",
//     },
//     timing: {
//       title: "Entry Timing",
//       score: 80,
//       status: "🟢 GOOD",
//       reasoning:
//         "Entry near pullback support after breakout, excellent timing window",
//     },
//     riskReward: {
//       title: "Risk Reward",
//       score: 80,
//       status: "🟢 GOOD",
//       reasoning: "Risk/reward over 1:2 with multiple targets achievable",
//     },
//     tradability: {
//       title: "Tradability",
//       score: 75,
//       status: "🟡 MODERATE",
//       reasoning:
//         "Requires monitoring due to news/events but manageable swing setup",
//     },
//   },
//   technical: {
//     trendScore: {
//       title: "Trend Score",
//       score: 85,
//       status: "🟢 EXCELLENT",
//       reasoning:
//         "Higher highs/lows visible, price above 9/21 EMA, strong bullish continuation phase since May after prior correction. Weekly and daily also show aligned bullish momentum.",
//     },
//     setupScore: {
//       title: "Setup Score",
//       score: 80,
//       status: "🟢 GOOD",
//       reasoning:
//         "Bullish breakout pullback setup; prior resistance now support around 21650. Entry zone well defined, setup historically reliable for continuation moves.",
//     },
//     confluenceScore: {
//       title: "Confluence Score",
//       score: 80,
//       status: "🟢 GOOD",
//       reasoning:
//         "Alignment across 4H, daily, weekly. MAs, RSI momentum, structure, and liquidity levels align for bullish continuation.",
//     },
//     clarityScore: {
//       title: "Clarity Score",
//       score: 90,
//       status: "🟢 EXCELLENT",
//       reasoning:
//         "Clear entry, stop and multiple targets well-defined; no ambiguity in trade plan.",
//     },
//     volumeScore: {
//       title: "Volume Score",
//       score: 0,
//       status: "🔘 N/A",
//       reasoning:
//         "Volume data not available on TradingView index chart for NAS100 CFD",
//     },
//     momentumScore: {
//       title: "Momentum Score",
//       score: 80,
//       status: "🟢 GOOD",
//       reasoning:
//         "RSI above 65, no overbought conditions yet; MACD rising; price shows healthy bullish energy without exhaustion signals.",
//     },
//     marketStructureScore: {
//       title: "Market Structure Score",
//       score: 85,
//       status: "🟢 EXCELLENT",
//       reasoning:
//         "Break of prior structure highs, consistent HH/HL pattern, recent bullish breakout confirms structure phase change.",
//     },
//     volatilityScore: {
//       title: "Volatility Score",
//       score: 75,
//       status: "🟢 GOOD",
//       reasoning:
//         "ATR expanding with controlled volatility, strong momentum breakout without extreme whipsaws.",
//     },
//     technicalSummary: {
//       title: "Technical Summary",
//       score: 85,
//       status: "🟢 EXCELLENT",
//       reasoning:
//         "Strong multi-timeframe bullish breakout structure supported by EMAs, RSI, price action and institutional buying behavior. Defined pullback entry close to breakout level offers excellent risk/reward opportunity within controlled volatility environment.",
//     },
//   },
//   marketContext: {
//     sessionActive: {
//       title: "Active Session",
//       description: "New York - peak liquidity and institutional flows",
//     },
//     correlatedAssets: {
//       title: "Correlated Assets",
//       description: "SPX, US Tech ETFs, USD movement",
//     },
//     institutionalBias: {
//       title: "Institutional Bias",
//       description: "Funds adding long tech exposure after breakout",
//     },
//     retailSentiment: {
//       title: "Retail vs Smart Money",
//       description: "Retail hesitant; smart money accumulating pullbacks",
//     },
//     liquidityZones: {
//       title: "Liquidity Zones",
//       description: "Liquidity clustered around 21600 & 21300 for stops",
//     },
//   },
//   professionalEdge: {
//     smartMoneyClues: {
//       title: "Smart Money Clues",
//       description: "Clean absorption at prior resistance; breakout strength",
//     },
//     orderFlowSignals: {
//       title: "Order Flow Signals",
//       description: "Large orders defending 21650 support after breakout",
//     },
//     algorithmicLevels: {
//       title: "Algorithmic Levels",
//       description: "Round levels: 21500, 22000 psychological zones",
//     },
//     newsDrivers: {
//       title: "News Drivers",
//       description: "Tech earnings, CPI inflation, Fed commentary",
//     },
//     timingEdge: {
//       title: "Timing Edge",
//       description: "NY session liquidity allows favorable entry windows",
//     },
//   },

//   exitStrategy: {
//     primaryExit: {
//       title: "Primary Exit",
//       description: "Exit fully at 22500 final target",
//     },
//     partialProfits: {
//       title: "Partial Profits",
//       description: "Take 30% at 21850, 30% at 22100",
//     },
//     stopAdjustment: {
//       title: "Stop Adjustment",
//       description: "Move stop to BE after first partial at 21850",
//     },
//     breakeven: {
//       title: "Breakeven",
//       description: "After first target hit at 21850",
//     },
//     trailMethod: {
//       title: "Trail Method",
//       description: "Trail below 9 EMA after BE triggered",
//     },
//     timeStop: {
//       title: "Time Stop",
//       description: "Exit if no movement after 72 hours",
//     },
//     signalInvalidation: {
//       title: "Signal Invalidation",
//       description: "Close if price closes below 21530",
//     },
//     maxTimeInTrade: {
//       title: "Max Time In Trade",
//       description: "72 hours",
//     },
//   },
//   execution: {
//     type: {
//       title: "Execution",
//       data: "Buy Limit",
//     },
//     currentPrice: {
//       title: "Current Price",
//       data: "21668.08",
//     },
//     entryZone: {
//       title: "Entry Zone",
//       data: "21650-21670",
//     },
//     lotSize: {
//       title: "Lot Size",
//       data: "0.13",
//     },
//     stopLoss: {
//       title: "Stop Loss",
//       data: "21530",
//     },
//     target1: {
//       title: "Target 1",
//       data: "21850",
//     },
//     target2: {
//       title: "Target 2",
//       data: "22100",
//     },
//     target3: {
//       title: "Target 3",
//       data: "22350",
//     },
//     finalTarget: {
//       title: "Final Target",
//       data: "22500",
//     },
//     support: {
//       title: "Key Support",
//       data: "21530",
//     },
//     resistance: {
//       title: "Key Resistance",
//       data: "21850",
//     },
//     riskReward: {
//       title: "Risk Reward",
//       data: "1:2.12",
//     },
//   },
//   position: {
//     accountRisk: "$12.70",
//     positionSize: "0.13",
//     riskPercent: "1% of account",
//     maxDailyRisk: "$12.70",
//     correlationWarning: "No correlated positions detected",
//   },
//   calculationData: {
//     riskPips: 138,
//     rewardPips: 182,
//     target2Pips: 432,
//     target3Pips: 682,
//     riskRewardRatio: 1.32,
//     averageTimeToTarget: 24,
//     maxHoldTime: 72,
//     pipValue: 1,
//     contractSize: 1,
//   },
//   alternativeScenarios: {
//     bullishScenario: {
//       title: "Bullish Scenario",
//       description: "Accelerates strongly toward 22500",
//     },
//     bearishScenario: {
//       title: "Bearish Scenario",
//       description: "Break below 21530 triggers stop",
//     },
//     sidewaysScenario: {
//       title: "Sideways Scenario",
//       description: "Consolidation between 21650-21850",
//     },
//     breakoutScenario: {
//       title: "Breakout Scenario",
//       description: "Break above 21850 extends gains",
//     },
//     invalidationScenario: {
//       title: "Invalidation Scenario",
//       description: "Daily close below 21530",
//     },
//   },
//   beginnerGuidance: {
//     shouldNewbiesTrade: {
//       title: "Should Newbies Trade",
//       description: "paperTrade",
//     },
//     whyNot: {
//       title: "Why Not",
//       description: "Requires precision on pullback entries",
//     },
//     learningFocus: {
//       title: "Learning Focus",
//       description: "Master breakout retest setups & partial exits",
//     },
//     commonMistake: {
//       title: "Common Mistake",
//       description: "Chasing late entries after breakout",
//     },
//     practiceFirst: {
//       title: "Practice First",
//       description: "Simulate limit entries near breakout retests",
//     },
//   },
//   dataLimitations: [
//     "Volume unavailable on index CFD",
//     "Order book data not visible",
//     "Some fundamental flows unquantifiable",
//     "Earnings surprise impact unpredictable",
//     "Intraday algo flows not shown",
//   ],
//   riskWarnings: {
//     primaryRisk: {
//       title: "Primary Risk",
//       description: "News-driven reversals on tech sector",
//     },
//     falseBreakoutRisk: {
//       title: "False Breakout Risk",
//       description: "Moderate risk if earnings disappoint",
//     },
//     newsEventRisk: {
//       title: "News Event Risk",
//       description: "CPI, Fed, tech earnings upcoming",
//     },
//     liquidityRisk: {
//       title: "Liquidity Risk",
//       description: "Gaps possible outside NY session",
//     },
//     correlationRisk: {
//       title: "Correlation Risk",
//       description: "High correlation to tech equities & SPX",
//     },
//   },
//   actionPlan: {
//     rightNow: {
//       title: "Right Now",
//       description: "Set limit orders within entry zone",
//     },
//     waitFor: {
//       title: "Wait For",
//       description: "Price dip into 21650-21670 zone",
//     },
//     entryMethod: {
//       title: "Entry Method",
//       description: "Limit buy order inside entry zone",
//     },
//     afterEntry: {
//       title: "After Entry",
//       description: "Monitor NY session reaction",
//     },
//     monitoring: {
//       title: "Monitoring",
//       description: "Watch for breakout toward targets",
//     },
//     dailyReview: {
//       title: "Daily Review",
//       description: "Review each 4H close for continuation",
//     },
//   },
// };

// export const dummyData: TradePlan = {
//   id: "trade_analysis_003",
//   title:
//     "GBPUSD 4H - €175 Potential: Short at Resistance amid Bearish Reversal",
//   summary:
//     "GBP weakening at key resistance with institutional selling. BoE dovish tone supporting downside move to 1.2650 target.",
//   detailedSummary:
//     "GBPUSD has reached critical 1.2820 resistance level with clear bearish momentum divergence and institutional distribution patterns evident. Bank of England's dovish commentary contrasts with Federal Reserve's hawkish stance, creating fundamental headwinds for GBP. Price action shows multiple rejections at resistance with smart money selling evident through absorption and volume analysis. 4H timeframe confirms bearish structure with lower highs forming and break of key support levels. Target 1.2650 with protective stop above 1.2845. Risk/reward of 1:2.4 offers excellent swing trading opportunity. Execute within next 4 hours during London session close for optimal institutional participation and volatility.",

//   signal:
//     "Short GBPUSD on resistance rejection with bearish divergence and institutional selling",
//   confidence: "high",
//   timeframe: "4H - execute in the next 4 hours",
//   direction: "short",
//   symbol: "GBPUSD",
//   trend: "bearish with strong momentum",
//   recommendation: "Great opportunity",

//   scores: {
//     overall: {
//       title: "Overall Score",
//       score: 84,
//       status: "🟢 GOOD",
//       reasoning:
//         "Exceptional setup with strong technical confluence and fundamental support for bearish bias",
//     },
//     technical: {
//       title: "Technical Analysis",
//       score: 88,
//       status: "🟢 EXCELLENT",
//       reasoning:
//         "Multiple bearish signals converging with resistance rejection and momentum divergence confirmation",
//     },
//     timing: {
//       title: "Entry Timing",
//       score: 82,
//       status: "🟢 GOOD",
//       reasoning:
//         "London session close provides institutional participation with optimal volatility window",
//     },
//     riskReward: {
//       title: "Risk Reward",
//       score: 89,
//       status: "🟢 EXCELLENT",
//       reasoning:
//         "1:2.4 ratio exceptional with clearly defined targets and conservative stop placement",
//     },
//     tradability: {
//       title: "Tradability",
//       score: 76,
//       status: "🟢 GOOD",
//       reasoning:
//         "Straightforward execution with manageable monitoring requirements for swing approach",
//     },
//   },

//   technical: {
//     trendScore: {
//       title: "Trend Score",
//       score: 85,
//       status: "🟢 EXCELLENT",
//       reasoning:
//         "Daily and 4H trends align bearishly with strong momentum indicators supporting downside continuation. Multiple timeframes show consistent bearish structure with breaking of key support levels. Trend sustainability high given fundamental backdrop and institutional positioning favoring GBP weakness.",
//     },
//     setupScore: {
//       title: "Setup Score",
//       score: 88,
//       status: "🟢 EXCELLENT",
//       reasoning:
//         "Classic resistance rejection pattern with bearish divergence completion and institutional distribution evident. Pattern shows high historical reliability with clear entry triggers and confirmation signals. Pattern invalidation levels well-defined above resistance zone.",
//     },
//     confluenceScore: {
//       title: "Confluence Score",
//       score: 90,
//       status: "🟢 EXCELLENT",
//       reasoning:
//         "Multiple timeframes converge bearishly with technical indicators, key resistance levels, and fundamental factors all supporting short bias. Exceptional alignment between price action, momentum indicators, and institutional sentiment creates high-probability setup.",
//     },
//     clarityScore: {
//       title: "Clarity Score",
//       score: 86,
//       status: "🟢 EXCELLENT",
//       reasoning:
//         "Entry signals crystal clear with well-defined resistance rejection and momentum confirmation. Targets and stops precisely defined with unambiguous trade management rules. Overall trade plan easily executable without interpretation conflicts.",
//     },
//     volumeScore: {
//       title: "Volume Score",
//       score: 78,
//       status: "🟢 GOOD",
//       reasoning:
//         "Volume analysis shows institutional distribution at resistance levels with absorption patterns confirming selling pressure. Volume divergence supports bearish bias with increasing selling interest on rallies to resistance zone.",
//     },
//     momentumScore: {
//       title: "Momentum Score",
//       score: 84,
//       status: "🟢 GOOD",
//       reasoning:
//         "RSI showing clear bearish divergence with MACD confirming momentum shift to downside. Stochastic overbought with negative divergence patterns. All momentum indicators align for continuation of bearish trend with acceleration signals present.",
//     },
//     marketStructureScore: {
//       title: "Market Structure Score",
//       score: 87,
//       status: "🟢 EXCELLENT",
//       reasoning:
//         "Lower highs and lower lows pattern established with key support breaks confirming bearish structure. Swing point analysis shows institutional selling at resistance with structure supporting continued downside movement toward next major support level.",
//     },
//     volatilityScore: {
//       title: "Volatility Score",
//       score: 79,
//       status: "🟢 GOOD",
//       reasoning:
//         "Volatility environment optimal for swing trading with expanding ranges supporting directional moves. ATR levels indicate sufficient movement potential for target achievement while maintaining manageable risk parameters for position sizing.",
//     },
//     technicalSummary: {
//       title: "Technical Summary",
//       score: 85,
//       status: "🟢 EXCELLENT",
//       reasoning:
//         "GBPUSD presenting exceptional bearish opportunity at 1.2820 resistance with multiple technical confluences supporting short bias. Resistance level shows strong institutional selling with clear momentum divergence and volume confirmation. Market structure has shifted bearish with lower highs pattern and key support breaks. Momentum indicators including RSI bearish divergence and MACD negative crossover confirm trend continuation. Volatility expansion supports directional movement toward 1.2650 target zone. Entry timing optimal during London session institutional activity with clear risk management parameters. Overall technical picture strongly favors continued GBP weakness with high probability target achievement.",
//     },
//   },

//   marketContext: {
//     sessionActive: {
//       title: "Active Session",
//       description:
//         "London session close - peak institutional GBP activity with optimal volatility",
//     },
//     correlatedAssets: {
//       title: "Correlated Assets",
//       description:
//         "DXY strengthening, UK gilt yields declining, FTSE underperforming supporting GBP weakness",
//     },
//     institutionalBias: {
//       title: "Institutional Bias",
//       description:
//         "Banks reducing GBP exposure, hedge funds increasing short positions on BoE dovishness",
//     },
//     retailSentiment: {
//       title: "Retail vs Smart Money",
//       description:
//         "Retail buying GBP dips while institutions distribute at resistance levels",
//     },
//     liquidityZones: {
//       title: "Liquidity Zones",
//       description:
//         "Retail stops above 1.2845, institutional sell orders stacked at 1.2815-1.2825",
//     },
//   },

//   professionalEdge: {
//     smartMoneyClues: {
//       title: "Smart Money Clues",
//       description:
//         "Heavy institutional selling at 1.2820 with absorption patterns and distribution",
//     },
//     orderFlowSignals: {
//       title: "Order Flow Signals",
//       description:
//         "Large sell orders evident through price rejection and volume accumulation patterns",
//     },
//     algorithmicLevels: {
//       title: "Algorithmic Levels",
//       description:
//         "1.2800 and 1.2750 round numbers as targets, 1.2850 as key algorithmic resistance",
//     },
//     newsDrivers: {
//       title: "News Drivers",
//       description:
//         "BoE dovish pivot vs Fed hawkish stance, UK economic data deteriorating",
//     },
//     timingEdge: {
//       title: "Timing Edge",
//       description:
//         "London session institutional flows optimal for GBP moves, ahead of UK inflation data",
//     },
//   },

//   tradingReality: {
//     timeCommitment: {
//       title: "Time Commitment",
//       description:
//         "Initial 2-3 hours monitoring, then daily management for swing approach",
//     },
//     sessionOptimal: {
//       title: "Optimal Session",
//       description:
//         "London session for entry, can manage during other sessions passively",
//     },
//     sleepRisk: {
//       title: "Sleep Risk",
//       description:
//         "Low - swing trade suitable for overnight holds with protective stops",
//     },
//     weekendHold: {
//       title: "Weekend Hold",
//       description: "Yes - fundamental drivers support holding over weekend",
//     },
//     newsRisk: {
//       title: "News Risk",
//       description:
//         "Medium - UK inflation data Wednesday could impact near-term direction",
//     },
//     multitaskingRisk: {
//       title: "Multitasking Risk",
//       description:
//         "Low - swing approach allows passive management after initial setup",
//     },
//     skillLevel: {
//       title: "Skill Level",
//       description:
//         "Intermediate - requires understanding of resistance levels and divergences",
//     },
//   },

//   exitStrategy: {
//     primaryExit: {
//       title: "Primary Exit",
//       description: "Take 50% at first target 1.2750, trail remainder to 1.2650",
//     },
//     partialProfits: {
//       title: "Partial Profits",
//       description: "25% at 1.2780, 50% at 1.2750, 25% at final target 1.2650",
//     },
//     stopAdjustment: {
//       title: "Stop Adjustment",
//       description: "Move to breakeven once price reaches 1.2780 level",
//     },
//     breakeven: {
//       title: "Breakeven",
//       description: "Adjust stop to entry +3 pips when first target approached",
//     },
//     trailMethod: {
//       title: "Trail Method",
//       description:
//         "Trail stop 20 pips behind swing highs after breakeven achieved",
//     },
//     timeStop: {
//       title: "Time Stop",
//       description: "Exit if no progress within 72 hours of entry",
//     },
//     signalInvalidation: {
//       title: "Signal Invalidation",
//       description: "Exit immediately if price breaks above 1.2845 resistance",
//     },
//     maxTimeInTrade: {
//       title: "Max Time In Trade",
//       description: "7 days maximum for swing trading approach",
//     },
//   },

//   execution: {
//     type: {
//       title: "Execution",
//       data: "Sell Stop",
//     },
//     currentPrice: {
//       title: "Current Price",
//       data: "1.2822",
//     },
//     entryZone: {
//       title: "Entry Zone",
//       data: "1.2815-1.2820",
//     },
//     lotSize: {
//       title: "Lot Size",
//       data: "1.18",
//     },
//     stopLoss: {
//       title: "Stop Loss",
//       data: "1.2845",
//     },
//     target1: {
//       title: "Target 1",
//       data: "1.2780",
//     },
//     target2: {
//       title: "Target 2",
//       data: "1.2750",
//     },
//     target3: {
//       title: "Target 3",
//       data: "1.2650",
//     },
//     finalTarget: {
//       title: "Final Target",
//       data: "1.2620",
//     },
//     support: {
//       title: "Key Support",
//       data: "1.2650",
//     },
//     resistance: {
//       title: "Key Resistance",
//       data: "1.2820",
//     },
//     riskReward: {
//       title: "Risk Reward",
//       data: "1:2.4",
//     },
//   },

//   position: {
//     accountRisk: "€100.00",
//     positionSize: "1.18 lots (£118,000 exposure)",
//     riskPercent: "2.0% of account",
//     maxDailyRisk: "€150 with other active positions",
//     correlationWarning:
//       "Monitor EUR correlation - could amplify currency exposure",
//   },

//   alternativeScenarios: {
//     bullishScenario: {
//       title: "Bullish Scenario",
//       description:
//         "Break above 1.2845 could target 1.2880-1.2920 next resistance zone",
//     },
//     bearishScenario: {
//       title: "Bearish Scenario",
//       description: "Strong breakdown below 1.2750 accelerates to 1.2650-1.2620",
//     },
//     sidewaysScenario: {
//       title: "Sideways Scenario",
//       description: "Range between 1.2750-1.2820, trade bounces off key levels",
//     },
//     breakoutScenario: {
//       title: "Breakout Scenario",
//       description:
//         "Volume breakdown below 1.2750 add position with 1.2620 target",
//     },
//     invalidationScenario: {
//       title: "Invalidation Scenario",
//       description:
//         "Daily close above 1.2845 negates bearish structure completely",
//     },
//   },

//   beginnerGuidance: {
//     shouldNewbiesTrade: {
//       title: "Should Newbies Trade",
//       description: "paperTrade",
//     },
//     whyNot: {
//       title: "Why Not",
//       description:
//         "Requires understanding of divergences and institutional flow analysis",
//     },
//     learningFocus: {
//       title: "Learning Focus",
//       description:
//         "Study resistance rejection patterns and momentum divergence signals",
//     },
//     commonMistake: {
//       title: "Common Mistake",
//       description:
//         "Entering too early without waiting for clear resistance rejection",
//     },
//     practiceFirst: {
//       title: "Practice First",
//       description:
//         "Practice identifying bearish divergences on demo account first",
//     },
//   },

//   dataLimitations: [
//     "Real-time institutional flow data unavailable for precise entry timing",
//     "Order book depth not visible affecting large position execution analysis",
//     "Cross-correlation with other GBP pairs limited without multiple feeds",
//     "Central bank intervention levels not publicly available for risk assessment",
//   ],

//   riskWarnings: {
//     primaryRisk: {
//       title: "Primary Risk",
//       description:
//         "Central bank intervention could reverse technical setup quickly",
//     },
//     falseBreakoutRisk: {
//       title: "False Breakout Risk",
//       description: "Medium - resistance tested multiple times recently",
//     },
//     newsEventRisk: {
//       title: "News Event Risk",
//       description:
//         "High - UK inflation data and BoE speakers during trade window",
//     },
//     liquidityRisk: {
//       title: "Liquidity Risk",
//       description: "Low during London session, higher during Asian transition",
//     },
//     correlationRisk: {
//       title: "Correlation Risk",
//       description:
//         "EUR correlation could amplify losses if USD weakens broadly",
//     },
//   },

//   calculationData: {
//     riskPips: 25,
//     rewardPips: 60,
//     target2Pips: 72,
//     target3Pips: 172,
//     riskRewardRatio: 2.4,
//     averageTimeToTarget: 48,
//     maxHoldTime: 168,
//     pipValue: 8.5,
//     contractSize: 100000,
//   },

//   actionPlan: {
//     rightNow: {
//       title: "Right Now",
//       description: "Set sell stop order at 1.2818 with stop at 1.2845",
//     },
//     waitFor: {
//       title: "Wait For",
//       description: "Bearish candle confirmation below 1.2818 for entry signal",
//     },
//     entryMethod: {
//       title: "Entry Method",
//       description: "Sell stop on break below 1.2818, not market sell order",
//     },
//     afterEntry: {
//       title: "After Entry",
//       description: "Set partial profit targets and confirm stop loss placement",
//     },
//     monitoring: {
//       title: "Monitoring",
//       description:
//         "Watch for momentum continuation and support level reactions",
//     },
//     dailyReview: {
//       title: "Daily Review",
//       description: "Check fundamental backdrop and adjust bias for news events",
//     },
//   },
// };
