import { dummyData, userInput } from "@/data/dummy-data";
import { TradingAnalysisRequest } from "@/schema/trade-analysis-schema";
import {
  AnalysisResponse,
  TradePlan,
  UserInputs,
} from "@/types/trading/analysis";
import { useEffect, useState } from "react";

export function useUploadTradeAnalysis() {
  const [fullResults, setFullResults] = useState<AnalysisResponse | null>(null);
  const [
    error,
    //setError
  ] = useState("");

  // Mock API function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockApiCall = async (
    data: TradingAnalysisRequest,
    id: string
  ): Promise<AnalysisResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          analysis: { ...dummyData, id: id },
          userInput: userInput,
        });
      }, 36000);
    });
  };

  // Real API function
  const realApiCall = async (
    data: TradingAnalysisRequest,
    id: string
  ): Promise<AnalysisResponse> => {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("userInputs", JSON.stringify(data.userInputs));

    const response = await fetch("/api/analyse-chart", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    result.analysis.id = id; // Ensure ID is set
    return result;
  };

  const uploadData = async (
    data: TradingAnalysisRequest,
    id: string
  ): Promise<AnalysisResponse> => {
    // Clear old data immediately
    localStorage.removeItem("currentTradePlan");
    localStorage.removeItem("currentUserInput");
    setFullResults(null); // Clear state too

    try {
      // REAL VERSION (future)
      const result = await realApiCall(data, id);

      // State updates happen regardless of mock vs real
      setFullResults(result);
      return result;
    } catch (error) {
      setFullResults(null);
      throw error; // Re-throw so caller can handle
    }
  };

  // Effect 1: Save to localStorage when fullResults changes
  useEffect(() => {
    if (fullResults) {
      console.log("Matching ID #3...", fullResults.analysis.id);
      localStorage.setItem(
        "currentTradePlan",
        JSON.stringify(fullResults.analysis)
      );
      localStorage.setItem(
        "currentUserInput",
        JSON.stringify(fullResults.userInput)
      );
    }
  }, [fullResults]); // Only run when fullResults changes

  // Effect 2: Load from localStorage on mount
  useEffect(() => {
    console.log("useTradePlan hook mounted, loading stored data...");
    const storedAnalysis = localStorage.getItem("currentTradePlan");
    const storedUser = localStorage.getItem("currentUserInput");

    if (
      storedAnalysis &&
      storedAnalysis !== "null" &&
      storedAnalysis !== "undefined"
    ) {
      //console.log("About to parse stored data:");
      try {
        const analysis: TradePlan = JSON.parse(storedAnalysis);
        const userInput: UserInputs = JSON.parse(storedUser || "{}");
        //console.log("Parsed stored data:", analysis, userInput);
        setFullResults({
          success: true,
          analysis: analysis,
          userInput: userInput,
        });
      } catch (error) {
        console.error("Failed to parse stored data:", error);
        setFullResults(null);
      }
    } else {
      //console.log("No stored data found or data is invalid");
      setFullResults(null);
    }
  }, []); // Empty dependency array - only run on mount

  return {
    fullResults,
    error,
    uploadData,
  };
}
