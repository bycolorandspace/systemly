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
import { useTradeplan } from "@/hooks/useTradePlan";

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
  error: string | null;
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
  const { uploadData } = useTradeplan();

  const [validatedTradePlan, setValidatedTradePlan] =
    useState<TradePlan | null>(null);
  const [validatedUserInput, setValidatedUserInput] =
    useState<UserInputs | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [stepIndex, setStepIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [userInputFields, setUserInputFields] = useState<UserInputs | null>(
    DEFAULT_USER_INPUTS
  );
  const totalSteps = 2;

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

      const results = await uploadData(data, id);

      if (results.success) {
        console.log(
          "Data uploaded successfully with id: ",
          results.analysis.id
        );
        // If the upload was successful, set the validated trade plan and user inputs
        setValidatedTradePlan(results.analysis);
        setValidatedUserInput(results.userInput);
      }
    } catch (err) {
      console.error("Error uploading data:", err);
      setError("Failed to upload data");
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
        error,
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
