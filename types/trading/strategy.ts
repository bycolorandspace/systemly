import { RuleGroup } from "./rules";
import { BacktestConfig, ForwardTestConfig } from "./backtest";

// Core type definitions
type AccountCurrency = "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD";
type BrokerType = "Interactive Brokers" | "TD Ameritrade" | "Robinhood";
type MonitorPatternType =
  | "Price Action"
  | "Volume"
  | "Momentum"
  | "Support/Resistance";
type MarketStructureType = "Trending" | "Ranging" | "Volatile" | "Breakout";
type NotificationChannel = "Email" | "Push" | "SMS" | "In-App";
type PositionSizingMethod = "Fixed" | "Percentage" | "Kelly" | "Risk-Based";

// Main trading strategy configuration
export interface TradingStrategyConfig {
  // Strategy Basics with Growth Goals
  basics: {
    strategyName: string;
    tradingEnabled: boolean;
    description: string | null;
    growthGoals: {
      enabled: boolean;
      targetGrowthRate: number; // percentage per month/year
      targetAccountSize: number;
      targetDate: string | null;
      compoundInterest: boolean;
      milestones: number[]; // Account value milestones
    };
  };

  // Account Configuration
  account: {
    accountSize: number;
    accountCurrency: AccountCurrency;
    broker: BrokerType;
    selectedBroker: BrokerType;
  };

  // Risk Management
  riskManagement: {
    defaultRiskPercentage: number;
    maxAccountRisk: number;
    maxCorrelatedRisk: number;
    maxLosses: number;
    moneyGoal: number;
    maxDrawdownPercentage: number;
    targetWinRate: number;
    minimumRewardRiskRatio: number;
  };

  // Trade Execution
  tradeExecution: {
    maxOpenTrades: number;
    maxTradesPerDay: number;
    slToBreakEven: boolean;
    trailingStop: boolean;
    compensateForMargin: boolean;
    delayBetweenTrades: number | null;
  };

  // Market Analysis
  marketAnalysis: {
    monitorPatterns: MonitorPatternType[];
    marketStructure: MarketStructureType;
    retestLevelMinimum: number;
    retestLevelCount: number;
    minimumVolume: number | null;
    volatilityThreshold: number | null;
  };

  // Time Parameters
  timeParameters: {
    tradingSessionStart: string; // "09:30"
    tradingSessionEnd: string; // "16:00"
    timeZone: string; // "America/New_York"
    tradingDays: boolean[]; // [false, true, true, true, true, true, false]
  };

  // Notification Settings
  notifications: {
    enabled: boolean;
    channels: NotificationChannel[];
    alertFrequency: number; // minutes between alerts
    thresholds: {
      profitTarget: number;
      lossWarning: number;
      riskExceeded: number;
      inactivity: number;
    };
  };

  // Entry Conditions (flexible rule system)
  entryConditions: {
    enabled: boolean;
    rootGroup: RuleGroup;
    minimumConfirmations: number;
  };

  // Exit Conditions (flexible rule system)
  exitConditions: {
    enabled: boolean;
    rootGroup: RuleGroup;
    takeProfitLevels: number[];
    stopLossLevels: number[];
  };

  // Position Sizing
  positionSizing: {
    method: PositionSizingMethod;
    fixedSize: number | null;
    percentageSize: number | null;
    kellyFraction: number | null;
    scaleIn: boolean;
    scaleOut: boolean;
    scaleInLevels: number[] | null;
    scaleOutLevels: number[] | null;
  };

  // Backtest Configuration
  backtest: BacktestConfig;

  // Forward Test Configuration
  forwardTest: ForwardTestConfig;
}
