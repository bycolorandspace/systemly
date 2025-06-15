import { useTradeAnalysisContext } from "@/contexts/trade-analysis-context";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function FormNavigation() {
  const { stepIndex, totalSteps, prevQuestion, nextQuestion } =
    useTradeAnalysisContext();
  const { formState } = useFormContext();
  const isDisabled = !formState.isValid || formState.isSubmitting;

  return (
    <>
      <div className="flex flex-row justify-center">
        <Button
          type="button"
          variant={"link"}
          onClick={prevQuestion}
          className="rounded-full hover:text-accent-foreground hover:no-underline"
          hidden={stepIndex === 0 ? true : false}
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={nextQuestion}
          className="rounded-full"
          hidden={stepIndex === totalSteps - 1 ? true : false}
        >
          Next
        </Button>
        <Button
          type="submit"
          className="rounded-full"
          hidden={stepIndex !== totalSteps - 1 ? true : false}
          disabled={isDisabled}
        >
          Finish
          <ArrowUp className="w-[20px] h-[20px] ml-2" />
        </Button>
      </div>
    </>
  );
}
