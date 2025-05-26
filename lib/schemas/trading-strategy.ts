// /lib/schemas/trading-strategy.ts
import { z } from "zod";
import type { RuleCondition, RuleGroup } from "@/types/trading";

// Base enum schemas
const AccountCurrencySchema = z.enum([
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
]);
const BrokerTypeSchema = z.enum([
  "Interactive Brokers",
  "TD Ameritrade",
  "Robinhood",
]);
const MonitorPatternTypeSchema = z.enum([
  "Price Action",
  "Volume",
  "Momentum",
  "Support/Resistance",
]);
const MarketStructureTypeSchema = z.enum([
  "Trending",
  "Ranging",
  "Volatile",
  "Breakout",
]);
const NotificationChannelSchema = z.enum(["Email", "Push", "SMS", "In-App"]);
const PositionSizingMethodSchema = z.enum([
  "Fixed",
  "Percentage",
  "Kelly",
  "Risk-Based",
]);
const ConditionOperatorSchema = z.enum(["AND", "OR"]);
const ComparisonOperatorSchema = z.enum([
  ">",
  "<",
  "=",
  ">=",
  "<=",
  "CROSSES_ABOVE",
  "CROSSES_BELOW",
]);

// Rule system schemas with proper typing
const RuleConditionSchema: z.ZodType<RuleCondition> = z.lazy(() =>
  z.object({
    id: z.string().min(1, "Rule ID is required"),
    type: z.string().min(1, "Rule type is required"),
    properties: z.record(z.unknown()),
    comparison: ComparisonOperatorSchema,
    value: z.union([z.string(), z.number(), z.boolean()]),
  })
);

const RuleGroupSchema: z.ZodType<RuleGroup> = z.lazy(() =>
  z.object({
    id: z.string().min(1, "Group ID is required"),
    operator: ConditionOperatorSchema,
    conditions: z.array(z.union([RuleConditionSchema, RuleGroupSchema])),
  })
);

