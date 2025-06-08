import {
  stageTitles,
  useTradeAnalysisContext,
} from "@/contexts/trade-analysis-context";
import FormProgressBar from "./form-progress-bar";
import FormNavigation from "./form-navigation";

export default function NewAnalysisFormHeader() {
  const { stepIndex } = useTradeAnalysisContext();
  // const userInputKeys = Object.keys(userInputSchema.shape);
  // const userInputKeys = Object.keys(userInputFields.);
  // userInputFields
  const renderTitle = () => {
    switch (stepIndex) {
      case 0:
        return stageTitles.stageOne;
      case 1:
        return stageTitles.stageTwo;
      case 2:
        return "Trade Analysis Result";
      default:
        return "New Trade Analysis";
    }
  };

  // accountSize: z.number().positive("Account size must be positive"),
  // riskPerTrade: z
  //   .number()
  //   .min(0.1)
  //   .max(10, "Risk per trade should be between 0.1% and 10%"),
  // tradingStyle: z.string().min(1, "Trading style is required"),

  return (
    <div className="h-[100px] w-full max-w-4xl flex flex-col gap-6 justify-center items-center">
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="text-3xl font-extralight">{renderTitle()}</h1>
        <FormNavigation />
      </div>
      <FormProgressBar />
    </div>
  );
}
