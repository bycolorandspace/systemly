// - 🟢 EXCELLENT (85-100): Exceptional setup, high probability
// - 🟢 GOOD (70-84): Solid setup, good probability
// - 🟡 MODERATE (55-69): Average setup, proceed with caution
// - 🔴 WEAK (40-54): Poor setup, high risk
// - 🔴 AVOID (0-39): Very poor setup, avoid
// - 🔘 N/A: Data not available

export const GetScoreColor = (score: number) => {
  if (score >= 85) {
    return "bg-green-500 text-white"; // Excellent
  } else if (score >= 70) {
    return "bg-green-400 text-white"; // Good
  } else if (score >= 55) {
    return "bg-yellow-400 text-black"; // Moderate
  } else if (score >= 40) {
    return "bg-orange-400 text-white"; // Weak
  } else if (score >= 0) {
    return "bg-red-500 text-white"; // Avoid
  } else {
    return "bg-gray-300 text-black"; // N/A or invalid score
  }
};

export const GetTradingStyleColor = (style: string) => {
  if (style === "Day") {
    return "bg-amber-400 text-black"; // Day
  } else if (style === "Swing") {
    return "bg-sky-500 text-black"; // Swing
  } else if (style === "Position") {
    return "bg-green-300 text-black"; // Position
  } else if (style === "Scalper") {
    return "bg-pink-400 text-black"; // Scalper
  } else {
    return "bg-gray-300 text-black";
  }
};
