import { calculationData } from "@/app/risk-doctor/page";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import OpenEditParamDialog from "./edit-risk-param-dialog";
import { Update_RiskCalculatorInputs } from "@/schema/risk-calculator-schema";
import { CurrentCalcultorValues } from "@/types/calculator-types";
import { Skeleton } from "../ui/skeleton";

export default function CalculatorResultsTableRow({
  currentValues,
  calculations,
  updateDataFinish,
  accountCurrency = "USD", // Default to USD if not provided
}: {
  currentValues: CurrentCalcultorValues;
  calculations: calculationData;
  updateDataFinish: (data: Partial<Update_RiskCalculatorInputs>) => void;
  accountCurrency?: string; // Optional prop for account currency
}) {
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    // If value changes, we reset the loader
    if (calculations) {
      setLoader(true);
    }
    // Set timer
    setTimeout(() => {
      // Reset loader after 2 second
      setLoader(false);
    }, 1000);
  }, [calculations]);

  if (loader) {
    return (
      <div className="p-4  border-b border-border last:border-0 flex flex-row gap-0 w-full items-center justify-between">
        <span className="tableLabel w-full">
          <Skeleton className="w-1/2 h-4 rounded-lg" />{" "}
        </span>
        <div className="flex flex-row items-center justify-end gap-2 w-full max-w-lg">
          <Skeleton className="w-1/3 h-4 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4  border-b border-border last:border-0 flex flex-row gap-0 w-full items-center justify-between">
      <span className="tableLabel w-full">{calculations.name}</span>
      <div className="flex flex-row items-center justify-end gap-2 w-full max-w-lg">
        {calculations.type === "data" && (
          <Tooltip>
            <TooltipTrigger className="tableData cursor-pointer">
              {calculations.id === "total-pnl" &&
                calculations.value &&
                accountCurrency}
              {calculations.value ?? "-"}
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-xs text-muted-foreground">
                {calculations.toolTip}
              </span>
            </TooltipContent>
          </Tooltip>
        )}

        {calculations.type === "profit" && (
          <Tooltip>
            <TooltipTrigger className="tableData cursor-pointer">
              {calculations.value ?? "-"}
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-xs text-muted-foreground">
                {`${calculations.pips} pips | $${calculations.pnl} | Risk reward: ${calculations.rr}`}
              </span>
            </TooltipContent>
          </Tooltip>
        )}

        {/* pips: riskScenerios?.tp_three.pips,
      pnl: riskScenerios?.tp_three.pnl,
      rr: riskScenerios?.tp_three.rr, */}

        {calculations.type === "rating" && (
          <Tooltip>
            <TooltipTrigger className="tableData cursor-pointer">
              {calculations.value ?? "N/A"}
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-xs text-muted-foreground">
                {calculations.description}
              </span>
            </TooltipContent>
          </Tooltip>
        )}

        {calculations.editable && calculations.value && (
          <OpenEditParamDialog
            paramData={calculations}
            onParamUpdate={updateDataFinish}
            exectutionType={currentValues.exectutionType}
            currentEntry={currentValues.entry}
            currentStopLoss={currentValues.stopLoss}
            currentStopLossPips={currentValues.stopLossPips}
            currentTakeProfit={currentValues.takeProfit}
          />
        )}

        {/* 
        
        export default function OpenEditParamDialog({
  paramData,
  onParamUpdate,
  tradeType,
  currentEntry,
  currentStopLoss,
  currentTakeProfit,
        
        
        
        
        
        {calculations.pips && (
          <Badge variant={"outline"}>
            <span className="text-xs text-muted-foreground">
              {calculations.pips} pips
            </span>
          </Badge>
        )} */}
        {/* <Badge variant={"outline"}>
                    {" "}
                    Pips: {calculations[0].pips}
                  </Badge> */}
      </div>
    </div>
  );
}
