import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EllipsisVertical, LoaderCircle } from "lucide-react";
import TextInput from "../forms/text-input";
import { calculationData } from "@/app/risk-doctor/page";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Update_RiskCalculatorInputs } from "@/schema/risk-calculator-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Slider } from "../ui/slider";
import {
  getStopLossRange,
  getSymbolData,
} from "@/helpers/calculators/risk-calculators";

// Enhanced interface with validation context
interface DialogProps {
  paramData: calculationData;
  onParamUpdate: (update: Partial<Update_RiskCalculatorInputs>) => void;
  // New validation props
  exectutionType: "Buy" | "Sell";
  currentEntry: number;
  currentStopLoss: number;
  currentStopLossPips: number;
  currentTakeProfit: number;
}

// Dynamic validation schema based on trade context
const createValidationSchema = (
  tradeType: "Buy" | "Sell",
  currentEntry: number,
  currentStopLoss: number,
  currentTakeProfit: number,
  editingField: string
) => {
  // Build schema dynamically based on the field being edited
  if (editingField === "entryZone") {
    return z.object({
      entryZone: z.coerce
        .number()
        .min(0.01, "Entry must be greater than 0")
        .refine(
          (val) => {
            // Check against current stop loss
            const stopViolation =
              tradeType === "Buy"
                ? val <= currentStopLoss
                : val >= currentStopLoss;

            if (stopViolation) {
              return false;
            }

            // Check against current take profit
            const tpViolation =
              tradeType === "Buy"
                ? val >= currentTakeProfit
                : val <= currentTakeProfit;

            return !tpViolation;
          },
          {
            message: `Entry must be ${
              tradeType === "Buy"
                ? "above stop loss and below take profit"
                : "below stop loss and above take profit"
            }`,
          }
        ),
      stopLossPips: z.coerce.number().optional(),
      stopLoss: z.coerce.number().optional(),
      takeProfit: z.coerce.number().optional(),
    });
  }

  if (editingField === "stopLoss") {
    return z.object({
      entryZone: z.coerce.number().optional(),
      stopLossPips: z.coerce.number().optional(),
      stopLoss: z.coerce
        .number()
        .min(0.01, "Stop loss must be greater than 0")
        .refine(
          (val) => {
            const isValid =
              tradeType === "Buy" ? val < currentEntry : val > currentEntry;
            return isValid;
          },
          {
            message: `Stop loss must be ${
              tradeType === "Buy" ? "below" : "above"
            } entry (${currentEntry})`,
          }
        ),
      takeProfit: z.coerce.number().optional(),
    });
  }

  if (editingField === "takeProfit") {
    return z.object({
      entryZone: z.coerce.number().optional(),
      stopLossPips: z.coerce.number().optional(),
      stopLoss: z.coerce.number().optional(),
      takeProfit: z.coerce
        .number()
        .min(0.01, "Take profit must be greater than 0")
        .refine(
          (val) => {
            const isValid =
              tradeType === "Buy" ? val > currentEntry : val < currentEntry;
            return isValid;
          },
          {
            message: `Take profit must be ${
              tradeType === "Buy" ? "above" : "below"
            } entry (${currentEntry})`,
          }
        ),
    });
  }

  if (editingField === "stopLossPips") {
    return z.object({
      entryZone: z.coerce.number().optional(),
      stopLossPips: z.coerce
        .number()
        .optional() // Make it truly optional first
        .refine(
          (val) => {
            // Only validate if value exists
            if (val === undefined || val === null) return true;
            return val >= 1 && val <= 1000;
          },
          {
            message: "Stop loss pips must be between 1 and 1000",
          }
        ),
      stopLoss: z.coerce.number().optional(),
      takeProfit: z.coerce.number().optional(),
    });
  }

  // Default schema for unknown fields
  return z.object({
    entryZone: z.coerce.number().optional(),
    stopLossPips: z.coerce.number().optional(),
    stopLoss: z.coerce.number().optional(),
    takeProfit: z.coerce.number().optional(),
  });
};

