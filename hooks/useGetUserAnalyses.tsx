"use client";
import {
  getUserAnalysesByID,
  TradeAnalysisReturn,
} from "@/lib/analysisDataService";
import { TradePlan, UserInputs } from "@/types/trading/analysis";
import { useCallback, useState } from "react";

export function useGetUsersAnalyses() {
  const [analyses, setAnalyses] = useState<TradePlan[] | null>(null);
  const [userInputs, setUserInputs] = useState<UserInputs[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserAnalyses = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await getUserAnalysesByID(userId);
      if (response?.success) {
        const data = response.data
          ? (response.data as TradeAnalysisReturn[])
          : null;

        if (!data || data.length === 0) {
          setError("User has not created any analyses yet");
          setAnalyses(null);
          setUserInputs(null);
          return;
        }

        setAnalyses(
          data ? data.map((item) => item.data?.trade_data as TradePlan) : [] // Extract trade_data from each TradeAnalysisReturn
        ); // Ensure data is cast to TradeAnalysisReturn[]
        setUserInputs(
          data ? data.map((item) => item.data?.user_input as UserInputs) : [] // Extract user_input from each TradeAnalysisReturn
        ); // Ensure data is cast to UserInputs[]
      } else {
        setError("User has not created any analyses yet");
        setAnalyses(null);
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
    getUserAnalyses,
    analyses,
    userInputs,
    error,
    loading,
  };
}
