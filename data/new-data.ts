// OpenAI response: {
//   id: 'chatcmpl-BfVuDC6o9lGFaR968N6UHw8G74TjV',
//   object: 'chat.completion',
//   created: 1749233793,
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
//     prompt_tokens: 5569,
//     completion_tokens: 2218,
//     total_tokens: 7787,
//     prompt_tokens_details: { cached_tokens: 0, audio_tokens: 0 },
//     completion_tokens_details: {
//       reasoning_tokens: 0,
//       audio_tokens: 0,
//       accepted_prediction_tokens: 0,
//       rejected_prediction_tokens: 0
//     }
//   },
//   service_tier: 'default',
//   system_fingerprint: 'fp_6f2eabb9a5'
// }
// Parsed Analysis:  {
//   summary: 'XAUUSD shows bearish momentum on 4H with RSI dropping. Caution advised due to mixed trend signals.',
//   signal: 'Bearish momentum confirmed by RSI below 40 and MA cross down',
//   confidence: 'medium',
//   timeframe: '4h',
//   direction: 'short',
//   symbol: 'XAUUSD',
//   trend: 'sideways with bearish strength',
//   recommendation: 'CAUTION',
//   scores: {
//     overall: 70,
//     technical: {
//       title: 'Technical Analysis',
//       score: 75,
//       reasoning: 'RSI bearish, MA cross down, but sideways price action limits strength'
//     },
//     timing: {
//       title: 'Entry Timing',
//       score: 65,
//       reasoning: '4H timeframe needs patience; no immediate strong entry signal'
//     },
//     riskReward: {
//       title: 'Risk Reward',
//       score: 70,
//       reasoning: 'Potential reward decent but stop loss may be wide due to volatility'
//     },
//     tradability: {
//       title: 'Tradability',
//       score: 70,
//       reasoning: 'Manageable on 4H but requires monitoring for reversals'
//     }
//   },
//   technical: {
//     trendScore: {
//       title: 'Trend Score',
//       score: 70,
//       reasoning: 'Sideways with bearish bias from MA and RSI'
//     },
//     setupScore: {
//       title: 'Setup Score',
//       score: 75,
//       reasoning: 'Clear MA cross and RSI support bearish setup'
//     },
//     confluenceScore: {
//       title: 'Confluence Score',
//       score: 65,
//       reasoning: 'Limited other indicators or support/resistance confluence'
//     },
//     clarityScore: {
//       title: 'Clarity Score',
//       score: 80,
//       reasoning: 'Setup signals are clear but trend is mixed'
//     },
//     volumeScore: {
//       title: 'Volume Score',
//       score: 0,
//       reasoning: 'Volume data not visible'
//     },
//     technicalSummary: {
//       title: 'Technical Summary',
//       description: 'Bearish signals present but trend is sideways; watch for confirmation'
//     }
//   },
//   tradingReality: {
//     timeCommitment: {
//       title: 'Time Commitment',
//       description: 'Monitor every 4 hours; not high frequency'
//     },
//     sessionOptimal: {
//       title: 'Optimal Session',
//       description: 'Best during London and NY sessions'
//     },
//     sleepRisk: {
//       title: 'Sleep Risk',
//       description: 'Moderate risk; avoid holding large positions overnight'
//     },
//     weekendHold: {
//       title: 'Weekend Hold',
//       description: 'Not recommended due to gap risk'
//     },
//     newsRisk: {
//       title: 'News Risk',
//       description: 'Watch for US economic data and Fed announcements'
//     },
//     multitaskingRisk: {
//       title: 'Multitasking Risk',
//       description: 'Requires moderate attention; not fully passive'
//     },
//     skillLevel: {
//       title: 'Skill Level',
//       description: 'Intermediate due to mixed signals and volatility'
//     }
//   },
//   exitStrategy: {
//     primaryExit: {
//       title: 'Primary Exit',
//       description: 'Exit at first target or if price closes above recent MA'
//     },
//     partialProfits: {
//       title: 'Partial Profits',
//       description: 'Take 50% at target 1, rest at target 2'
//     },
//     stopAdjustment: {
//       title: 'Stop Adjustment',
//       description: 'Move stop to breakeven after 50% profit'
//     },
//     breakeven: {
//       title: 'Breakeven',
//       description: 'Set stop to entry after first target hit'
//     },
//     trailMethod: {
//       title: 'Trail Method',
//       description: 'Trail stop below lower swing lows'
//     },
//     timeStop: {
//       title: 'Time Stop',
//       description: 'Exit if no progress in 48 hours'
//     },
//     signalInvalidation: {
//       title: 'Signal Invalidation',
//       description: 'Exit if RSI rises above 55 or MA cross reverses'
//     },
//     maxTimeInTrade: {
//       title: 'Max Time In Trade',
//       description: '72 hours max hold recommended'
//     }
//   },
//   execution: {
//     type: { title: 'Execution', data: 'Sell' },
//     currentPrice: { title: 'Current Price', data: 3316 },
//     entryZone: { title: 'Entry Zone', data: '3315-3318' },
//     lotSize: { title: 'Lot Size', data: 0.1 },
//     stopLoss: { title: 'Stop Loss', data: 3355 },
//     target1: { title: 'Target 1', data: 3275 },
//     target2: { title: 'Target 2', data: 3230 },
//     target3: { title: 'Target 3', data: 3190 },
//     finalTarget: { title: 'Final Target', data: 3150 },
//     support: { title: 'Key Support', data: 3270 },
//     resistance: { title: 'Key Resistance', data: 3350 },
//     riskReward: { title: 'Risk Reward', data: '1:2.2' }
//   },
//   position: {
//     accountRisk: 200,
//     positionSize: '0.1 lot based on 2% risk and 40 pip stop',
//     riskPercent: 2,
//     maxDailyRisk: 4,
//     correlationWarning: 'Avoid other gold or USD correlated trades'
//   },
//   alternativeScenarios: {
//     bullishScenario: {
//       title: 'Bullish Scenario',
//       description: 'Price breaks above 3355; exit shorts and consider longs'
//     },
//     bearishScenario: {
//       title: 'Bearish Scenario',
//       description: 'Price drops below 3150; hold for extended profits'
//     },
//     sidewaysScenario: {
//       title: 'Sideways Scenario',
//       description: 'Price consolidates 3270-3350; avoid new entries'
//     },
//     breakoutScenario: {
//       title: 'Breakout Scenario',
//       description: 'Strong move below 3270 triggers more shorts'
//     },
//     invalidationScenario: {
//       title: 'Invalidation Scenario',
//       description: 'MA cross reverses bullish or RSI > 55'
//     }
//   },
//   beginnerGuidance: {
//     shouldNewbiesTrade: {
//       title: 'Should Newbies Trade',
//       description: 'No; wait for simpler setups and practice first'
//     },
//     whyNot: {
//       title: 'Why Not',
//       description: 'Mixed signals and wide stops increase risk'
//     },
//     learningFocus: {
//       title: 'Learning Focus',
//       description: 'Study MA crosses, RSI, and risk management'
//     },
//     commonMistake: {
//       title: 'Common Mistake',
//       description: 'Entering too early without confirmation'
//     },
//     practiceFirst: {
//       title: 'Practice First',
//       description: 'Backtest MA and RSI setups on demo'
//     }
//   },
//   dataLimitations: [
//     'No volume data visible',
//     'No detailed support/resistance levels marked',
//     'No lower timeframe context',
//     'No fundamental news overlay'
//   ],
//   riskWarnings: {
//     primaryRisk: {
//       title: 'Primary Risk',
//       description: 'False reversal causing stop loss hit'
//     },
//     falseBreakoutRisk: {
//       title: 'False Breakout Risk',
//       description: 'Moderate; sideways trend increases fake signals'
//     },
//     newsEventRisk: {
//       title: 'News Event Risk',
//       description: 'Fed announcements can cause volatility'
//     },
//     liquidityRisk: {
//       title: 'Liquidity Risk',
//       description: 'Low during Asian session; avoid entries then'
//     },
//     correlationRisk: {
//       title: 'Correlation Risk',
//       description: 'USD pairs and commodities may amplify losses'
//     }
//   },
//   calculationData: {
//     riskPips: 40,
//     rewardPips: 90,
//     target2Pips: 130,
//     target3Pips: 160,
//     riskRewardRatio: 2.25,
//     averageTimeToTarget: 24,
//     maxHoldTime: 72,
//     pipValue: 10,
//     contractSize: 100
//   },
//   actionPlan: {
//     rightNow: {
//       title: 'Right Now',
//       description: 'Prepare to enter short near 3315-3318'
//     },
//     waitFor: {
//       title: 'Wait For',
//       description: 'Confirm price below 3318 with MA cross down'
//     },
//     entryMethod: {
//       title: 'Entry Method',
//       description: 'Place sell order at 3315-3318 zone'
//     },
//     afterEntry: {
//       title: 'After Entry',
//       description: 'Set stop loss at 3355 and targets as planned'
//     },
//     monitoring: {
//       title: 'Monitoring',
//       description: 'Watch RSI and price action every 4 hours'
//     },
//     dailyReview: {
//       title: 'Daily Review',
//       description: 'Check news and adjust stops if needed'
//     }
//   }
// }
