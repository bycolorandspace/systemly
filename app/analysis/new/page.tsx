"use client";

import FormLayout from "@/components/new-analysis/form-layout";

import { tradingAnalysisRequestSchema } from "@/schema/trade-analysis-schema";
import UserTradeInput from "@/components/new-analysis/steps/user-trade-input";
import SelectChartImage from "@/components/new-analysis/steps/upload-chart";
import { useTradeAnalysisContext } from "@/contexts/trade-analysis-context";
import FormNavigation from "@/components/new-analysis/form-navigation";
import NewAnalysisFormHeader from "@/components/new-analysis/new-analysis-form-header";
import TradeAnalysisLoading from "@/components/skeleton/trade-analysis-loading";

const RenderCurrentStep = () => {
  const { stepIndex } = useTradeAnalysisContext();

  switch (stepIndex) {
    case 0:
      return <SelectChartImage />;
    case 1:
      return <UserTradeInput />;
    case 2:
      return <TradeAnalysisLoading />;
    default:
      return <SelectChartImage />; // Fallback for unexpected stepIndex
  }
};

export default function NewTradeAnalysis() {
  return (
    <FormLayout schema={tradingAnalysisRequestSchema} mode="onBlur">
      <div className="w-full max-w-6xl mx-auto flex min-h-screen flex-col pb-12 items-center justify-start mt-8 space-y-2">
        <NewAnalysisFormHeader />
        <RenderCurrentStep />
        <FormNavigation />
      </div>
    </FormLayout>
  );
}
