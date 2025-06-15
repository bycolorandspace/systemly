"use client";
import { getAnalysisById } from "@/lib/analysisDataService";
import { TradePlan, UserInputs } from "@/types/trading/analysis";
import { useCallback, useState } from "react";

export function useGetAnalysisWithID() {
  const [analysis, setAnalysis] = useState<TradePlan | null>(null);
  const [userInputs, setUserInputs] = useState<UserInputs | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Fetches the analysis by ID and updates the state.
   * @param analysisId - The ID of the analysis to fetch.
   */
  const getAnalysisWithID = useCallback(async (analysisId: string) => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await getAnalysisById(analysisId);
      if (response?.success) {
        setAnalysis(response.data ? response.data.trade_data : null);
        setUserInputs(response.data ? response.data.user_input : null);
      } else {
        setError("No analysis found for the given ID");
        setAnalysis(null);
        setUserInputs(null);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to fetch analysis");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getAnalysisWithID,
    analysis,
    userInputs,
    error,
    loading,
  };
}
