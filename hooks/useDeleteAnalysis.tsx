import { DeleteAnalysisById } from "@/lib/analysisDataService";
import { useState } from "react";

export default function useDeleteAnalysis() {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteAnalysis = async (analysisId: string): Promise<void> => {
    console.log("Deleting analysis with ID:", analysisId);
    try {
      const response = await DeleteAnalysisById(analysisId);

      if (response.success) {
        setDeleteSuccess(true);
        setDeleteError(null);
      } else {
        setDeleteSuccess(false);
        setDeleteError(response.error || "Failed to delete analysis");
        console.error(
          "Delete error:",
          response.error || "Failed to delete analysis"
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error";
      setDeleteSuccess(false);
      setDeleteError(errorMessage);
      console.error("Delete error:", errorMessage);
    }
  };

  return {
    deleteSuccess,
    deleteError,
    deleteAnalysis,
  };
}
