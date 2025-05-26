export interface UserInputs {
  accountSize: number;
  riskPerTrade: number;
  tradingStyle: "Day Trade" | "Swing Trade" | "Position Trade";
  instrument: string;
  tradingSessions: string[];
  marketPreferences: string[];
  riskTolerance: "low" | "medium" | "high";
  tradingGoals: string[];
}

// interface UserScenario extends UserInputs {
//   description: string;
// }

// interface ScenarioWithId extends UserScenario {
//   id: number;
// }

interface RandomScenario extends UserInputs {
  scenario: string;
}

const userInputPlaceholders: Record<string, UserInputs> = {
  // Conservative retail trader
  scenario1: {
    accountSize: 25000,
    riskPerTrade: 3.0,
    tradingStyle: "Day Trade",
    instrument: "BTC/USD",
    tradingSessions: ["NY", "LDN"],
    marketPreferences: ["High Volatility", "Breakout Patterns"],
    riskTolerance: "high",
    tradingGoals: ["Quick Profits", "High Returns"],
  },
  scenario2: {
    accountSize: 15000,
    riskPerTrade: 2.0,
    tradingStyle: "Day Trade",
    instrument: "EUR/USD",
    tradingSessions: ["LDN"],
    marketPreferences: ["Range-bound Markets", "Support/Resistance"],
    riskTolerance: "medium",
    tradingGoals: ["Consistent Income", "Skill Development"],
  },
  scenario3: {
    accountSize: 2500,
    riskPerTrade: 1.0,
    tradingStyle: "Position Trade",
    instrument: "XAU/USD",
    tradingSessions: ["NY", "LDN"],
    marketPreferences: ["Trending Markets", "Economic Events"],
    riskTolerance: "low",
    tradingGoals: ["Inflation Hedge", "Long-term Growth"],
  },
  // Conservative retail trader
};

// Helper function to get formatted placeholder data
export function getPlaceholderInputs(scenarioNumber: number = 1): UserInputs {
  const scenario = userInputPlaceholders[`scenario${scenarioNumber}`];

  if (!scenario) {
    throw new Error(`Scenario ${scenarioNumber} not found`);
  }

  return {
    accountSize: scenario.accountSize,
    riskPerTrade: scenario.riskPerTrade,
    tradingStyle: scenario.tradingStyle,
    instrument: scenario.instrument,
    tradingSessions: scenario.tradingSessions,
    marketPreferences: scenario.marketPreferences,
    riskTolerance: scenario.riskTolerance,
    tradingGoals: scenario.tradingGoals,
  };
}

// Function to get random placeholder for testing
export function getRandomPlaceholder(): RandomScenario {
  const scenarios = Object.keys(userInputPlaceholders);
  const randomKey = scenarios[Math.floor(Math.random() * scenarios.length)];
  return {
    scenario: randomKey,
    ...userInputPlaceholders[randomKey],
  };
}

export default userInputPlaceholders;
