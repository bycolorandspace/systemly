// TypeScript types for tradable assets with standard lot sizes
export interface ForexPair {
  symbol: string;
  name: string;
  type?: string;
  base: string;
  quote: string;
  category: "major" | "minor" | "exotic";
  pip: number;
  spread_typical: number; // in pips
  standard_lot_size: number; // in base currency units
}

export interface Commodities {
  symbol: string;
  name: string;
  type?: string;
  base: string;
  quote: string;
  category: "precious_metal" | "energy";
  pip: number;
  spread_typical: number; // in pips
  standard_lot_size: number; // in base currency units
}

export interface IndexPair {
  symbol: string;
  name: string;
  type?: string;
  country: string;
  currency: string;
  sector: string;
  pip?: number;
  market_hours: string;
  standard_lot_size: number; // typically 1 unit for CFDs
}

export interface StockPair {
  symbol: string;
  name: string;
  type?: string;
  exchange: string;
  sector: string;
  market_cap: "large" | "mid" | "small";
  pip?: number;
  currency: string;
  standard_lot_size: number; // typically 100 shares for most stocks
}

export interface TradableAssets {
  forex: ForexPair[];
  indices: IndexPair[];
  stocks: StockPair[];
  commodities: Commodities[];
}

// Complete dataset of popular tradable asset pairs with standard lot sizes
export const TRADABLE_ASSETS: TradableAssets = {
  // Add to your TRADABLE_ASSETS
  commodities: [
    // === PRECIOUS METALS ===
    {
      symbol: "XAUUSD",
      name: "Gold / US Dollar",
      base: "XAU",
      quote: "USD",
      category: "precious_metal",
      pip: 0.01,
      spread_typical: 3.0,
      standard_lot_size: 100, // 100 ounces
    },
    {
      symbol: "XAGUSD",
      name: "Silver / US Dollar",
      base: "XAG",
      quote: "USD",
      category: "precious_metal",
      pip: 0.001,
      spread_typical: 5.0,
      standard_lot_size: 5000, // 5000 ounces
    },
    {
      symbol: "XPTUSD",
      name: "Platinum / US Dollar",
      base: "XPT",
      quote: "USD",
      category: "precious_metal",
      pip: 0.01,
      spread_typical: 8.0,
      standard_lot_size: 100, // 100 ounces
    },
    {
      symbol: "XPDUSD",
      name: "Palladium / US Dollar",
      base: "XPD",
      quote: "USD",
      category: "precious_metal",
      pip: 0.01,
      spread_typical: 12.0,
      standard_lot_size: 100, // 100 ounces
    },

    // === ENERGY ===
    {
      symbol: "USOIL",
      name: "US Crude Oil",
      base: "USO",
      quote: "USD",
      category: "energy",
      pip: 0.01,
      spread_typical: 4.0,
      standard_lot_size: 1000, // 1000 barrels
    },
    {
      symbol: "UKOIL",
      name: "UK Brent Oil",
      base: "UKO",
      quote: "USD",
      category: "energy",
      pip: 0.01,
      spread_typical: 4.5,
      standard_lot_size: 1000, // 1000 barrels
    },
    {
      symbol: "NGAS",
      name: "Natural Gas",
      base: "NGAS",
      quote: "USD",
      category: "energy",
      pip: 0.001,
      spread_typical: 8.0,
      standard_lot_size: 10000, // 10,000 MMBtu
    },
  ],
  forex: [
    // Major pairs
    {
      symbol: "EURUSD",
      name: "Euro / US Dollar",
      base: "EUR",
      quote: "USD",
      category: "major",
      pip: 0.0001,
      spread_typical: 1.2,
      standard_lot_size: 100000,
    },
    {
      symbol: "GBPUSD",
      name: "British Pound / US Dollar",
      base: "GBP",
      quote: "USD",
      category: "major",
      pip: 0.0001,
      spread_typical: 1.5,
      standard_lot_size: 100000,
    },
    {
      symbol: "USDJPY",
      name: "US Dollar / Japanese Yen",
      base: "USD",
      quote: "JPY",
      category: "major",
      pip: 0.01,
      spread_typical: 1.0,
      standard_lot_size: 100000,
    },
    {
      symbol: "USDCHF",
      name: "US Dollar / Swiss Franc",
      base: "USD",
      quote: "CHF",
      category: "major",
      pip: 0.0001,
      spread_typical: 1.8,
      standard_lot_size: 100000,
    },
    {
      symbol: "AUDUSD",
      name: "Australian Dollar / US Dollar",
      base: "AUD",
      quote: "USD",
      category: "major",
      pip: 0.0001,
      spread_typical: 1.4,
      standard_lot_size: 100000,
    },
    {
      symbol: "USDCAD",
      name: "US Dollar / Canadian Dollar",
      base: "USD",
      quote: "CAD",
      category: "major",
      pip: 0.0001,
      spread_typical: 1.6,
      standard_lot_size: 100000,
    },
    {
      symbol: "NZDUSD",
      name: "New Zealand Dollar / US Dollar",
      base: "NZD",
      quote: "USD",
      category: "major",
      pip: 0.0001,
      spread_typical: 2.0,
      standard_lot_size: 100000,
    },
    // Minor pairs
    {
      symbol: "EURGBP",
      name: "Euro / British Pound",
      base: "EUR",
      quote: "GBP",
      category: "minor",
      pip: 0.0001,
      spread_typical: 2.0,
      standard_lot_size: 100000,
    },
    {
      symbol: "EURJPY",
      name: "Euro / Japanese Yen",
      base: "EUR",
      quote: "JPY",
      category: "minor",
      pip: 0.01,
      spread_typical: 1.8,
      standard_lot_size: 100000,
    },
    {
      symbol: "GBPJPY",
      name: "British Pound / Japanese Yen",
      base: "GBP",
      quote: "JPY",
      category: "minor",
      pip: 0.01,
      spread_typical: 2.5,
      standard_lot_size: 100000,
    },
    {
      symbol: "EURCHF",
      name: "Euro / Swiss Franc",
      base: "EUR",
      quote: "CHF",
      category: "minor",
      pip: 0.0001,
      spread_typical: 2.2,
      standard_lot_size: 100000,
    },
    {
      symbol: "EURAUD",
      name: "Euro / Australian Dollar",
      base: "EUR",
      quote: "AUD",
      category: "minor",
      pip: 0.0001,
      spread_typical: 2.8,
      standard_lot_size: 100000,
    },
    {
      symbol: "EURCAD",
      name: "Euro / Canadian Dollar",
      base: "EUR",
      quote: "CAD",
      category: "minor",
      pip: 0.0001,
      spread_typical: 3.0,
      standard_lot_size: 100000,
    },
    // Exotic pairs
    {
      symbol: "USDTRY",
      name: "US Dollar / Turkish Lira",
      base: "USD",
      quote: "TRY",
      category: "exotic",
      pip: 0.0001,
      spread_typical: 15.0,
      standard_lot_size: 100000,
    },
    {
      symbol: "USDZAR",
      name: "US Dollar / South African Rand",
      base: "USD",
      quote: "ZAR",
      category: "exotic",
      pip: 0.0001,
      spread_typical: 8.0,
      standard_lot_size: 100000,
    },
    {
      symbol: "USDMXN",
      name: "US Dollar / Mexican Peso",
      base: "USD",
      quote: "MXN",
      category: "exotic",
      pip: 0.0001,
      spread_typical: 6.0,
      standard_lot_size: 100000,
    },
  ],

  indices: [
    {
      symbol: "SPX500",
      name: "S&P 500",
      country: "United States",
      currency: "USD",
      sector: "Broad Market",
      market_hours: "09:30-16:00 EST",
      standard_lot_size: 1,
    },
    {
      symbol: "NAS100",
      name: "NASDAQ 100",
      country: "United States",
      currency: "USD",
      sector: "Technology",
      market_hours: "09:30-16:00 EST",
      standard_lot_size: 1,
    },
    {
      symbol: "US30",
      name: "Dow Jones Industrial Average",
      country: "United States",
      currency: "USD",
      sector: "Industrial",
      market_hours: "09:30-16:00 EST",
      standard_lot_size: 1,
    },
    {
      symbol: "GER40",
      name: "DAX 40",
      country: "Germany",
      currency: "EUR",
      sector: "Broad Market",
      market_hours: "09:00-17:30 CET",
      standard_lot_size: 1,
    },
    {
      symbol: "UK100",
      name: "FTSE 100",
      country: "United Kingdom",
      currency: "GBP",
      sector: "Broad Market",
      market_hours: "08:00-16:30 GMT",
      standard_lot_size: 1,
    },
    {
      symbol: "JPN225",
      name: "Nikkei 225",
      country: "Japan",
      currency: "JPY",
      sector: "Broad Market",
      market_hours: "09:00-15:00 JST",
      standard_lot_size: 1,
    },
    {
      symbol: "AUS200",
      name: "ASX 200",
      country: "Australia",
      currency: "AUD",
      sector: "Broad Market",
      market_hours: "10:00-16:00 AEST",
      standard_lot_size: 1,
    },
    {
      symbol: "HK50",
      name: "Hang Seng",
      country: "Hong Kong",
      currency: "HKD",
      sector: "Broad Market",
      market_hours: "09:30-16:00 HKT",
      standard_lot_size: 1,
    },
    {
      symbol: "FRA40",
      name: "CAC 40",
      country: "France",
      currency: "EUR",
      sector: "Broad Market",
      market_hours: "09:00-17:30 CET",
      standard_lot_size: 1,
    },
    {
      symbol: "ESP35",
      name: "IBEX 35",
      country: "Spain",
      currency: "EUR",
      sector: "Broad Market",
      market_hours: "09:00-17:30 CET",
      standard_lot_size: 1,
    },
    {
      symbol: "ITA40",
      name: "FTSE MIB",
      country: "Italy",
      currency: "EUR",
      sector: "Broad Market",
      market_hours: "09:00-17:30 CET",
      standard_lot_size: 1,
    },
    {
      symbol: "NED25",
      name: "AEX",
      country: "Netherlands",
      currency: "EUR",
      sector: "Broad Market",
      market_hours: "09:00-17:30 CET",
      standard_lot_size: 1,
    },
    {
      symbol: "SUI30",
      name: "SMI",
      country: "Switzerland",
      currency: "CHF",
      sector: "Broad Market",
      market_hours: "09:00-17:30 CET",
      standard_lot_size: 1,
    },
  ],

  stocks: [
    // US Large Cap Tech
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      exchange: "NASDAQ",
      sector: "Technology",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      exchange: "NASDAQ",
      sector: "Technology",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      exchange: "NASDAQ",
      sector: "Technology",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      exchange: "NASDAQ",
      sector: "Consumer Discretionary",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      exchange: "NASDAQ",
      sector: "Consumer Discretionary",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    {
      symbol: "META",
      name: "Meta Platforms Inc.",
      exchange: "NASDAQ",
      sector: "Technology",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      exchange: "NASDAQ",
      sector: "Technology",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    // US Financial & Industrial
    {
      symbol: "JPM",
      name: "JPMorgan Chase & Co.",
      exchange: "NYSE",
      sector: "Financial Services",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    {
      symbol: "BAC",
      name: "Bank of America Corporation",
      exchange: "NYSE",
      sector: "Financial Services",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    {
      symbol: "WMT",
      name: "Walmart Inc.",
      exchange: "NYSE",
      sector: "Consumer Staples",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    {
      symbol: "JNJ",
      name: "Johnson & Johnson",
      exchange: "NYSE",
      sector: "Healthcare",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    {
      symbol: "V",
      name: "Visa Inc.",
      exchange: "NYSE",
      sector: "Financial Services",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    // European Stocks
    {
      symbol: "ASML",
      name: "ASML Holding N.V.",
      exchange: "Euronext Amsterdam",
      sector: "Technology",
      market_cap: "large",
      currency: "EUR",
      standard_lot_size: 1,
    },
    {
      symbol: "SAP",
      name: "SAP SE",
      exchange: "XETRA",
      sector: "Technology",
      market_cap: "large",
      currency: "EUR",
      standard_lot_size: 1,
    },
    {
      symbol: "NESN",
      name: "Nestlé S.A.",
      exchange: "SIX Swiss Exchange",
      sector: "Consumer Staples",
      market_cap: "large",
      currency: "CHF",
      standard_lot_size: 1,
    },
    {
      symbol: "LVMH",
      name: "LVMH Moët Hennessy Louis Vuitton",
      exchange: "Euronext Paris",
      sector: "Consumer Discretionary",
      market_cap: "large",
      currency: "EUR",
      standard_lot_size: 1,
    },
    // Asian Stocks
    {
      symbol: "TSM",
      name: "Taiwan Semiconductor Manufacturing Company",
      exchange: "Taiwan Stock Exchange",
      sector: "Technology",
      market_cap: "large",
      currency: "TWD",
      standard_lot_size: 1000,
    },
    {
      symbol: "BABA",
      name: "Alibaba Group Holding Limited",
      exchange: "NYSE",
      sector: "Consumer Discretionary",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    {
      symbol: "TM",
      name: "Toyota Motor Corporation",
      exchange: "NYSE",
      sector: "Consumer Discretionary",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    // Commodities/Energy
    {
      symbol: "XOM",
      name: "Exxon Mobil Corporation",
      exchange: "NYSE",
      sector: "Energy",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    {
      symbol: "CVX",
      name: "Chevron Corporation",
      exchange: "NYSE",
      sector: "Energy",
      market_cap: "large",
      currency: "USD",
      standard_lot_size: 100,
    },
    // Mid Cap Examples
    {
      symbol: "SHOP",
      name: "Shopify Inc.",
      exchange: "NYSE",
      sector: "Technology",
      market_cap: "mid",
      currency: "USD",
      standard_lot_size: 100,
    },
    {
      symbol: "SQ",
      name: "Block Inc.",
      exchange: "NYSE",
      sector: "Financial Services",
      market_cap: "mid",
      currency: "USD",
      standard_lot_size: 100,
    },
  ],
};

// Utility functions for working with the data
export const getForexMajors = (): ForexPair[] =>
  TRADABLE_ASSETS.forex.filter((pair) => pair.category === "major");

export const getForexMinors = (): ForexPair[] =>
  TRADABLE_ASSETS.forex.filter((pair) => pair.category === "minor");

export const getForexExotics = (): ForexPair[] =>
  TRADABLE_ASSETS.forex.filter((pair) => pair.category === "exotic");

export const getIndicesByCountry = (country: string): IndexPair[] =>
  TRADABLE_ASSETS.indices.filter((index) => index.country === country);

export const getStocksByExchange = (exchange: string): StockPair[] =>
  TRADABLE_ASSETS.stocks.filter((stock) => stock.exchange === exchange);

export const getStocksBySector = (sector: string): StockPair[] =>
  TRADABLE_ASSETS.stocks.filter((stock) => stock.sector === sector);

export const getStocksByMarketCap = (
  marketCap: "large" | "mid" | "small"
): StockPair[] =>
  TRADABLE_ASSETS.stocks.filter((stock) => stock.market_cap === marketCap);

// Lot size calculation utilities
export const calculatePositionValue = (
  assetType: "forex" | "indices" | "stocks",
  symbol: string,
  lots: number,
  price: number
): number => {
  const asset = TRADABLE_ASSETS[assetType].find((a) => a.symbol === symbol);
  if (!asset) throw new Error(`Asset ${symbol} not found`);

  return lots * asset.standard_lot_size * price;
};

export const calculatePipValue = (
  forexSymbol: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  accountCurrency: string = "USD"
): number => {
  const pair = TRADABLE_ASSETS.forex.find((p) => p.symbol === forexSymbol);
  if (!pair) throw new Error(`Forex pair ${forexSymbol} not found`);

  // Simplified pip value calculation (would need current exchange rates for accuracy)
  return pair.pip * pair.standard_lot_size;
};

// Example usage:
// const majorForexPairs = getForexMajors();
// const usIndices = getIndicesByCountry('United States');
// const techStocks = getStocksBySector('Technology');
// const positionValue = calculatePositionValue('forex', 'EURUSD', 1, 1.0850);
