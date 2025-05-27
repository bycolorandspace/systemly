// Using user input: {
//   scenario: 'scenario3',
//   accountSize: 2500,
//   riskPerTrade: 1,
//   tradingStyle: 'Position Trade',
//   instrument: 'XAU/USD',
//   tradingSessions: [ 'NY', 'LDN' ],
//   marketPreferences: [ 'Trending Markets', 'Economic Events' ],
//   riskTolerance: 'low',
//   tradingGoals: [ 'Inflation Hedge', 'Long-term Growth' ]
// }
// Image base64 length: 466388
// OpenAI response: {
//   id: 'chatcmpl-BamO5HwX2f0dOlmiS3QRuMqgWm1p8',
//   object: 'chat.completion',
//   created: 1748105509,
//   model: 'gpt-4.1-mini-2025-04-14',
//   choices: [
//     {
//       index: 0,
//       message: [Object],
//       logprobs: null,
//       finish_reason: 'stop'
//     }
//   ],
//   usage: {
//     prompt_tokens: 4032,
//     completion_tokens: 893,
//     total_tokens: 4925,
//     prompt_tokens_details: { cached_tokens: 0, audio_tokens: 0 },
//     completion_tokens_details: {
//       reasoning_tokens: 0,
//       audio_tokens: 0,
//       accepted_prediction_tokens: 0,
//       rejected_prediction_tokens: 0
//     }
//   },
//   service_tier: 'default',
//   system_fingerprint: 'fp_38647f5e19'
// }
// Parsed Analysis:  {
//   signal: 'Price shows a short-term pullback within a broader downtrend; potential short entry on MA cross confirmation',
//   confidence: 'medium',
//   timeframe: '30-minute',
//   trend: 'bearish with moderate strength',
//   direction: 'short',
//   scores: {
//     overall: 68,
//     trendStrength: 70,
//     riskReward: 65,
//     volume: 0,
//     technicalSetup: 70,
//     marketStructure: 65,
//     timing: 60,
//     volatility: 75,
//     recommendation: 'AVOID'
//   },
//   reasoning: {
//     trendAnalysis: 'Price below 21 and 9 MA, downtrend forming',
//     riskRewardAnalysis: 'Targets offer ~1:1.8 risk/reward, below ideal 1:2',
//     volumeAnalysis: 'Volume data not visible on this chart',
//     technicalAnalysis: 'MA cross bearish but no strong reversal pattern',
//     structureAnalysis: 'Support near 20,800; resistance near 21,118',
//     timingAnalysis: 'Entry timing premature; wait for clearer confirmation',
//     volatilityAnalysis: 'Moderate volatility suitable for swing trades'
//   },
//   levels: {
//     currentPrice: 20915,
//     entryZone: '20900-20920',
//     stopLoss: 21020,
//     target1: 20800,
//     target2: 20750,
//     target3: 20700,
//     strongSupport: 20800,
//     strongResistance: 21118,
//     riskRewardRatio: '1:1.8'
//   },
//   position: {
//     accountRisk: 25,
//     positionSize: 0.012,
//     percentageRisk: 1,
//     dollarsAtRisk: 25,
//     positionSizeShares: 12
//   },
//   technical: {
//     patterns: [ 'MA bearish cross', 'lower highs' ],
//     momentum: 'momentum weakening, bearish bias',
//     volumeProfile: 'Not visible',
//     keyIndicators: [ '9 and 21 MA bearish cross' ],
//     marketPhase: 'early trending down'
//   },
//   strategies: {
//     dayTrading: 'Wait for retest of resistance near 21020 for short',
//     swingTrading: 'Short on confirmation below 20900 with tight stop',
//     scalping: 'No clear scalping edge currently',
//     positionTrading: 'Avoid due to unclear long-term trend'
//   },
//   risks: {
//     primaryRisks: [ 'false breakout', 'sudden reversal' ],
//     falseSignalRisk: 'medium; confirm with volume and price action',
//     marketConditionRisks: [ 'news volatility', 'market sentiment shifts' ],
//     newsEvents: 'No visible fundamental catalysts',
//     timeOfDayRisks: 'Avoid late session due to low liquidity'
//   },
//   alternativeScenarios: {
//     bullishScenario: 'If price breaks above 21118, consider long with stop below 21020',
//     bearishScenario: 'If price breaks below 20800, add to short positions',
//     sidewaysScenario: 'Wait for breakout from 20800-21118 range',
//     breakoutScenario: 'Trade breakout with volume confirmation'
//   },
//   dataLimitations: [
//     'Volume data not visible',
//     'No RSI or MACD indicators',
//     'No daily/weekly context'
//   ],
//   systemPenalty: 0,
//   minScoreForTrade: 70,
//   bestTimeToTrade: 'London and New York sessions',
//   experienceRequired: 'intermediate',
//   actionPlan: {
//     immediateAction: 'Wait for price to retest 21020 resistance',
//     confirmation: 'Bearish rejection candle at resistance',
//     entryMethod: 'Enter short on candle close below 20900',
//     exitStrategy: 'Take profits at 20800, 20750, 20700; stop at 21020',
//     monitoring: 'Watch for volume spikes and price action near levels'
//   }
// }

