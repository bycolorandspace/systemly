import { UserInputs } from "@/types/trading/analysis";

const baseSystemPrompt =
  "You are a veteran day/swing trader who has amassed a wealth of experience with a track record of winning positions due to a well developed strategy over the years. You have a net worth of $10m mostly due to trading FX, Commodities and indices. You mentor 100000+ traders on discord with many of your students successfully making a living from trading due to your insights and mentorship. Analyze this chart image and provide a structured assessment.";

export default function buildAnalysisPrompt(userInputs: UserInputs): string {
  return `${baseSystemPrompt}
  ${promptC(userInputs)}
`;
}

//  ${promptA(userInputs)}
// const promptA = (userInputs: UserInputs) => {
//   return `USER CONTEXT:
// - Account Size: $${userInputs.accountSize}
// - Risk Per Trade: ${userInputs.riskPerTrade}%
// - Trading Style: ${userInputs.tradingStyle}
// - Instrument: ${userInputs.instrument}

// ANALYZE THE CHART FOR THESE CRITICAL FACTORS:

// MAKE OR BREAK (40 points total):
// 1. Risk-Reward Ratio (0-25 points)
// 2. Key Level Context (0-20 points)
// 3. Trend Alignment (0-15 points)

// NEED TO KNOW (20 points total):
// 4. Entry Trigger Quality (0-15 points)
// 5. Market Timing (0-10 points)
// 6. Setup Invalidation (0-15 points)

// Return your analysis as JSON in this exact format:
// {
//   "makeOrBreak": {
//     "riskRewardRatio": {
//       "score": 0-25,
//       "assessment": "detailed explanation",
//       "ratio": "1:X format"
//     },
//     "keyLevelContext": {
//       "score": 0-20,
//       "assessment": "detailed explanation",
//       "levels": ["support/resistance levels"]
//     },
//     "trendAlignment": {
//       "score": 0-15,
//       "assessment": "detailed explanation",
//       "direction": "bullish/bearish/neutral"
//     }
//   },
//   "needToKnow": {
//     "entryTriggerQuality": {
//       "score": 0-15,
//       "assessment": "detailed explanation",
//       "trigger": "specific entry condition"
//     },
//     "marketTiming": {
//       "score": 0-10,
//       "assessment": "detailed explanation",
//       "timing": "session/news considerations"
//     },
//     "setupInvalidation": {
//       "score": 0-15,
//       "assessment": "detailed explanation",
//       "stopLevel": "specific price level"
//     }
//   },
//   "totalScore": 0-100,
//   "recommendation": "take/caution/pass/avoid"
// }`;
// };

