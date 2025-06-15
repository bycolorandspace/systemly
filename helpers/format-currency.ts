export function formatCurrrencytoSymbol(currency: string): string {
  if (currency === "USD" || currency === "US Dollar") {
    return "$";
  } else if (currency === "EURO" || currency === "EUR") {
    return "€";
  } else if (currency === "GBP") {
    return "£";
  } else {
    return currency; // Return the currency as is if not recognized
  }
}

export function formatCurrrencytoString(currency: string): string {
  if (currency === "$") {
    return "USD";
  } else if (currency === "€") {
    return "EUR";
  } else if (currency === "£") {
    return "GBP";
  } else {
    return currency; // Return the currency as is if not recognized
  }
}
