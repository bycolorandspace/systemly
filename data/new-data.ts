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
