export interface CachedRates {
  data: ExchangeRateResponse;
  timestamp: number;
}

export interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

export interface ConversionResult {
  originalAmount: number;
  originalCurrency?: string;
  convertedAmount: number;
  targetCurrency: string;
  exchangeRate: number;
}
