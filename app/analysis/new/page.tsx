"use client";

import FormLayout from "@/components/new-analysis/form-layout";

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import Image from "next/image";
// import {
//   ArrowUp,
//   PlusCircle,
//   // LoaderPinwheelIcon,
//   X,
// } from "lucide-react";

import // useEffect,
// useEffect,
// useRef,
// useState,
"react";
// import { toast } from "sonner";
//import { useTradeplan } from "@/hooks/useTradePlan";
// import SelectChartImage from "@/components/new-analysis/steps/upload-chart";
import {
  tradingAnalysisRequestSchema,
  //UserInputs,
  //ImageUpload,
} from "@/schema/trade-analysis-schema";
import UserTradeInput from "@/components/new-analysis/steps/user-trade-input";
import SelectChartImage from "@/components/new-analysis/steps/upload-chart";
import { useTradeAnalysisContext } from "@/contexts/trade-analysis-context";
import FormNavigation from "@/components/new-analysis/form-navigation";
import NewAnalysisFormHeader from "@/components/new-analysis/new-analysis-form-header";
// import { useRouter } from "next/navigation";
// import TradeAnalysisLoading from "@/components/skeleton/trade-analysis-loading";

const RenderCurrentStep = () => {
  const { stepIndex } = useTradeAnalysisContext();

  switch (stepIndex) {
    case 0:
      return <SelectChartImage />;
    case 1:
      return <UserTradeInput />;
    default:
      return <SelectChartImage />; // Fallback for unexpected stepIndex
  }
};

export default function NewTradeAnalysis() {
  // const form = useFormContext<>();
  //const [userInput, setUserInput] = useState<UserInputs | null>(null);
  // const { uploadImage } = useTradeplan(); // Re-add error handling and loading state
  // const { stepIndex } = useFormContext();
  //const { file, setFile } = useFormContext(); // Assuming you have a context to manage the file state

  return (
    <FormLayout schema={tradingAnalysisRequestSchema} mode="onBlur">
      <div className="w-full max-w-6xl mx-auto flex min-h-screen flex-col pb-12 items-center justify-start mt-8">
        <NewAnalysisFormHeader />
        <RenderCurrentStep />
        <FormNavigation />
      </div>

      {/* <SelectChartImage /> */}
      {/* <UserTradeInput /> */}
      {/* <AddUserInput / > */}
      {/* ADD user input */}
    </FormLayout>
  );
}
