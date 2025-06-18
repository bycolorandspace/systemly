export function ExecutionTypeToString(executionType: string): string {
  if (
    executionType === "Buy" ||
    executionType === "buy" ||
    executionType === "Long" ||
    executionType === "long" ||
    executionType.includes("Buy") ||
    executionType.includes("buy")
  ) {
    return "Buy";
  } else if (
    executionType === "Sell" ||
    executionType === "sell" ||
    executionType === "Short" ||
    executionType === "short" ||
    executionType.includes("Sell") ||
    executionType.includes("sell")
  ) {
    return "Sell";
  } else {
    return "Unknown";
  }
}
