import Error from "next/error";

// Main response interface
export interface TradingAnalysisResponse {
  quickSignal: QuickSignal;
  professionalInsights?: ProfessionalInsights; // Optional for enhanced mode
}
// User Input Interface (for prompt construction)
export interface UserInputs {
  accountSize: number;
  accountCurrency: string; // e.g., "USD", "EUR", "GBP"
  riskPerTrade: number; // percentage (e.g., 2 for 2%)
  tradingStyle: string; // e.g., "Day Trading", "Swing Trading"
  instrument?: string; // e.g., "Forex", "Indices", "Commodities"
  tradingSessions?: string[]; // e.g., ["London", "New York"]
  riskTolerance?: string; // e.g., "Conservative", "Moderate", "Aggressive"
  tradingGoals?: string[]; // e.g., ["Income", "Growth"]
}
export interface TradePlan {
  id?: string; // Optional for new analyses
  quickSignal: QuickSignal;
  professionalInsights?: ProfessionalInsights; // Optional for enhanced mode
  //   userInputs: UserInputs;
  //   rawResponse?: string; // Raw response from OpenAI
}
// Quick Signal (always present)
export interface QuickSignal {
  direction: TradeDirection;
  strength: TradeStrength;
  confidence: ConfidenceLevel;
  primaryReason: string; // Max 100 chars
  timeframe: string; // e.g., "Execute within 2 hours"
  tradeJustification: TradeJustification;
  execution: ExecutionPlan;
  position: PositionDetails;
}

// Trade Justification (new addition)
export interface TradeJustification {
  setup: string; // 50-80 chars - Specific pattern or setup identified
  momentum: string; // 50-80 chars - Current momentum direction and strength
  keyLevels: string; // 50-80 chars - Critical support/resistance levels
  riskReward: string; // 50-80 chars - Why this risk-reward ratio is acceptable
  timing: string; // 50-80 chars - Why now is the right time to enter
  invalidation: string; // 50-80 chars - What would prove analysis wrong
}

// Execution details
export interface ExecutionPlan {
  entryMethod: EntryMethod;
  entryZone: string; // e.g., "2150.50-2151.00"
  stopLoss: string; // e.g., "2148.20"
  target1: string; // e.g., "2155.80"
  target2: string; // e.g., "2159.40"
  riskReward: string; // e.g., "1:2.3"
}

// Position sizing and risk
export interface PositionDetails {
  lotSize: string; // e.g., "0.25"
  riskAmount: string; // e.g., "$500"
  maxTimeInTrade: string; // e.g., "4 hours"
}

// Professional Insights (enhanced mode only)
export interface ProfessionalInsights {
  marketContext: MarketContext;
  institutionalIntelligence: InstitutionalIntelligence;
  marketMicrostructure: MarketMicrostructure;
  psychologicalEdge: PsychologicalEdge;
  executionMastery: ExecutionMastery;
  riskIntelligence: RiskIntelligence;
  marketRegimeContext: MarketRegimeContext;
}

// Market Context
export interface MarketContext {
  higherTimeframeTrend: string; // Max 100 chars
  trendStage: string; // Max 80 chars
  weeklyMonthlyContext: string; // Max 120 chars
  trendAlignment: string; // Max 80 chars
}

// Institutional Intelligence
export interface InstitutionalIntelligence {
  smartMoneyClues: string; // Max 150 chars
  liquidityLevels: string; // Max 120 chars
  algorithmicLevels: string; // Max 100 chars
  orderFlowSignals: string; // Max 130 chars
  retailVsPro: string; // Max 120 chars
}

// Market Microstructure
export interface MarketMicrostructure {
  sessionDynamics: string; // Max 120 chars
  correlationSignals: string; // Max 130 chars
  liquidityConsiderations: string; // Max 120 chars
  algorithmicBehavior: string; // Max 120 chars
}

// Psychological Edge
export interface PsychologicalEdge {
  crowdPositioning: string; // Max 100 chars
  sentimentExtremes: string; // Max 120 chars
  contrarianOpportunities: string; // Max 120 chars
  fundamentalBackdrop: string; // Max 120 chars
}

// Execution Mastery
export interface ExecutionMastery {
  optimalEntry: string; // Max 120 chars
  scalingStrategy: string; // Max 120 chars
  profitOptimization: string; // Max 120 chars
  dynamicStops: string; // Max 120 chars
  exitScenarios: ExitScenarios;
}

// Exit Scenarios
export interface ExitScenarios {
  quickProfit: string; // Max 100 chars
  runner: string; // Max 100 chars
  breakdown: string; // Max 100 chars
}

// Risk Intelligence
export interface RiskIntelligence {
  hiddenRisks: string; // Max 120 chars
  invalidationSignals: string; // Max 120 chars
  correlationRisks: string; // Max 100 chars
  timeBasedRisks: string; // Max 120 chars
  positionOptimization: string; // Max 120 chars
}

