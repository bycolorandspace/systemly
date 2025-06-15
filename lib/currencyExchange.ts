import { formatCurrrencytoString } from "@/helpers/format-currency";
import {
  CachedRates,
  ConversionResult,
  ExchangeRateResponse,
} from "@/types/fx-types";
import { AccountCurrency } from "@/types/trading/analysis";

export class CurrencyExchangeError extends Error {
  constructor(
    message: string,
    public code: "CURRENCY_SUPPORT_ERROR" | "API_ERROR" | "UNAUTHORIZED", // CHANGE ERRORS
    public originError?: unknown
  ) {
    super(message);
    this.name = "CurrencyExchangeError";
  }
}

let cache: CachedRates | null = null;
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds (refresh cache twice a day)

function isCacheValid(): boolean {
  if (!cache) {
    return false;
  } else {
    const now = Date.now();
    const cacheAge = now - cache?.timestamp;
    return cacheAge < CACHE_DURATION; //Cache should be less than expiration duration.
  }
}

export async function convertFromUSD(
  usdAmount: number,
  targetCurrency: string
): Promise<ConversionResult> {
  try {
    // Fetch fresh exchange rates
    const rateData = await fetchExchangeRates(AccountCurrency.USD);

    // Find the exchange rate for target currency
    const exchangeRate = rateData.rates[targetCurrency.toUpperCase()];

    if (!exchangeRate) {
      throw new CurrencyExchangeError(
        `Currency ${targetCurrency} not supported`,
        "CURRENCY_SUPPORT_ERROR"
      );
    }

    // Perform the conversion
    const convertedAmount = usdAmount * exchangeRate;

    return {
      originalAmount: usdAmount,
      convertedAmount: Math.round(convertedAmount * 100) / 100,
      targetCurrency: targetCurrency.toUpperCase(),
      exchangeRate,
    };
  } catch (error) {
    if (error instanceof CurrencyExchangeError) {
      throw error;
    }

    throw new CurrencyExchangeError(
      "Issue fetching exchange rate",
      "API_ERROR",
      error
    );
  }
}

export async function convertToUSD(
  originalAmount: number,
  originalCurrency: string
): Promise<ConversionResult> {
  try {
    // Fetch fresh exchange rates
    const rateData = await fetchExchangeRates(originalCurrency);

    // Find the exchange rate for target currency
    const exchangeRate = rateData.rates[AccountCurrency.USD];

    if (!exchangeRate) {
      throw new CurrencyExchangeError(
        `Currency ${exchangeRate} not supported`,
        "CURRENCY_SUPPORT_ERROR"
      );
    }

    // Perform the conversion
    const convertedAmount = originalAmount * exchangeRate;

    return {
      originalAmount: originalAmount,
      originalCurrency: originalCurrency,
      convertedAmount: Math.round(convertedAmount * 100) / 100,
      targetCurrency: AccountCurrency.USD,
      exchangeRate,
    };
  } catch (error) {
    if (error instanceof CurrencyExchangeError) {
      throw error;
    }

    throw new CurrencyExchangeError(
      "Issue fetching exchange rate",
      "API_ERROR",
      error
    );
  }
}

export async function fetchExchangeRates(
  currency: string
): Promise<ExchangeRateResponse> {
  if (isCacheValid()) {
    console.log("Using cached exchange rates");
    return cache!.data; // ← USING saved data
  }
  console.log("Fetching fresh exchange rates");
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${formatCurrrencytoString(
        currency
      )}`
    );
    if (!response.ok) {
      throw new CurrencyExchangeError(
        `HTTP Error: ${response.status} ${response.statusText}`,
        "API_ERROR"
      );
    }
    const data: ExchangeRateResponse = await response.json();

    cache = {
      data, // Save the exchange rates
      timestamp: Date.now(), // Save when we got them
    };

    return data;
  } catch (error) {
    if (error instanceof CurrencyExchangeError) {
      throw error;
    }

    throw new CurrencyExchangeError(
      `Failed to fetch exchange rates ${
        error instanceof Error ? error.message : String(error)
      }`,
      "API_ERROR",
      error
    );
  }
}
