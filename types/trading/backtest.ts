// Backtest configuration
export interface BacktestConfig {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  initialCapital: number;
  slippage: number;
  commission: number;
  dataSource: string;
  includeWeekends: boolean;
  compareToMarket: boolean;
  benchmarkIndex: string | null;
  monteCarlo: {
    enabled: boolean;
    simulations: number;
  };
}

// Forward test configuration
export interface ForwardTestConfig {
  enabled: boolean;
  paperMoney: {
    initialCapital: number;
    useRealPrices: boolean;
    simulateSlippage: boolean;
    simulateLatency: boolean;
  };
  duration: {
    startDate: string;
    endDate: string | null; // null means indefinite
  };
  tracking: {
    logAllTrades: boolean;
    emailReports: boolean;
    reportFrequency: "Daily" | "Weekly" | "Monthly";
  };
}
