// Core Types
export type Confidence = "high" | "medium" | "low";
export type Direction = "long" | "short" | "wait";
export type Recommendation = "PROCEED" | "CAUTION" | "AVOID";
export type SkillLevel = "beginner" | "intermediate" | "advanced";
export type BeginnerRecommendation = "yes" | "no" | "paperTrade";

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
    | TradingReality
    | ActionPlan
    | ExitStrategy
    | BeginnerGuidance
    | AlternativeScenarios
    | RiskWarnings
    | string[];
}

// UI Helper Types
export type DescriptiveItem = {
  title: string;
  description: string;
};

export type ScoreItem = {
  title: string;
  score: number;
  reasoning: string;
};

// Score Types
export type QualityScore = {
  overall: number;
  technical: number;
  timing: number;
  riskReward: number;
  tradability: number;
};

export type QualityScoreReasoning = {
  technicalReason: string;
  timingReason: string;
  riskRewardReason: string;
  tradabilityReason: string;
};

// Enhanced Score Types with UI Data
export type Scores = {
  overall: number;
  technical: ScoreItem;
  timing: ScoreItem;
  riskReward: ScoreItem;
  tradability: ScoreItem;
};

// Enhanced Technical with UI Data
export type Technicals = {
  trendScore: ScoreItem;
  setupScore: ScoreItem;
  confluenceScore: ScoreItem;
  clarityScore: ScoreItem;
  volumeScore: ScoreItem;
  technicalSummary: DescriptiveItem;
};

// Enhanced Trading Reality with UI Data
export type TradingReality = {
  timeCommitment: DescriptiveItem;
  sessionOptimal: DescriptiveItem;
  sleepRisk: DescriptiveItem;
  weekendHold: DescriptiveItem;
  newsRisk: DescriptiveItem;
  multitaskingRisk: DescriptiveItem;
  skillLevel: DescriptiveItem;
};

// Enhanced Exit Strategy with UI Data
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

export type Levels = {
  currentPrice: number;
  entryZone: string; // Range format like "1.0940-1.0945"
  stopLoss: number;
  target1: number;
  target2: number;
  target3: number;
  finalTarget: number;
  support: number;
  resistance: number;
  riskReward: string; // Format like "1:2.3"
};

export type Position = {
  accountRisk: number; // Dollar amount
  positionSize: string;
  riskPercent: string;
  maxDailyRisk: string;
  correlationWarning: string;
};

// Enhanced Alternative Scenarios with UI Data
export type AlternativeScenarios = {
  bullishScenario: DescriptiveItem;
  bearishScenario: DescriptiveItem;
  sidewaysScenario: DescriptiveItem;
  breakoutScenario: DescriptiveItem;
  invalidationScenario: DescriptiveItem;
};

// Enhanced Beginner Guidance with UI Data
export type BeginnerGuidance = {
  shouldNewbiesTrade: DescriptiveItem;
  whyNot: DescriptiveItem;
  learningFocus: DescriptiveItem;
  commonMistake: DescriptiveItem;
  practiceFirst: DescriptiveItem;
};

// Enhanced Risk Warnings with UI Data
export type RiskWarnings = {
  primaryRisk: DescriptiveItem;
  falseBreakoutRisk: DescriptiveItem;
  newsEventRisk: DescriptiveItem;
  liquidityRisk: DescriptiveItem;
  correlationRisk: DescriptiveItem;
};

// Enhanced Action Plan with UI Data
export type ActionPlan = {
  rightNow: DescriptiveItem;
  waitFor: DescriptiveItem;
  entryMethod: DescriptiveItem;
  afterEntry: DescriptiveItem;
  monitoring: DescriptiveItem;
  dailyReview: DescriptiveItem;
};

// Enhanced version with UI-friendly structure
export type TradePlan = {
  // Summary (simple strings, no enhancement needed)
  summary: string;
  signal: string;
  confidence: Confidence;
  timeframe: string;
  direction: Direction;
  recommendation: Recommendation;

  // Enhanced Scores and Analysis
  scores: Scores;
  technical: Technicals;

  // Enhanced Trading Details
  tradingReality: TradingReality;
  exitStrategy: ExitStrategy;
  levels: Levels; // Keep simple for price levels
  position: Position; // Keep simple for position data

  // Enhanced Scenarios and Guidance
  alternativeScenarios: AlternativeScenarios;
  beginnerGuidance: BeginnerGuidance;

  // Enhanced Risk and Actions
  dataLimitations: string[]; // Keep simple array
  riskWarnings: RiskWarnings;
  actionPlan: ActionPlan;
};

// User Input Types (for the prompt)
export type UserInputs = {
  accountSize: number;
  riskPerTrade: number;
  tradingStyle: string;
  instrument: string;
  tradingSessions: string[];
  marketPreferences: string[];
  riskTolerance: string;
  tradingGoals: string[];
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