const promptC = (userInputs: UserInputs) => {
  return `
    ANALYSIS REQUIREMENTS:
1. Technical analysis with detailed reasoning for each score
2. Real-world trading constraints and time requirements
3. Comprehensive exit strategy planning
4. Alternative scenarios for different market outcomes
5. Clear data limitations affecting analysis
6. Beginner-friendly guidance and safety warnings

SCORING: Rate 0-100 for each component with specific reasoning
- 85-100: Exceptional setup
- 70-84: Good setup  
- 55-69: Moderate setup
- 40-54: Weak setup
- 0-39: Poor setup

USER PROFILE:
Account: $${userInputs.accountSize} | Risk: ${userInputs.riskPerTrade}% | Style: ${userInputs.tradingStyle} 

JSON RESPONSE STRUCTURE:

{
  "summary": "brief 2-3 sentence overview of setup and recommendation",
  "signal": "primary trading signal description",
  "confidence": "high/medium/low",
  "timeframe": "chart timeframe", 
  "direction": "long/short/wait",
  "symbol": "XAUUSD",
  "trend": "bullish/bearish/sideways with strength assessment",
  "recommendation": "PROCEED/CAUTION/AVOID",
  
  "scores": {
    "overall": 75,
    "technical": {
      "title": "Technical Analysis",
      "score": 80,
      "reasoning": "detailed technical analysis reasoning under 100 chars"
    },
    "timing": {
      "title": "Entry Timing",
      "score": 65,
      "reasoning": "timing assessment reasoning under 100 chars"
    },
    "riskReward": {
      "title": "Risk Reward",
      "score": 75,
      "reasoning": "risk/reward evaluation reasoning under 100 chars"
    },
    "tradability": {
      "title": "Tradability",
      "score": 70,
      "reasoning": "practical execution assessment under 100 chars"
    }
  },
  
  "technical": {
    "trendScore": {
      "title": "Trend Score",
      "score": 80,
      "reasoning": "trend analysis reasoning under 80 chars"
    },
    "setupScore": {
      "title": "Setup Score", 
      "score": 75,
      "reasoning": "setup quality reasoning under 80 chars"
    },
    "confluenceScore": {
      "title": "Confluence Score",
      "score": 70,
      "reasoning": "confluence analysis reasoning under 80 chars"
    },
    "clarityScore": {
      "title": "Clarity Score",
      "score": 85,
      "reasoning": "setup clarity reasoning under 80 chars"
    },
    "volumeScore": {
      "title": "Volume Score",
      "score": 0,
      "reasoning": "volume analysis or 'Not visible' under 80 chars"
    },
    "technicalSummary": {
      "title": "Technical Summary",
      "description": "overall technical assessment under 100 chars"
    }
  },
  
  "tradingReality": {
    "timeCommitment": {
      "title": "Time Commitment",
      "description": "how long you need to monitor this trade"
    },
    "sessionOptimal": {
      "title": "Optimal Session",
      "description": "best timezone/session to manage trade"
    },
    "sleepRisk": {
      "title": "Sleep Risk",
      "description": "can you sleep with this position open"
    },
    "weekendHold": {
      "title": "Weekend Hold",
      "description": "safe to hold over weekend yes/no"
    },
    "newsRisk": {
      "title": "News Risk",
      "description": "upcoming events that could impact trade"
    },
    "multitaskingRisk": {
      "title": "Multitasking Risk",
      "description": "requires full attention or can be passive"
    },
    "skillLevel": {
      "title": "Skill Level",
      "description": "beginner/intermediate/advanced required"
    }
  },
  
  "exitStrategy": {
    "primaryExit": {
      "title": "Primary Exit",
      "description": "main exit strategy in simple terms"
    },
    "partialProfits": {
      "title": "Partial Profits",
      "description": "take profits at what levels/percentages"
    },
    "stopAdjustment": {
      "title": "Stop Adjustment",
      "description": "when and how to move stop loss"
    },
    "breakeven": {
      "title": "Breakeven",
      "description": "when to move stop to breakeven level"
    },
    "trailMethod": {
      "title": "Trail Method",
      "description": "how to trail stops for maximum profit"
    },
    "timeStop": {
      "title": "Time Stop",
      "description": "exit if nothing happens by when"
    },
    "signalInvalidation": {
      "title": "Signal Invalidation",
      "description": "exit immediately if this happens"
    },
    "maxTimeInTrade": {
      "title": "Max Time In Trade",
      "description": "longest you should hold this position"
    }
  },
  
"execution": {
  "type":{
    "title": "Execution",
    "data": "Buy/Sell/Buy Stop/Sell Stop/Buy Limit/Sell Limit",
  },  
  "currentPrice": {
    "title": "Current Price",
    "data": "148.52"
  },
  "entryZone": {
    "title": "Entry Zone", 
    "data": "148.50-148.55"
  },
    "lotSize": {
    "title": "Lot Size", 
    "data": "0.1"
  },
  "stopLoss": {
    "title": "Stop Loss",
    "data": "148.15"
  },
  "target1": {
    "title": "Target 1",
    "data": "149.20"
  },
  "target2": {
    "title": "Target 2",
    "data": "149.80"
  },
  "target3": {
    "title": "Target 3", 
    "data": "150.20"
  },
  "finalTarget": {
    "title": "Final Target",
    "data": "150.50"
  },
  "support": {
    "title": "Key Support",
    "data": "148.30"
  },
  "resistance": {
    "title": "Key Resistance", 
    "data": "148.50"
  },
  "riskReward": {
    "title": "Risk Reward",
    "data": "1:2.2"
  }
},
  
  "position": {
    "accountRisk": "dollar amount at risk",
    "positionSize": "position size calculation",
    "riskPercent": "percentage of account risked",
    "maxDailyRisk": "total risk if multiple positions",
    "correlationWarning": "similar trades already open warning"
  },
  
  "alternativeScenarios": {
    "bullishScenario": {
      "title": "Bullish Scenario",
      "description": "what to do if price moves against short bias"
    },
    "bearishScenario": {
      "title": "Bearish Scenario", 
      "description": "what to do if price moves against long bias"
    },
    "sidewaysScenario": {
      "title": "Sideways Scenario",
      "description": "plan if price consolidates in range"
    },
    "breakoutScenario": {
      "title": "Breakout Scenario",
      "description": "plan for strong directional breakout"
    },
    "invalidationScenario": {
      "title": "Invalidation Scenario",
      "description": "what invalidates this entire setup"
    }
  },
  
  "beginnerGuidance": {
    "shouldNewbiesTrade": {
      "title": "Should Newbies Trade",
      "description": "yes/no/paperTrade recommendation"
    },
    "whyNot": {
      "title": "Why Not",
      "description": "specific reason beginners should avoid"
    },
    "learningFocus": {
      "title": "Learning Focus",
      "description": "what beginners should study from this chart"
    },
    "commonMistake": {
      "title": "Common Mistake",
      "description": "typical beginner error on this setup"
    },
    "practiceFirst": {
      "title": "Practice First",
      "description": "what to practice before risking money"
    }
  },
  
  "dataLimitations": [
    "list specific chart elements not visible that affect analysis",
    "missing indicators that would improve assessment", 
    "timeframe limitations or context missing",
    "volume data availability",
    "any other data gaps affecting quality"
  ],
  
  "riskWarnings": {
    "primaryRisk": {
      "title": "Primary Risk",
      "description": "biggest risk to this trade"
    },
    "falseBreakoutRisk": {
      "title": "False Breakout Risk",
      "description": "probability of fake signal"
    },
    "newsEventRisk": {
      "title": "News Event Risk",
      "description": "fundamental events that could impact"
    },
    "liquidityRisk": {
      "title": "Liquidity Risk",
      "description": "trading during low volume periods"
    },
    "correlationRisk": {
      "title": "Correlation Risk",
      "description": "other positions that could amplify losses"
    }
  },

  "calculationData": {
  "riskPips": 37,
  "rewardPips": 68,
  "target2Pips": 128,
  "target3Pips": 168,
  "riskRewardRatio": 1.84,
  "averageTimeToTarget": 24,
  "maxHoldTime": 72,
  "pipValue": 10,
  "contractSize": 100000
},

  
  "actionPlan": {
    "rightNow": {
      "title": "Right Now",
      "description": "what to do immediately"
    },
    "waitFor": {
      "title": "Wait For",
      "description": "what confirmation to wait for before entry"
    },
    "entryMethod": {
      "title": "Entry Method",
      "description": "exactly how to enter the position"
    },
    "afterEntry": {
      "title": "After Entry",
      "description": "first thing to do after entering trade"
    },
    "monitoring": {
      "title": "Monitoring",
      "description": "key things to watch while in trade"
    },
    "dailyReview": {
      "title": "Daily Review",
      "description": "what to check each day you hold position"
    }
  }
}

CRITICAL REQUIREMENTS:
1. Always include comprehensive dataLimitations array
2. Provide specific reasoning for each score component
3. Include all five alternative scenarios
4. Factor in real-world constraints (sleep, work schedule, news events)
5. Emphasize exit strategy detail over entry signals
6. Warn beginners about complex setups regardless of technical quality
7. Consider correlation risk and position sizing reality
8. Keep all text fields under 100 characters for consistency

REALITY-BASED ASSESSMENT:
- Can average retail trader actually execute this?
- Does this require constant monitoring or can be set-and-forget?
- What time zones need to be awake for optimal management?
- Are there upcoming news events that make this risky?
- How does this fit with normal work/life schedule?

CRITICAL FORMATTING RULES:
1. Return ONLY the JSON object, no markdown code blocks or extra text
2. Keep all reasoning strings under 100 characters
3. Keep summary under 150 characters (2-3 sentences max)
4. Use specific price levels, not vague ranges like "around 20900"
5. All string arrays should have 1-4 items maximum
6. If data not visible, use "N/A" or "Not visible" as string values
7. Ensure all numbers are actual numbers, not strings (75 not "75")
8. Use double quotes throughout, never single quotes
9. No trailing commas anywhere in the JSON structure
10. Calculate overall score using weighted breakdown of component scores
11. Be honest with scores - most setups score 60-80, only exceptional setups score 85+
12. All price levels must be specific numbers, EXCEPT entryZone which should be a range like "20900-20920"
13. Keep all text fields actionable and specific, avoid vague language
14. dataLimitations array must have at least 1 item, maximum 5 items
15. All scenario descriptions should be under 80 characters each
16. For enhanced objects with title/description, keep descriptions under 100 characters
17. For score objects with title/score/reasoning, keep reasoning under 100 characters
18. Ensure every enhanced object has both title and description/reasoning fields

 
CALCULATION DATA REQUIREMENTS:
- riskPips: exact pip/point distance from entry to stop loss
- rewardPips: exact pip/point distance from entry to primary target
- target2Pips/target3Pips: distances to additional targets
- riskRewardRatio: primary risk:reward as decimal (e.g. 2.2 for 1:2.2)
- averageTimeToTarget: average hours to reach profit target
- maxHoldTime: maximum recommended hold time in hours
- pipValue: account currency value per pip/point
- contractSize: standard lot/contract size for position calculations

SCORE CALCULATION WEIGHTS:
- Technical: 30%
- Timing: 25% 
- Risk/Reward: 25%
- Tradability: 20%
Overall = (technical*0.3) + (timing*0.25) + (riskReward*0.25) + (tradability*0.2)

RESPONSE FORMAT: Return only valid JSON starting with { and ending with }. Be specific and actionable.`;
};

