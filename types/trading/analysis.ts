// Core Types
export type Confidence = "High" | "Medium" | "Low";
export type Direction = "Long" | "Short" | "Wait";
export type Recommendation =
  | "Great opportunity"
  | "Worth a try"
  | "Take caution"
  | "Probably Avoid"
  | "No trade";
export type SkillLevel = "beginner" | "intermediate" | "advanced";
export type BeginnerRecommendation = "yes" | "no" | "paperTrade";
export type TrafficLightStatus =
  | "🟢 EXCELLENT"
  | "🟢 GOOD"
  | "🟡 MODERATE"
  | "🔴 WEAK"
  | "🔴 AVOID"
  | "🔘 N/A";

export enum TradeAnalysisFormSteps {
  STEPONE = "stepOne", // Step 1: Upload Chart
  STEPTWO = "stepTwo", // Step 2: User Inputs
  STEPTREE = "stepThree", // Step 3: User Login
}

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
    | MarketContext
    | ProfessionalEdge
    | Execution
    | ActionPlan
    | ExitStrategy
    | BeginnerGuidance
    | AlternativeScenarios
    | RiskWarnings
    | MarketContext
    | ProfessionalEdge
    | string[]
    | undefined;
}

// UI Helper Types
export type DescriptiveItem = {
  title: string;
  description?: string;
  data?: string | number | boolean; // Optional data field for additional info
};

// Updated ScoreItem with traffic light status
export type ScoreItem = {
  title: string;
  score: number;
  status: TrafficLightStatus;
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

// Updated Score Types with traffic light status
export type Scores = {
  overall: ScoreItem; // Changed from number to ScoreItem
  technical: ScoreItem;
  timing: ScoreItem;
  riskReward: ScoreItem;
  tradability: ScoreItem;
};

// Enhanced Technicals with new scoring components
export type Technicals = {
  trendScore: ScoreItem;
  setupScore: ScoreItem;
  confluenceScore: ScoreItem;
  clarityScore: ScoreItem;
  volumeScore: ScoreItem;
  momentumScore: ScoreItem; // NEW
  marketStructureScore: ScoreItem; // NEW
  volatilityScore: ScoreItem; // NEW
  technicalSummary: ScoreItem;
};

// NEW: Market Context Type
export type MarketContext = {
  sessionActive: DescriptiveItem;
  correlatedAssets: DescriptiveItem;
  institutionalBias: DescriptiveItem;
  retailSentiment: DescriptiveItem;
  liquidityZones: DescriptiveItem;
};

// NEW: Professional Edge Type
export type ProfessionalEdge = {
  smartMoneyClues: DescriptiveItem;
  orderFlowSignals: DescriptiveItem;
  algorithmicLevels: DescriptiveItem;
  newsDrivers: DescriptiveItem;
  timingEdge: DescriptiveItem;
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
  accountRisk: string; // Changed from number to string to match prompt
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

// Updated Main TradePlan with new fields
export type TradePlan = {
  id?: string; // Made optional if not always provided

  // NEW: Enhanced Summary Fields
  title: string; // NEW: Actionable title
  summary: string; // Brief summary (150 chars)
  detailedSummary: string; // NEW: Detailed summary (700 chars)

  // Core Analysis
  signal: string;
  confidence: Confidence;
  timeframe: string; // Enhanced with execution timing
  direction: Direction;
  symbol: string; // Made explicit
  trend: string; // Made explicit with strength assessment
  recommendation: Recommendation;

  // Scores and Analysis
  scores: Scores;
  technical: Technicals;

  // NEW: Market Intelligence
  marketContext: MarketContext; // NEW
  professionalEdge: ProfessionalEdge; // NEW

  // Trading Details
  exitStrategy: ExitStrategy;
  execution: Execution;
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

// Updated Utility Types for Frontend
export type ScoreColor = "green" | "yellow" | "orange" | "red";
export type RiskLevel = "low" | "medium" | "high" | "extreme";

export type ScoreDisplay = {
  score: number;
  status: TrafficLightStatus; // NEW: Added traffic light status
  color: ScoreColor;
  label: string;
};

// Helper function types
export type GetScoreColor = (score: number) => ScoreColor;
export type GetTrafficLightStatus = (score: number) => TrafficLightStatus; // NEW
export type GetRiskLevel = (recommendation: Recommendation) => RiskLevel;
export type FormatPrice = (price: number, instrument: string) => string;
