"use client";

import { processImageFile } from "@/helpers/process-image";
import {
  TradingAnalysisRequest,
  UserInputs,
} from "@/schema/trade-analysis-schema";
import { createContext, ReactNode, useContext, useState } from "react";
import {
  AccountCurrency,
  TradePlan,
  TradingStyle,
} from "@/types/trading/analysis";
import { useUploadTradeAnalysis } from "@/hooks/useUploadToLLM";
import { useUploadAnalysis } from "@/hooks/useUploadAnalysis";
import { useTradeModuleData } from "@/hooks/useTradeModuleData";
import { updateAnalysisData } from "@/lib/analysisDataService";

type FormState = {
  // FTrack form state
  stepIndex: number;
  totalSteps: number;
  userInputFields: UserInputs | null;
  setUserInput: (partialFields: Partial<UserInputs>) => void;
  selectedImage: File | null;
  selectImageFile: (file: File) => void;
  clearImageFile: () => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  // Post- submit data
  validatedTradePlan: TradePlan | null;
  validatedUserInput: UserInputs | null;
  isLoading: boolean;
  updateLoading: (loading: boolean) => void;
  contextError: string | null;
  uploadFormData: (data: TradingAnalysisRequest, id: string) => Promise<void>;
};

export const DEFAULT_USER_INPUTS: UserInputs = {
  accountCurrency: AccountCurrency.USD,
  accountSize: 10000,
  riskPerTrade: 1,
  tradingStyle: TradingStyle.DAY,
};

export enum stageTitles {
  stageOne = "Upload Chart Screenshots",
  stageTwo = "Customise your setup",
}

const TradeAnalysisContext = createContext<FormState | undefined>(undefined);

/* 
Form context tracks: 

* current step, 
* user inputs, 
* selected image file

+ Gives data to native submit button in form layout.
+ Provides functions to navigate steps and set user inputs.

*/

export const TradeAnalysisProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // It should handle the upload of data and provide the validated trade plan and user inputs
  const { uploadDataToLLM } = useUploadTradeAnalysis();
  const { uploadToSupabase } = useUploadAnalysis();
  const { calculateMetrics, calulations } = useTradeModuleData();

  // Use CurrencyService.convertUSD directly instead of destructuring

  const [validatedTradePlan, setValidatedTradePlan] =
    useState<TradePlan | null>(null);
  const [validatedUserInput, setValidatedUserInput] =
    useState<UserInputs | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [contextError, setError] = useState("");

  const [stepIndex, setStepIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [userInputFields, setUserInputFields] = useState<UserInputs | null>(
    DEFAULT_USER_INPUTS
  );

  // Calculate total steps based on the TradeAnalysisFormSteps enum
  const totalSteps = Object.entries(stageTitles).length;

  const nextQuestion = () => {
    setStepIndex((prev) => prev + 1);
  };

  const prevQuestion = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const setUserInput = (partialFields: Partial<UserInputs>) => {
    setUserInputFields((prev) =>
      prev ? { ...prev, ...partialFields } : (partialFields as UserInputs)
    );
  };

  const selectImageFile = async (file: File) => {
    // Validate image file

    const image = await processImageFile(file);
    // If the image is valid, set it as the selected image

    if (image && image.file) {
      // If you want to handle the URL, you can do so here
      // setSelectedImageURL(image.url);
      setSelectedImage(image.file);
    } else {
      // If the image is invalid, you can handle the error here
      setSelectedImage(null);
      console.error("Invalid image file:", image.error);
    }
  };

  const clearImageFile = () => {
    setSelectedImage(null);
  };

  const updateLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const uploadFormData = async (data: TradingAnalysisRequest, id: string) => {
    setIsLoading(true);
    try {
      if (!data || !data.userInputs || !data.image) {
        setError("No data to upload");
        return;
      }

      const results = await uploadDataToLLM(data, id);

      if (results.success) {
        // If the upload was successful, set the validated trade plan and user inputs
        setValidatedTradePlan(results.analysis);
        setValidatedUserInput(results.userInput);
        // Call Supabase function to update the trade plan in the database
        await uploadToSupabase(results.analysis, results.userInput);
        // Calculate metrics based on the analysis and user input
        await calculateMetrics(results.analysis, results.userInput);
        // Update the analysis data with the calculations
        await updateAnalysisData(id, {
          calculations: calulations?.success ? calulations.data : undefined,
        });
      }
    } catch (err) {
      console.error("Error uploading data:", err);
      setError(
        `Failed to upload data:  ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      // Always reset loading state
      setIsLoading(false);
      // Reset form state
      setStepIndex(0);
      setSelectedImage(null);
      setUserInputFields(DEFAULT_USER_INPUTS);
    }
  };

  return (
    <TradeAnalysisContext.Provider
      value={{
        stepIndex,
        totalSteps,
        userInputFields,
        setUserInput,
        selectedImage,
        selectImageFile,
        clearImageFile,
        nextQuestion,
        prevQuestion,
        // Post-submit data
        validatedTradePlan,
        validatedUserInput,
        isLoading,
        updateLoading,
        contextError,
        uploadFormData,
      }}
    >
      {children}
    </TradeAnalysisContext.Provider>
  );
};

export const useTradeAnalysisContext = () => {
  const context = useContext(TradeAnalysisContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