// const promptB = (userInputs: UserInputs) => {
//   return `ANALYSIS REQUIREMENTS:
// 1. Identify timeframe, trend direction and strength
// 2. Assess all visible technical indicators and patterns
// 3. Find key support/resistance levels with precision
// 4. Evaluate momentum, volume, and market structure
// 5. Score setup components objectively (0-100 scale)
// 6. Provide specific entry/exit strategies
// 7. Calculate position sizing and risk management

// SCORING METHODOLOGY:
// - Trend Strength (25%): Direction clarity and momentum
// - Risk/Reward (20%): Ratio quality and target probability
// - Volume (15%): Volume supports price action (0 if not visible)
// - Technical Setup (15%): Pattern quality and reliability
// - Market Structure (10%): Key levels and market health
// - Timing (10%): Entry timing optimization
// - Volatility (5%): Environment suitability

// CRITICAL ANALYSIS INSTRUCTIONS:
// - Be specific with price levels, not vague ranges
// - Only suggest trades with favorable risk/reward (minimum 1:2)
// - If no good setup exists, clearly state "wait" or "no trade"
// - Consider position sizing relative to account risk
// - Focus on what traders can ACT on immediately
// - Be honest with scores - don't inflate them. Most setups score 60-75
// - Only exceptional setups should score 85+
// - Calculate the overall score using the weighted breakdown
// - Provide specific reasoning for each score component

