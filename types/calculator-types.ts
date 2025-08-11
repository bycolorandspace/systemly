export enum AccountCurrency {
  USD = "USD",
  EURO = "EURO",
  GBP = "GBP",
}
export enum ExecutionType {
  BUY = "Buy",
  SELL = "Sell",
}

export type CurrentCalcultorValues = {
  exectutionType: "Buy" | "Sell";
  entry: number;
  stopLoss: number;
  stopLossPips: number;
  takeProfit: number;
};
