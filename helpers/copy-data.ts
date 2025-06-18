import {
  ActionPlan,
  AlternativeScenarios,
  BeginnerGuidance,
  Execution,
  ExitStrategy,
  MarketContext,
  ProfessionalEdge,
  RiskWarnings,
} from "@/types/trading/analysis";

export const CopyTradeData = (
  title: string,
  list:
    | ProfessionalEdge
    | MarketContext
    | Execution
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

      if (list !== undefined && typeof list === "string") {
        return `${list}`;
      } else {
        console.log("LIST DATA: ", list);
        if (Object.entries(list).length === 1) {
          return Object.values(list)[0];
        } else {
          return Object.entries(list ?? { "0": { title: "No data here" } }).map(
            ([, listitem]) => {
              return `${listitem.title}:  ${
                listitem.description ? listitem.description : ""
              }   ${listitem.data ? listitem.data : ""}`;
            }
          );
        }
      }
    };

    const result = data();

    let copyString = "";
    let copyData = { title: "", content: "" };
    const subject = `systemly.ai - Your ${title} Trade Data. God speed 🚀.`;
    let finalCopyString = "";

    if (Array.isArray(result)) {
      copyString = result.join("\n");
      copyData = {
        title: subject,
        content: copyString,
      };
      finalCopyString = `Title: ${copyData.title}\n\n${title}:\n${copyData.content}`;
    } else {
      finalCopyString = result.toString();
    }

    navigator.clipboard
      // Create a new ClipboardItem with the text data and no json
      .writeText(finalCopyString)
      .catch((error) => {
        // Failed to copy - SHOW TOAST
        return `Failed to copy trade data: ${error}`;
      });
  } else {
    // If analysis is undefined or empty, return a message - SHOW TOAST
    return "No trade data available to copy.";
  }
};