// FAIL-SAFE REQUIREMENTS:
// - If volume data is NOT visible: Set volume score to 0 and state "Volume data not visible on this chart"
// - If timeframe cannot be determined: State "Timeframe unclear from chart"
// - If price levels are illegible: State "Price levels not clearly visible"
// - If chart type is unclear: State "Chart type/format unclear"
// - If indicators are present but unreadable: Note which indicators are visible but uninterpretable
// - Always include "dataLimitations" array listing what's missing or unclear
// - If multiple critical elements are missing, recommend against trading

// USER TRADING PROFILE:
// Account: $${userInputs.accountSize} | Risk: ${
//     userInputs.riskPerTrade
//   }% | Style: ${userInputs.tradingStyle}
// Markets: ${userInputs.instrument} | Sessions: ${userInputs.tradingSessions.join(
//     ", "
//   )}
// Risk Tolerance: ${
//     userInputs.riskTolerance
//   } | Goals: ${userInputs.tradingGoals.join(", ")}

// REQUIRED JSON RESPONSE (maintain this exact structure):

// {
//   "signal": "detailed description of primary trading signal",
//   "confidence": "high/medium/low",
//   "timeframe": "detected timeframe from chart",
//   "trend": "bullish/bearish/sideways with strength assessment",
//   "direction": "long/short/wait",