// "exitStrategy": {
//   "partialProfit": "take profits at what intervals",
//   "stopAdjustment": "when and how to move stops",
//   "breakeven": "when to move stop to breakeven",
//   "trailMethod": "how to trail stops for max profit",
//   "timeStop": "exit if nothing happens by when",
//   "signalChange": "exit if setup invalidated how"
// }

// Separate Pre-Trading Psychology Questionnaire JSON
// const preTradingQuestionnaire = {
//   "questionnaire": {
//     "title": "Pre-Trading Psychology Check",
//     "description": "Complete this quick assessment before every trade to improve your success rate",
//     "questions": [
//       {
//         "id": "emotional_state",
//         "question": "How are you feeling right now?",
//         "type": "single_choice",
//         "options": [
//           { "value": "calm", "label": "Calm and focused", "score": 10 },
//           { "value": "excited", "label": "Excited about opportunities", "score": 7 },
//           { "value": "anxious", "label": "Anxious or nervous", "score": 4 },
//           { "value": "frustrated", "label": "Frustrated or angry", "score": 2 },
//           { "value": "desperate", "label": "Desperate to make money", "score": 0 }
//         ]
//       },
//       {
//         "id": "recent_performance",
//         "question": "What happened in your last 3 trades?",
//         "type": "single_choice",
//         "options": [
//           { "value": "mixed", "label": "Mix of wins and losses", "score": 10 },
//           { "value": "mostly_wins", "label": "Mostly wins", "score": 8 },
//           { "value": "small_losses", "label": "Small losses", "score": 7 },
//           { "value": "big_wins", "label": "Big wins", "score": 5 },
//           { "value": "big_losses", "label": "Big losses", "score": 2 }
//         ]
//       },
//       {
//         "id": "motivation",
//         "question": "Why do you want to take this trade?",
//         "type": "single_choice",
//         "options": [
//           { "value": "good_setup", "label": "It fits my trading plan perfectly", "score": 10 },
//           { "value": "decent_setup", "label": "Decent setup with good risk/reward", "score": 8 },
//           { "value": "fomo", "label": "Don't want to miss the move", "score": 3 },
//           { "value": "revenge", "label": "Need to make back recent losses", "score": 1 },
//           { "value": "bored", "label": "Haven't traded in a while", "score": 2 }
//         ]
//       },
//       {
//         "id": "conviction_level",
//         "question": "How confident are you in this trade setup?",
//         "type": "scale",
//         "min": 1,
//         "max": 10,
//         "labels": {
//           "1": "Very uncertain",
//           "5": "Moderately confident",
//           "10": "Extremely confident"
//         }
//       },
//       {
//         "id": "patience_level",
//         "question": "How long did you wait/analyze before considering this trade?",
//         "type": "single_choice",
//         "options": [
//           { "value": "planned", "label": "Part of pre-planned watchlist", "score": 10 },
//           { "value": "hours", "label": "Watched for several hours", "score": 8 },
//           { "value": "minutes", "label": "Analyzed for 15-30 minutes", "score": 6 },
//           { "value": "quick", "label": "Quick 5 minute look", "score": 3 },
//           { "value": "impulse", "label": "Immediate impulse trade", "score": 0 }
//         ]
//       },
//       {
//         "id": "risk_comfort",
//         "question": "How do you feel about the risk on this trade?",
//         "type": "single_choice",
//         "options": [
//           { "value": "comfortable", "label": "Completely comfortable with potential loss", "score": 10 },
//           { "value": "acceptable", "label": "Acceptable risk for the opportunity", "score": 8 },
//           { "value": "nervous", "label": "A bit nervous about the risk", "score": 5 },
//           { "value": "scary", "label": "The risk makes me uncomfortable", "score": 2 },
//           { "value": "cant_afford", "label": "Can't really afford to lose this", "score": 0 }
//         ]
//       },
//       {
//         "id": "exit_plan_clarity",
//         "question": "How clear is your exit strategy?",
//         "type": "single_choice",
//         "options": [
//           { "value": "very_clear", "label": "Exact levels and rules defined", "score": 10 },
//           { "value": "mostly_clear", "label": "General plan with some flexibility", "score": 7 },
//           { "value": "basic", "label": "Basic stop loss and target", "score": 5 },
//           { "value": "vague", "label": "Will figure it out as I go", "score": 2 },
//           { "value": "no_plan", "label": "No specific exit plan", "score": 0 }
//         ]
//       },
//       {
//         "id": "time_availability",
//         "question": "How much time can you dedicate to monitoring this trade?",
//         "type": "single_choice",
//         "options": [
//           { "value": "full_time", "label": "Can monitor constantly", "score": 10 },
//           { "value": "regular", "label": "Check every 30-60 minutes", "score": 8 },
//           { "value": "periodic", "label": "Check few times per day", "score": 6 },
//           { "value": "limited", "label": "Check once or twice daily", "score": 4 },
//           { "value": "set_forget", "label": "Set and forget only", "score": 3 }
//         ]
//       }
//     ],
//     "scoring": {
//       "excellent": { "min": 75, "max": 100, "recommendation": "PROCEED", "message": "Excellent psychological state for trading" },
//       "good": { "min": 60, "max": 74, "recommendation": "PROCEED_CAUTION", "message": "Good state but stay alert to emotional changes" },
//       "moderate": { "min": 45, "max": 59, "recommendation": "CAUTION", "message": "Some psychological risks - consider smaller position" },
//       "poor": { "min": 30, "max": 44, "recommendation": "WAIT", "message": "High psychological risk - wait for better mindset" },
//       "dangerous": { "min": 0, "max": 29, "recommendation": "AVOID", "message": "Dangerous psychological state - do not trade" }
//     },
//     "flags": {
//       "revenge_trading": { "triggered_by": ["motivation.revenge", "recent_performance.big_losses"], "warning": "High revenge trading risk detected" },
//       "overconfidence": { "triggered_by": ["recent_performance.big_wins", "conviction_level.>8"], "warning": "Overconfidence risk - reduce position size" },
//       "fomo": { "triggered_by": ["motivation.fomo", "patience_level.impulse"], "warning": "FOMO detected - high probability of poor entry" },
//       "insufficient_analysis": { "triggered_by": ["patience_level.quick", "exit_plan_clarity.vague"], "warning": "Insufficient preparation - high risk of mistakes" },
//       "emotional_stress": { "triggered_by": ["emotional_state.frustrated", "risk_comfort.scary"], "warning": "High emotional stress - avoid trading" }
//     }
//   }
// };

// export { refinedTradingPrompt, preTradingQuestionnaire };
