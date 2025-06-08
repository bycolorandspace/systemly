import {
  ActionPlan,
  AlternativeScenarios,
  BeginnerGuidance,
  Execution,
  ExitStrategy,
  RiskWarnings,
  TradingReality,
} from "@/types/trading/analysis";

export const CopyTradeData = (
  title: string,
  list:
    | Execution
    | TradingReality
    | ActionPlan
    | ExitStrategy
    | BeginnerGuidance
    | AlternativeScenarios
    | RiskWarnings
    | string[]
    | undefined
) => {
  if (list || list !== undefined) {
    // Check if analysis is an array, if not, convert it to an array

    // Map through the analysis data to extract the relevant information
    const data = () => {
      // Get list of items and map them to the desired format

      if (list instanceof String || typeof list === "string") {
        return `${list}`;
      } else {
        return Object.entries(list ?? { "0": { title: "No data here" } }).map(
          ([, listitem]) => {
            return `${listitem.title}:  ${
              listitem.description ? listitem.description : ""
            }   ${listitem.data ? listitem.data : ""}`;
          }
        );
      }
    };

    const result = data();
    const copyString = Array.isArray(result) ? result.join("\n") : result;
    const subject = `systemly.ai - Your ${title} Trade Data. God speed 🚀.`;
    const copyData = {
      title: subject,
      content: copyString,
    };

    navigator.clipboard
      .writeText(JSON.stringify(copyData, null, 2))
      .then(() => {
        //Successfully copied to clipboard - SHOW TOAST
        return `${copyData.title} ${copyData}`;
        console.log("Trade data copied to clipboard successfully.");
      })
      .catch((error) => {
        // Failed to copy - SHOW TOAST
        return `Failed to copy trade data: ${error}`;
        console.error("Failed to copy trade data to clipboard:", error);
      });
  } else {
    // If analysis is undefined or empty, return a message - SHOW TOAST
    return "No trade data available to copy.";
  }
};