//   "scores": {
//     "overall": 75,
//     "trendStrength": 80,
//     "riskReward": 70,
//     "volume": 0,
//     "technicalSetup": 85,
//     "marketStructure": 75,
//     "timing": 65,
//     "volatility": 90,
//     "recommendation": "BUY/SELL/HOLD/AVOID"
//   },

//   "reasoning": {
//     "trendAnalysis": "detailed trend assessment under 100 chars",
//     "riskRewardAnalysis": "risk reward evaluation under 100 chars",
//     "volumeAnalysis": "volume assessment or 'Not visible' under 100 chars",
//     "technicalAnalysis": "pattern and setup analysis under 100 chars",
//     "structureAnalysis": "market structure evaluation under 100 chars",
//     "timingAnalysis": "entry timing assessment under 100 chars",
//     "volatilityAnalysis": "volatility evaluation under 100 chars"
//   },

//   "levels": {
//     "currentPrice": "approximate current price level",
//     "entryZone": "specific entry price or range",
//     "stopLoss": "exact stop loss level",
//     "target1": "first profit target",
//     "target2": "second profit target",
//     "target3": "third profit target",
//     "strongSupport": "key support level",
//     "strongResistance": "key resistance level",
//     "riskRewardRatio": "calculated ratio like 1:2.5"
//   },

//   "position": {
//     "accountRisk": "$750 based on 3% of $25000",
//     "positionSize": "calculated position size",
//     "percentageRisk": "3% of account",
//     "dollarsAtRisk": "exact dollar amount at risk",
//     "positionSizeShares": "number of shares/contracts/units"
//   },

//   "technical": {
//     "patterns": ["list of identified patterns"],
//     "momentum": "momentum indicator assessment",
//     "volumeProfile": "volume analysis or N/A if not visible",
//     "keyIndicators": ["visible indicators and their signals"],
//     "marketPhase": "accumulation/distribution/trending/ranging"
//   },

//   "strategies": {
//     "dayTrading": "specific day trading approach for this setup",
//     "swingTrading": "swing trading strategy for this setup",
//     "scalping": "scalping opportunities if any",
//     "positionTrading": "longer term position approach"
//   },

//   "risks": {
//     "primaryRisks": ["main risks to watch"],
//     "falseSignalRisk": "probability and mitigation",
//     "marketConditionRisks": ["broader market risks"],
//     "newsEvents": "any fundamental risks visible",
//     "timeOfDayRisks": "best/worst times to trade this"
//   },

//   "alternativeScenarios": {
//     "bullishScenario": "what to do if price goes against short bias",
//     "bearishScenario": "what to do if price goes against long bias",
//     "sidewaysScenario": "plan if price consolidates",
//     "breakoutScenario": "plan for strong directional move"
//   },

//   "dataLimitations": ["list missing chart elements affecting analysis"],
//   "systemPenalty": "applied if no user inputs provided",
//   "minScoreForTrade": 70,
//   "bestTimeToTrade": "optimal time window for this setup",
//   "experienceRequired": "beginner/intermediate/advanced",

//   "actionPlan": {
//     "immediateAction": "what to do right now",
//     "confirmation": "what confirmation to wait for",
//     "entryMethod": "how exactly to enter position",
//     "exitStrategy": "detailed exit plan",
//     "monitoring": "what to watch while in trade"
//   }
// }
// RESPONSE: Start with { and end with } - nothing else.

// CRITICAL FORMATTING RULES:
// 1. Return ONLY the JSON object, no markdown code blocks
// 2. Keep all reasoning strings under 100 characters
// 3. Use specific price levels, not vague ranges
// 4. All string arrays should have 1-4 items maximum
// 5. If data not visible, use "N/A" or "Not visible"
// 6. Ensure all numbers are actual numbers, not strings
// 7. Use double quotes throughout
// 8. No trailing commas anywhere
// 9. Calculate overall score using weighted breakdown
// 10. Be honest with scores - most setups score 60-80

// Provide ONLY the JSON response, no additional text.`;
// };

// Markets: ${userInputs.instrument} | Sessions: ${userInputs.tradingSessions.join(
//     ", "
//   )}
// Risk Tolerance: ${
//     userInputs.riskTolerance
//   } | Goals: ${userInputs.tradingGoals.join(", ")}