// Main trading strategy schema
export const TradingStrategyConfigSchema = z.object({
  basics: z.object({
    strategyName: z
      .string()
      .min(1, "Strategy name is required")
      .max(100, "Strategy name too long"),
    tradingEnabled: z.boolean(),
    description: z.string().max(500, "Description too long").nullable(),
    growthGoals: z.object({
      enabled: z.boolean(),
      targetGrowthRate: z
        .number()
        .min(0, "Growth rate cannot be negative")
        .max(1000, "Growth rate too high"),
      targetAccountSize: z
        .number()
        .min(1, "Target account size must be positive"),
      targetDate: z.string().datetime().nullable(),
      compoundInterest: z.boolean(),
      milestones: z.array(
        z.number().positive("Milestone values must be positive")
      ),
    }),
  }),

  account: z.object({
    accountSize: z.number().min(1, "Account size must be positive"),
    accountCurrency: AccountCurrencySchema,
    broker: BrokerTypeSchema,
    selectedBroker: BrokerTypeSchema,
  }),

  riskManagement: z.object({
    defaultRiskPercentage: z
      .number()
      .min(0.1, "Risk percentage too low")
      .max(100, "Risk percentage too high"),
    maxAccountRisk: z
      .number()
      .min(0.1, "Max account risk too low")
      .max(100, "Max account risk too high"),
    maxCorrelatedRisk: z
      .number()
      .min(0, "Correlated risk cannot be negative")
      .max(100, "Correlated risk too high"),
    maxLosses: z.number().int().min(1, "Max losses must be at least 1"),
    moneyGoal: z.number().min(1, "Money goal must be positive"),
    maxDrawdownPercentage: z
      .number()
      .min(0, "Drawdown cannot be negative")
      .max(100, "Drawdown too high"),
    targetWinRate: z
      .number()
      .min(0, "Win rate cannot be negative")
      .max(100, "Win rate cannot exceed 100%"),
    minimumRewardRiskRatio: z.number().min(0.1, "Reward risk ratio too low"),
  }),

  tradeExecution: z.object({
    maxOpenTrades: z.number().int().min(1, "Must allow at least 1 open trade"),
    maxTradesPerDay: z
      .number()
      .int()
      .min(1, "Must allow at least 1 trade per day"),
    slToBreakEven: z.boolean(),
    trailingStop: z.boolean(),
    compensateForMargin: z.boolean(),
    delayBetweenTrades: z
      .number()
      .int()
      .min(0, "Delay cannot be negative")
      .nullable(),
  }),

  marketAnalysis: z.object({
    monitorPatterns: z
      .array(MonitorPatternTypeSchema)
      .min(1, "Must select at least one pattern"),
    marketStructure: MarketStructureTypeSchema,
    retestLevelMinimum: z
      .number()
      .min(0, "Retest level minimum cannot be negative"),
    retestLevelCount: z
      .number()
      .int()
      .min(1, "Retest level count must be at least 1"),
    minimumVolume: z.number().min(0, "Volume cannot be negative").nullable(),
    volatilityThreshold: z
      .number()
      .min(0, "Volatility threshold cannot be negative")
      .nullable(),
  }),

  timeParameters: z.object({
    tradingSessionStart: z
      .string()
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Invalid time format (HH:MM)"
      ),
    tradingSessionEnd: z
      .string()
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Invalid time format (HH:MM)"
      ),
    timeZone: z.string().min(1, "Time zone is required"),
    tradingDays: z
      .array(z.boolean())
      .length(7, "Must specify all 7 days of the week"),
  }),

  notifications: z.object({
    enabled: z.boolean(),
    channels: z.array(NotificationChannelSchema),
    alertFrequency: z
      .number()
      .int()
      .min(1, "Alert frequency must be at least 1 minute"),
    thresholds: z.object({
      profitTarget: z.number().min(0, "Profit target cannot be negative"),
      lossWarning: z.number().min(0, "Loss warning cannot be negative"),
      riskExceeded: z.number().min(0, "Risk exceeded cannot be negative"),
      inactivity: z
        .number()
        .int()
        .min(1, "Inactivity threshold must be at least 1 minute"),
    }),
  }),

  entryConditions: z.object({
    enabled: z.boolean(),
    rootGroup: RuleGroupSchema,
    minimumConfirmations: z
      .number()
      .int()
      .min(0, "Minimum confirmations cannot be negative"),
  }),

  exitConditions: z.object({
    enabled: z.boolean(),
    rootGroup: RuleGroupSchema,
    takeProfitLevels: z.array(
      z.number().positive("Take profit levels must be positive")
    ),
    stopLossLevels: z.array(
      z.number().positive("Stop loss levels must be positive")
    ),
  }),

  positionSizing: z.object({
    method: PositionSizingMethodSchema,
    fixedSize: z.number().positive("Fixed size must be positive").nullable(),
    percentageSize: z
      .number()
      .min(0.1, "Percentage size too low")
      .max(100, "Percentage size too high")
      .nullable(),
    kellyFraction: z
      .number()
      .min(0, "Kelly fraction cannot be negative")
      .max(1, "Kelly fraction cannot exceed 1")
      .nullable(),
    scaleIn: z.boolean(),
    scaleOut: z.boolean(),
    scaleInLevels: z
      .array(z.number().positive("Scale in levels must be positive"))
      .nullable(),
    scaleOutLevels: z
      .array(z.number().positive("Scale out levels must be positive"))
      .nullable(),
  }),

  backtest: z.object({
    dateRange: z.object({
      startDate: z.string().datetime("Invalid start date"),
      endDate: z.string().datetime("Invalid end date"),
    }),
    initialCapital: z.number().min(1, "Initial capital must be positive"),
    slippage: z.number().min(0, "Slippage cannot be negative"),
    commission: z.number().min(0, "Commission cannot be negative"),
    dataSource: z.string().min(1, "Data source is required"),
    includeWeekends: z.boolean(),
    compareToMarket: z.boolean(),
    benchmarkIndex: z.string().nullable(),
    monteCarlo: z.object({
      enabled: z.boolean(),
      simulations: z
        .number()
        .int()
        .min(100, "Need at least 100 simulations")
        .max(10000, "Too many simulations"),
    }),
  }),

  forwardTest: z.object({
    enabled: z.boolean(),
    paperMoney: z.object({
      initialCapital: z.number().min(1, "Initial capital must be positive"),
      useRealPrices: z.boolean(),
      simulateSlippage: z.boolean(),
      simulateLatency: z.boolean(),
    }),
    duration: z.object({
      startDate: z.string().datetime("Invalid start date"),
      endDate: z.string().datetime("Invalid end date").nullable(),
    }),
    tracking: z.object({
      logAllTrades: z.boolean(),
      emailReports: z.boolean(),
      reportFrequency: z.enum(["Daily", "Weekly", "Monthly"]),
    }),
  }),
});

export type TradingStrategyConfigInput = z.infer<
  typeof TradingStrategyConfigSchema
>;