function RenderInput({
  data,
  exectutionType,
  currentEntry,
  sliderInputs,
  takeProfitSliderInputs,
}: {
  data: calculationData;
  exectutionType: "Buy" | "Sell";
  currentEntry: number;
  sliderInputs?: {
    value: number[];
    handleValueChange: (newValue: number[]) => void;
  };
  takeProfitSliderInputs?: {
    value: number[];
    handleValueChange: (newValue: number[]) => void;
  };
}) {
  const stopSliderRange = getStopLossRange(data.pair);

  const calculateStopLossPrice = (pips: number) => {
    const symbolData = getSymbolData(data.pair);
    const pipValue = symbolData?.pipVal || 0.0001;

    if (exectutionType === "Buy") {
      // For buy: stop loss is below entry
      return currentEntry - pips * pipValue;
    } else {
      // For sell: stop loss is above entry
      return currentEntry + pips * pipValue;
    }
  };

  const calculateTakeProfitPrice = (pips: number) => {
    const symbolData = getSymbolData(data.pair);
    const pipValue = symbolData?.pipVal || 0.0001;

    if (exectutionType === "Buy") {
      // For buy: take profit is above entry
      return currentEntry + pips * pipValue;
    } else {
      // For sell: take profit is below entry
      return currentEntry - pips * pipValue;
    }
  };

  const getFieldGuidance = (fieldId: string) => {
    switch (fieldId) {
      case "entryZone":
        return `Entry price for your ${exectutionType} order`;
      case "stopLoss":
        return `Must be ${
          exectutionType === "Buy" ? "below" : "above"
        } entry (${currentEntry}) for ${exectutionType} trades`;
      case "takeProfit":
        return `Must be ${
          exectutionType === "Buy" ? "above" : "below"
        } entry (${currentEntry}) for ${exectutionType} trades`;
      case "stopLossPips":
        return "Distance in pips from entry to stop loss";
      default:
        return data.description;
    }
  };

  const id = data.id;
  switch (id) {
    case "lotSize":
      return (
        <div>
          <TextInput
            name={data.id}
            label={data.name}
            description={getFieldGuidance(id)}
            placeholder="Enter lot size"
          />
        </div>
      );
    case "entryZone":
      return (
        <TextInput
          name={data.id}
          label={`${data.name} (${exectutionType})`}
          description={getFieldGuidance(id)}
          placeholder={`Current: ${currentEntry}`}
        />
      );
    case "stopLossPips":
      return (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between mb-2">
              <h3>
                Price:{" "}
                {calculateStopLossPrice(sliderInputs?.value?.[0] || 50).toFixed(
                  2
                )}
              </h3>
              <span className="text-md text-secondary">
                {sliderInputs?.value} pips
              </span>
            </div>

            <Slider
              name="stopLossPips"
              value={sliderInputs?.value}
              onValueChange={sliderInputs?.handleValueChange}
              defaultValue={[stopSliderRange.default]}
              min={stopSliderRange.min}
              max={stopSliderRange.max}
              step={stopSliderRange.step}
            />

            <div className="text-xs text-muted-foreground">
              Moving {exectutionType === "Buy" ? "down" : "up"} from entry (
              {currentEntry})
            </div>
          </div>
        </div>
      );
    case "stopLoss":
      return (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between mb-2">
              <h3>
                Price:{" "}
                {calculateStopLossPrice(sliderInputs?.value?.[0] || 50).toFixed(
                  2
                )}
              </h3>
              <span className="text-md text-secondary">
                {sliderInputs?.value} pips
              </span>
            </div>

            <Slider
              value={sliderInputs?.value}
              onValueChange={sliderInputs?.handleValueChange}
              defaultValue={[stopSliderRange.default]}
              min={stopSliderRange.min}
              max={stopSliderRange.max}
              step={stopSliderRange.step}
            />

            <div className="text-xs text-muted-foreground">
              Moving {exectutionType === "Buy" ? "down" : "up"} from entry (
              {currentEntry})
            </div>
          </div>
        </div>
      );
    case "takeProfit":
      return (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {/* 🔥 NEW: Take profit slider with price preview */}
            <div className="flex flex-row items-center justify-between mb-2">
              <h3>
                Price:{" "}
                {calculateTakeProfitPrice(
                  takeProfitSliderInputs?.value?.[0] || 80
                ).toFixed(2)}
              </h3>
              <span className="text-md text-secondary">
                {takeProfitSliderInputs?.value} pips
              </span>
            </div>

            <Slider
              value={takeProfitSliderInputs?.value}
              onValueChange={takeProfitSliderInputs?.handleValueChange}
              defaultValue={[80]} // Default to 80 pips for take profit
              min={10}
              max={500} // Higher range for take profit
              step={5}
            />

            <div className="text-xs text-muted-foreground">
              Moving {exectutionType === "Buy" ? "up" : "down"} from entry (
              {currentEntry})
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function OpenEditParamDialog({
  paramData,
  onParamUpdate,
  exectutionType,
  currentEntry,
  currentStopLoss,
  currentStopLossPips,
  currentTakeProfit,
}: DialogProps) {
  //const [stopLossDistance, setStopLossDistance] = useState<number>(50);
  const [sliderValue, setSliderValue] = useState([50]);
  const [takeProfitSliderValue, setTakeProfitSliderValue] = useState([80]); // 🔥 NEW: Take profit slider state
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  // Create dynamic schema based on what field is being edited
  const validationSchema = useMemo(
    () =>
      createValidationSchema(
        exectutionType,
        currentEntry,
        currentStopLoss,
        currentTakeProfit,
        paramData.id
      ),
    [
      exectutionType,
      currentEntry,
      currentStopLoss,
      currentTakeProfit,
      paramData.id,
    ]
  );

  const methods = useForm<Update_RiskCalculatorInputs>({
    resolver: zodResolver(validationSchema),
    mode: "onBlur", // Validate on every change for immediate feedback
    defaultValues: {
      [paramData.id]: paramData.value as number,
    },
  });

  useEffect(() => {
    // Reset slider value when dialog opens
    if (isOpen) {
      console.log("Setting slider value to:", currentStopLossPips);
      setSliderValue([currentStopLossPips]);

      if (paramData.id === "takeProfit" && currentTakeProfit && currentEntry) {
        const symbolData = getSymbolData(paramData.pair);
        const pipValue = symbolData?.pipVal || 0.0001;

        const currentTakeProfitPips =
          Math.abs(currentTakeProfit - currentEntry) / pipValue;
        setTakeProfitSliderValue([Math.round(currentTakeProfitPips)]);
        console.log(
          "Setting take profit slider to:",
          Math.round(currentTakeProfitPips),
          "pips"
        );
      }
    }
  }, [
    isOpen,
    currentStopLossPips,
    paramData.id,
    paramData.pair,
    currentTakeProfit,
    currentEntry,
  ]);

  const handleValueChange = (newValue: number[]) => {
    setSliderValue(newValue);
    methods.setValue("stopLossPips", newValue[0], { shouldValidate: true });
    // Also update the form value directly ← THIS IS THE KEY DIFFERENCE
    // if (paramData.id === "stopLoss") {

    // }
  };

  const handleTakeProfitValueChange = (newValue: number[]) => {
    setTakeProfitSliderValue(newValue);

    // Calculate take profit price from pips
    const symbolData = getSymbolData(paramData.pair);
    const pipValue = symbolData?.pipVal || 0.0001;

    let calculatedPrice;
    if (exectutionType === "Buy") {
      calculatedPrice = currentEntry + newValue[0] * pipValue;
    } else {
      calculatedPrice = currentEntry - newValue[0] * pipValue;
    }

    // Update the form with calculated price
    methods.setValue("takeProfit", calculatedPrice, { shouldValidate: true });
    console.log(
      "Take profit updated - Pips:",
      newValue[0],
      "Price:",
      calculatedPrice
    );
  };

  const onSubmit = async (data: Partial<Update_RiskCalculatorInputs>) => {
    console.log("=== DIALOG SUBMIT WITH SLIDER ===");
    console.log("Form data:", data);
    console.log("Slider value:", sliderValue[0]);
    console.log("Param ID:", paramData.id);

    onParamUpdate(data);

    setLoader(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Close dialog after successful submission
    setLoader(false);
    setIsOpen(false);
  };

  // Check if form has errors to disable submit
  const hasErrors = Object.keys(methods.formState.errors).length > 0;
  const isValid = methods.formState.isValid;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-1">
          <EllipsisVertical className="w-4 h-4 text-secondary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <FormProvider {...methods}>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <DialogHeader>
                <DialogTitle>Edit {paramData.name}</DialogTitle>
                <DialogDescription>
                  Editing {paramData.name} for {exectutionType} trade. Values
                  must follow proper trading rules.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4">
                <div className="grid gap-3">
                  <RenderInput
                    data={paramData}
                    exectutionType={exectutionType}
                    currentEntry={currentEntry}
                    sliderInputs={{
                      value: sliderValue,
                      handleValueChange: handleValueChange,
                    }}
                    takeProfitSliderInputs={{
                      value: takeProfitSliderValue,
                      handleValueChange: handleTakeProfitValueChange,
                    }}
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  className={`flex flex-row gap-2 justify-items-center cursor-pointer ${
                    !isValid ? "opacity-50" : ""
                  }`}
                  type="submit"
                  disabled={!isValid || hasErrors}
                >
                  {loader && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
