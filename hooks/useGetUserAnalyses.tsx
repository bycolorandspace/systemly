"use client";
import {
  getUserAnalysesByID,
  TradeAnalysisReturn,
} from "@/lib/analysisDataService";
import { useCallback, useState } from "react";

export function useGetUsersAnalyses() {
  const [analyses, setAnalyses] = useState<TradeAnalysisReturn[] | null>(null);
  const [newUser, setNewUser] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserAnalyses = useCallback(
    async (userId: string, filter?: string) => {
      console.log(
        "Fetching user analyses for userId:",
        userId,
        "with filter:",
        filter
      );
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await getUserAnalysesByID(userId, filter);
        if (response?.success) {
          const data = response.data
            ? (response.data as TradeAnalysisReturn[])
            : null;

          if (!data || data.length === 0) {
            console.log("No analyses found for user:", userId);
            setNewUser(true);
            setError("Could not find what you're looking for.");
            setAnalyses(null);
            return;
          }
          setAnalyses(data); // Ensure data is cast to TradeAnalysisReturn[]
        } else {
          console.error("Error fetching user analyses:", response.error);
          setError("User has not created any analyses yet");
          setAnalyses(null);
        }
      } catch (error) {
        console.log("Error fetching user analyses:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch analysis");
        }
      } finally {
        setNewUser(false);
        setLoading(false);
      }
    },
    []
  );

  return {
    getUserAnalyses,
    newUser,
    analyses,
    error,
    loading,
  };
}
