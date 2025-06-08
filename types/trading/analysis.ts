// Core Types
export type Confidence = "high" | "medium" | "low";
export type Direction = "long" | "short" | "wait";
export type Recommendation = "PROCEED" | "CAUTION" | "AVOID";
export type SkillLevel = "beginner" | "intermediate" | "advanced";
export type BeginnerRecommendation = "yes" | "no" | "paperTrade";

export enum TradingStyle {
  DAY = "Day",
  SWING = "Swing",
  POSITION = "Position",
  SCALPER = "Scalper",
}

export enum AccountCurrency {
  USD = "$",
  EURO = "€",
  GBP = "£",
}

// API Response
export type AnalysisResponse = {
  success: boolean;
  userInput: UserInputs;
  analysis: TradePlan;
  rawResponse?: string;
  error?: string;
};

export interface AnalysisProps {
  list:
    | Execution
    | TradingReality
    | ActionPlan
    | ExitStrategy
    | BeginnerGuidance
    | AlternativeScenarios
    | RiskWarnings
    | string[]
    | undefined;
}

// UI Helper Types
export type DescriptiveItem = {
  title: string;
  description: string;
  data?: string | number | boolean; // Optional data field for additional info
};

export type ScoreItem = {
  title: string;
  score: number;
  reasoning: string;
};

// Updated CalculationData type - removing probability fields
export type CalculationData = {
  // Price metrics (in pips for forex, points for other instruments)
  riskPips: number; // Distance to stop loss
  rewardPips: number; // Distance to primary target
  target2Pips: number; // Distance to second target
  target3Pips: number; // Distance to third target

  // Risk ratios
  riskRewardRatio: number; // Primary risk:reward as decimal (e.g., 2.2)

  // Time metrics (in hours)
  averageTimeToTarget: number; // Average hours to reach profit
  maxHoldTime: number; // Maximum recommended hold time

  // Instrument specifics
  pipValue: number; // Value of one pip/point in account currency
  contractSize: number; // Standard contract/lot size
};

// Score Types
export type Scores = {
  overall: number;
  technical: ScoreItem;
  timing: ScoreItem;
  riskReward: ScoreItem;
  tradability: ScoreItem;
};

export type Technicals = {
  trendScore: ScoreItem;
  setupScore: ScoreItem;
  confluenceScore: ScoreItem;
  clarityScore: ScoreItem;
  volumeScore: ScoreItem;
  technicalSummary: DescriptiveItem;
};

export type TradingReality = {
  timeCommitment: DescriptiveItem;
  sessionOptimal: DescriptiveItem;
  sleepRisk: DescriptiveItem;
  weekendHold: DescriptiveItem;
  newsRisk: DescriptiveItem;
  multitaskingRisk: DescriptiveItem;
  skillLevel: DescriptiveItem;
};

export type ExitStrategy = {
  primaryExit: DescriptiveItem;
  partialProfits: DescriptiveItem;
  stopAdjustment: DescriptiveItem;
  breakeven: DescriptiveItem;
  trailMethod: DescriptiveItem;
  timeStop: DescriptiveItem;
  signalInvalidation: DescriptiveItem;
  maxTimeInTrade: DescriptiveItem;
};

export type Execution = {
  type: DescriptiveItem; // "Buy", "Sell", "Buy Stop", "Sell Stop", "Buy Limit", "Sell Limit"
  currentPrice: DescriptiveItem;
  entryZone: DescriptiveItem;
  lotSize: DescriptiveItem;
  stopLoss: DescriptiveItem;
  target1: DescriptiveItem;
  target2: DescriptiveItem;
  target3: DescriptiveItem;
  finalTarget: DescriptiveItem;
  support: DescriptiveItem;
  resistance: DescriptiveItem;
  riskReward: DescriptiveItem;
};

export type Position = {
  accountRisk: number;
  positionSize: string;
  riskPercent: string;
  maxDailyRisk: string;
  correlationWarning: string;
};

export type AlternativeScenarios = {
  bullishScenario: DescriptiveItem;
  bearishScenario: DescriptiveItem;
  sidewaysScenario: DescriptiveItem;
  breakoutScenario: DescriptiveItem;
  invalidationScenario: DescriptiveItem;
};

export type BeginnerGuidance = {
  shouldNewbiesTrade: DescriptiveItem;
  whyNot: DescriptiveItem;
  learningFocus: DescriptiveItem;
  commonMistake: DescriptiveItem;
  practiceFirst: DescriptiveItem;
};

export type RiskWarnings = {
  primaryRisk: DescriptiveItem;
  falseBreakoutRisk: DescriptiveItem;
  newsEventRisk: DescriptiveItem;
  liquidityRisk: DescriptiveItem;
  correlationRisk: DescriptiveItem;
};

export type ActionPlan = {
  rightNow: DescriptiveItem;
  waitFor: DescriptiveItem;
  entryMethod: DescriptiveItem;
  afterEntry: DescriptiveItem;
  monitoring: DescriptiveItem;
  dailyReview: DescriptiveItem;
};

// Main TradePlan with calculation data
export type TradePlan = {
  id: string;
  // Summary
  summary: string;
  signal: string;
  confidence: Confidence;
  timeframe: string;
  direction: Direction;
  recommendation: Recommendation;

  // Scores and Analysis
  scores: Scores;
  technical: Technicals;

  // Trading Details
  tradingReality: TradingReality;
  exitStrategy: ExitStrategy;
  execution: Execution; // Changed from levels
  position: Position;

  // Calculation data for frontend
  calculationData: CalculationData;

  // Scenarios and Guidance
  alternativeScenarios: AlternativeScenarios;
  beginnerGuidance: BeginnerGuidance;

  // Risk and Actions
  dataLimitations: string[];
  riskWarnings: RiskWarnings;
  actionPlan: ActionPlan;
};

export type UserInputs = {
  accountCurrency: string;
  accountSize: number;
  riskPerTrade: number;
  tradingStyle: string;
};

// Utility Types for Frontend
export type ScoreColor = "green" | "yellow" | "orange" | "red";
export type RiskLevel = "low" | "medium" | "high" | "extreme";

export type ScoreDisplay = {
  score: number;
  color: ScoreColor;
  label: string;
};

// Helper function types
export type GetScoreColor = (score: number) => ScoreColor;
export type GetRiskLevel = (recommendation: Recommendation) => RiskLevel;
export type FormatPrice = (price: number, instrument: string) => string;