// Market Regime Context
export interface MarketRegimeContext {
  currentRegime: string; // Max 80 chars
  regimeStrategy: string; // Max 120 chars
  volatilityEnvironment: string; // Max 100 chars
  seasonalFactors: string; // Max 100 chars
}

// Enums and Union Types
export type TradeDirection = "BUY" | "SELL" | "WAIT";
export type TradeStrength = "STRONG" | "MODERATE" | "LIGHT";
export type ConfidenceLevel = "High" | "Medium" | "Low";
export type EntryMethod = "Market" | "Limit" | "Stop";

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: string[];
  data?: TradingAnalysisResponse;
}

// Validation error interface
export interface ValidationError {
  type:
    | "PARSE_ERROR"
    | "MISSING_FIELD"
    | "INVALID_VALUE"
    | "TYPE_ERROR"
    | "LENGTH_ERROR";
  field?: string;
  expected?: string;
  received?: string;
  message: string;
  suggestion?: string;
}

// Auto-fix result interface
export interface AutoFixResult {
  fixed: string;
  wasModified: boolean;
  errors: string[];
}

// Processing result interface
export interface ProcessingResult {
  success: boolean;
  data?: TradingAnalysisResponse;
  errors?: string[];
  warnings?: string[];
  wasAutoFixed?: boolean;
}

// Response metadata (for tracking and analytics)
export interface ResponseMetadata {
  timestamp: Date;
  processingTimeMs: number;
  enhancedMode: boolean;
  userInputs: UserInputs;
  validationPassed: boolean;
  autoFixApplied: boolean;
}

// Complete analysis with metadata
export interface CompleteAnalysis {
  response: TradingAnalysisResponse;
  metadata: ResponseMetadata;
}

// Chart analysis request interface
export interface AnalysisRequest {
  chartImage: File | string; // File object or base64 string
  userInputs: UserInputs;
  enhancedMode: boolean;
  requestId?: string; // For tracking
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Error;
  };
  metadata?: {
    requestId: string;
    timestamp: Date;
    processingTime: number;
  };
}

// Type guards for runtime validation
export function isValidTradeDirection(value: string): value is TradeDirection {
  return ["BUY", "SELL", "WAIT"].includes(value);
}

export function isValidTradeStrength(value: string): value is TradeStrength {
  return ["STRONG", "MODERATE", "LIGHT"].includes(value);
}

export function isValidConfidenceLevel(
  value: string
): value is ConfidenceLevel {
  return ["High", "Medium", "Low"].includes(value);
}

export function isValidEntryMethod(value: string): value is EntryMethod {
  return ["Market", "Limit", "Stop"].includes(value);
}

// Utility types for partial updates
export type PartialQuickSignal = Partial<QuickSignal>;
export type PartialProfessionalInsights = Partial<ProfessionalInsights>;

// Constants for validation
export const FIELD_LIMITS = {
  primaryReason: 100,
  setup: 80,
  momentum: 80,
  keyLevels: 80,
  riskReward: 80,
  timing: 80,
  invalidation: 80,
  higherTimeframeTrend: 100,
  trendStage: 80,
  weeklyMonthlyContext: 120,
  trendAlignment: 80,
  smartMoneyClues: 150,
  liquidityLevels: 120,
  algorithmicLevels: 100,
  orderFlowSignals: 130,
  retailVsPro: 120,
  sessionDynamics: 120,
  correlationSignals: 130,
  liquidityConsiderations: 120,
  algorithmicBehavior: 120,
  crowdPositioning: 100,
  sentimentExtremes: 120,
  contrarianOpportunities: 120,
  fundamentalBackdrop: 120,
  optimalEntry: 120,
  scalingStrategy: 120,
  profitOptimization: 120,
  dynamicStops: 120,
  quickProfit: 100,
  runner: 100,
  breakdown: 100,
  hiddenRisks: 120,
  invalidationSignals: 120,
  correlationRisks: 100,
  timeBasedRisks: 120,
  positionOptimization: 120,
  currentRegime: 80,
  regimeStrategy: 120,
  volatilityEnvironment: 100,
  seasonalFactors: 100,
} as const;

// Export all types
// export type {
//   TradingAnalysisResponse,
//   QuickSignal,
//   TradeJustification,
//   ExecutionPlan,
//   PositionDetails,
//   ProfessionalInsights,
//   MarketContext,
//   InstitutionalIntelligence,
//   MarketMicrostructure,
//   PsychologicalEdge,
//   ExecutionMastery,
//   ExitScenarios,
//   RiskIntelligence,
//   MarketRegimeContext,
//   UserInputs,
//   ValidationResult,
//   ValidationError,
//   AutoFixResult,
//   ProcessingResult,
//   ResponseMetadata,
//   CompleteAnalysis,
//   AnalysisRequest,
//   ApiResponse
// };
