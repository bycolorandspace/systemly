import { useAuth } from "@/contexts/auth-context";
import { DatabaseError, uploadAnalysisData } from "@/lib/analysisDataService";
import { TradePlan, UserInputs } from "@/types/trading/analysis";
import { useState } from "react";

type UploadState = {
  uploading: boolean;
  error: string | null;
};

export function useUploadAnalysis() {
  const { user } = useAuth();
  const [uploadState, setUploadState] = useState<UploadState>({
    uploading: false,
    error: null,
  });

  const uploadToSupabase = async (
    analysis: TradePlan,
    userInputs: UserInputs
  ): Promise<void> => {
    if (!user?.id) {
      setUploadState((prev) => ({
        ...prev,
        error: "User doesn't exist.",
        uploaded: null,
      }));
    }

    setUploadState((prev) => ({
      ...prev,
      uploading: true,
      error: null,
    }));

    try {
      if (!user) throw new Error("User is not authenticated");
      const record = await uploadAnalysisData(user?.id, userInputs, analysis);
      if (record.success) {
        setUploadState({
          uploading: false,
          error: null,
        });
      } else {
        setUploadState({
          uploading: false,
          error: record.error || "Failed to save analysis",
        });
        console.error(
          "Upload error:",
          record.error || "Failed to save analysis"
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof DatabaseError
          ? error.message
          : "Failed to save analysis";
      console.error("Upload error:", errorMessage);
      setUploadState({
        uploading: false,
        error: errorMessage,
      });
    }
  };

  const clearError = () => {
    setUploadState((prev) => ({ ...prev, error: null }));
  };

  return {
    uploadToSupabase,
    uploading: uploadState.uploading,
    error: uploadState.error,
    clearError,
  };
}
