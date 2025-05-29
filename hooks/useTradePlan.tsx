import { AnalysisResponse } from "@/types/trading/analysis";
import { useState } from "react";

export function useTradeplan() {
  const [tradePlan, setTradePlan] = useState<AnalysisResponse | null>(null);
  const [isUploading, setIsuploading] = useState(false);
  const [error, setError] = useState("");

  const uploadImage = async (imageFile: File | null) => {
    if (imageFile === null) {
      setTradePlan(null);
      setError("No image file to upload");
      return;
    } else {
      const formData = new FormData();
      formData.append("image", imageFile);
      setIsuploading(true);
      try {
        const response = await fetch("/api/analyse-chart", {
          method: "POST",
          body: formData, // No Content-Type header needed
        });

        if (response.ok) {
          const data: AnalysisResponse = await response.json();
          if (data.success && data.analysis) {
            data.analysis.id = crypto.randomUUID();
            setTradePlan(data);
            // Upload page: Save data
            localStorage.setItem("currentTradePlan", JSON.stringify(data));
          } else {
            setTradePlan(null);
            setError(`Analysis failed: ${data.error}` || "Analysis failed");
            return;
          }
        } else {
          setTradePlan(null);
          setError(`HTTP ${response.status} : ${response.statusText}`);
          return;
        }
        setIsuploading(false);
      } catch (error) {
        setError(`Upload error: ${error}`);
        setIsuploading(false);
        return;
      }
    }
  };

  return {
    tradePlan,
    isUploading,
    error,
    uploadImage,
  };
}
