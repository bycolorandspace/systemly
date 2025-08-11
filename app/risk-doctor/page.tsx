"use client";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import { FormProvider, useForm } from "react-hook-form";

import CalculatorResultsTableRow from "@/components/risk-doctor/calculator-results-table-row";
import SectionHeader from "@/components/common/section-header";
import TextInput from "@/components/forms/text-input";
import SelectInput from "@/components/forms/select-input";
import SelectPairInput from "@/components/forms/select-asset-input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RiskCalculatorInputs,
  riskCalculatorSchema,
  Update_RiskCalculatorInputs,
} from "@/schema/risk-calculator-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useRiskCalculator from "@/hooks/useRiskCalculator";
import { AccountCurrency } from "@/types/trading/analysis";
import { ExecutionType } from "@/types/calculator-types";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export type calculationData = {
  id: string;
  name: string;
  pair: string;
  type?: "data" | "rating" | "profit" | "slider";
  editable?: boolean;
  description: string;
  formula: string;
  value?: number | null | string; // Label value
  toolTip?: number | null | string; // Tooltip value
  pnl?: number | null;
  pips?: number | null; // Optional pips for calculations
  rr?: number | null; // Optional risk-reward ratio for calculations
};

export default function RiskDoctorPage() {
  const [loader, setLoader] = useState<boolean>(false);
  const [stopLossDistance, setStopLossDistance] = useState<number>(50);
  const [stopLossValue, setStopLossValue] = useState<number>(0);
  const [accountCurrency, setAccountCurrency] = useState<string>("USD"); // Default to USD
  const [riskData, setRiskData] = useState<RiskCalculatorInputs>();
  const [updatedTradeData, setUpdatedTradeData] =
    useState<Partial<Update_RiskCalculatorInputs>>();
  const [entry, setEntry] = useState<number>();

  const { lotSize, riskAmount, riskAssessment, scenerio, error } =
    useRiskCalculator(
      riskData,
      stopLossDistance, // Ensure stopLossDistance is defined
      stopLossValue ?? 0, // Ensure stopLossValue is defined
      entry ?? 0,
      updatedTradeData
    );

  const methods = useForm<RiskCalculatorInputs>({
    resolver: zodResolver(riskCalculatorSchema),
    mode: "onBlur", // Use the mode prop here
    defaultValues: {
      accountCurrency: AccountCurrency.USD,
      accountSize: 1000,
      riskPerTrade: 5,
      pair: "",
      entryZone: "3339",
      exectutionType: ExecutionType.BUY, // Default execution type
    },
  });

  const onSubmit = async (data: RiskCalculatorInputs) => {
    setLoader(true);
    // console.log("=== FORM SUBMISSION DEBUG ===");
    // console.log("Raw form data:", data);
    // console.log("Account size type:", typeof data.accountSize);
    // console.log("Risk per trade:", data.riskPerTrade);
    // console.table(data); // Nice table format in console
    // Submit data to calculator
    if (data.entryZone) setEntry(parseFloat(data.entryZone));
    if (data.stopLoss) setStopLossValue(parseFloat(data.stopLoss));
    setAccountCurrency(data.accountCurrency);
    setRiskData(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoader(false);
  };

  // Add this in your main component, after the useRiskCalculator call
  useEffect(() => {
    console.log("=== HOOK RETURN VALUES ===");
    // console.log("lotSize:", lotSize);
    // console.log("riskAmount:", riskAmount);
    // console.log("riskAssessment:", riskAssessment);
    console.log("scenario:", scenerio);

    if (scenerio) {
      setTimeout(() => {
        toast.success(`Risk calculated successfully`);
      }, 1000);
    }

    if (error) {
      console.error("Error in risk calculation:", error);
      toast.error(`Error: `, {
        description: error,
      });
      // Optionally, you can set an error state to display in the UI
    }
  }, [lotSize, riskAmount, riskAssessment, scenerio, error]);

  // Updates for recalculation
  const updateTradeParams = (data: Partial<Update_RiskCalculatorInputs>) => {
    setUpdatedTradeData(data);
    // Update entry param
    // Simplify - just always update if the value exists
    if (data.entryZone !== undefined) setEntry(data.entryZone);
    if (data.stopLossPips) setStopLossDistance(data.stopLossPips);
    console.log("stopLossPips updated!!!!!!!!!!!!1", data.stopLossPips);
    //if (data.stopLoss !== undefined) setStopLossValue(data.stopLoss);
  };

  const calculations: calculationData[] = [
    {
      id: "capital-risk",
      name: "Capital risk",
      pair: riskData?.pair ?? "Uknown",
      type: "rating",
      description:
        "How much of your total account balance you're putting at risk with this trade. This helps you understand if you're risking too much of your money on a single trade.",
      formula: "Capital Risk = (Risk Amount ÷ Account Size) × 100%",
      // Dummy stop loss value for demonstration
      value: riskAssessment?.capitalRisk,
    },
    {
      id: "execution-risk",
      name: "Execution risk",
      pair: riskData?.pair ?? "Uknown",
      type: "rating",
      description:
        "How difficult it might be to enter and exit this trade at your planned prices. Higher execution risk means the market might move too fast or have too little liquidity for smooth trading.",
      formula: "Execution Risk = Market Volatility + Liquidity Factors",
      // Dummy stop loss value for demonstration
      value: riskAssessment?.executionRisk,
    },
    {
      id: "overall-risk",
      name: "Overall risk",
      pair: riskData?.pair ?? "Uknown",
      type: "rating",
      description:
        "Your total risk level for this trade, combining both how much money you're risking and how challenging the trade might be to execute properly.",
      formula:
        "Overall Risk = Capital Risk + Execution Risk + Market Conditions",
      // Dummy stop loss value for demonstration
      value: riskAssessment?.overall,
    },
  ];

  const scenerioData: calculationData[] = [
    {
      id: "exectutionType",
      name: "Execution",
      pair: riskData?.pair ?? "Uknown",
      description:
        "Whether you're buying (going long) or selling (going short) the currency pair. This determines the direction of your trade.",
      formula: "Trade Direction = Buy (Long) or Sell (Short)",
      type: "data",
      editable: false,
      // Dummy stop loss value for demonstration
      value: scenerio?.type ?? "Uknown",
      toolTip: undefined,
    },
    {
      id: "total-pnl",
      name: "Profit and loss",
      pair: riskData?.pair ?? "Uknown",
      description:
        "The total amount of money you could make or lose on this trade. This shows your potential profit if the trade reaches your target, minus what you'd lose if it hits your stop loss.",
      formula:
        "Total P&L = (Target Price - Entry Price) × Lot Size × Pip Value",
      type: "data",
      // Dummy potential profit value for demonstration
      value: scenerio?.totalPNL,
    },
    {
      id: "risk-reward",
      name: "Risk reward",
      pair: riskData?.pair ?? "Uknown",
      description:
        "The ratio comparing how much you could make versus how much you could lose. A 1:2 ratio means you risk $1 to potentially make $2. Higher ratios are generally better.",
      formula: "Risk-Reward = Potential Profit ÷ Potential Loss",
      type: "data",
      // Dummy risk per trade value for demonstration
      value: scenerio?.riskRewardRatio,
    },
    {
      id: "lotSize",
      name: "Lot Size",
      pair: riskData?.pair ?? "Uknown",
      description:
        "The exact number of units you should trade to match your risk tolerance. This is your position size that ensures you don't risk more than planned.",
      formula: "Lot Size = Risk Amount ÷ (Stop Loss Pips × Pip Value)",
      type: "data",
      editable: true,
      value: lotSize as number, // Ensure lotSize is a number
      toolTip: undefined,
    },
    {
      id: "entryZone",
      name: "Entry",
      pair: riskData?.pair ?? "Uknown",
      description:
        "The price level where you plan to enter the trade. This is your starting point for calculating profits, losses, and risk-reward ratios.",
      formula: "Entry Price = Current Market Price or Planned Entry Level",
      type: "data",
      editable: true,
      // Dummy stop loss value for demonstration
      value: entry,
      toolTip: undefined,
    },
    {
      id: "stopLossPips",
      name: "Stop Loss",
      pair: riskData?.pair ?? "Uknown",
      description:
        "The price level where your trade will automatically close to prevent bigger losses. This is your safety net - the maximum loss you're willing to accept on this trade.",
      formula: "Stop Loss = Entry Price ± (Stop Loss Pips × Pip Size)",
      type: "data",
      editable: true,
      // Dummy stop loss value for demonstration
      value: scenerio?.stopLoss, // Try direct input from useState
      toolTip: stopLossDistance,
    },

    {
      id: "takeProfit",
      name: "Take Profit",
      pair: riskData?.pair ?? "Uknown",
      description:
        "The price level where your trade will automatically close to secure your profits. This is your target - where you want to exit the trade if it moves in your favor.",
      formula: "Take Profit = Entry Price ± (Target Pips × Pip Size)",
      type: "profit",
      editable: true,
      // Dummy take profit value for demonstration
      value: scenerio?.target.target,
      pips: scenerio?.target.pips,
      pnl: scenerio?.target.pnl,
      rr: scenerio?.target.rr,
    },
  ];

  return (
    <div className="max-w-7xl w-full">
      <div className="flex flex-col items-start justify-start h-screen p-8 w-full">
        <h1 className="text-3xl font-light">Risk Doctor</h1>
        <p className="text-secondary text-sm mt-2 max-w-xl">
          Use this tool to analyze your trades and improve your risk management.
        </p>

        <div className="flex flex-col gap-8 items-start justify-start w-full mt-8">
          {/* <div className="w-full h-full h-max-[500px]">
            <TradeResizer onResize={() => {}} />
          </div> */}

          <div className="flex flex-row items-start justify-between w-full gap-6">
            <div className="w-1/2 space-y-6">
              <SectionHeader title="Results" />

              <Tabs
                defaultValue="scenerio"
                className="w-auto border border-border rounded-xl m-0 p-0"
              >
                <TabsList className="grid w-auto grid-cols-2 space-x-4 bg-transparent m-4 mb-0 justify-between items-center  max-w-[650px]">
                  <TabsTrigger
                    key={"scenerio"}
                    value={"scenerio"}
                    className="data-[state=active]:bg-card rounded-full cursor-pointer "
                  >
                    {scenerio?.type} Scenerio
                  </TabsTrigger>
                  <TabsTrigger
                    key={"results"}
                    value={"results"}
                    className="data-[state=active]:bg-card rounded-full cursor-pointer "
                  >
                    <div className="flex items-center gap-2">
                      <span>Risk assessment</span>{" "}
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    </div>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="results" className="p-4">
                  <Card className="bg-transparent  gap-0 py-0 ">
                    {calculations.map((calc, index) => (
                      <CalculatorResultsTableRow
                        key={index}
                        currentValues={{
                          exectutionType:
                            riskData?.exectutionType === "Sell"
                              ? "Sell"
                              : "Buy",
                          entry: entry ?? 0,
                          stopLoss: stopLossValue ?? 0,
                          stopLossPips: scenerio?.stopLossDistance ?? 50,
                          takeProfit: scenerio?.target.target ?? 0,
                        }}
                        calculations={calc}
                        updateDataFinish={updateTradeParams}
                      />
                    ))}
                  </Card>
                </TabsContent>
                <TabsContent value="scenerio" className="p-4">
                  <Card className="bg-transparent  gap-0 py-0 ">
                    {scenerioData.map((calc, index) => (
                      <CalculatorResultsTableRow
                        key={index}
                        currentValues={{
                          exectutionType:
                            riskData?.exectutionType === "Sell"
                              ? "Sell"
                              : "Buy",
                          entry: entry ?? 0,
                          stopLoss: stopLossValue ?? 0,
                          stopLossPips: scenerio?.stopLossDistance ?? 50,
                          takeProfit: scenerio?.target.target ?? 0,
                        }}
                        calculations={calc}
                        updateDataFinish={updateTradeParams}
                        accountCurrency={accountCurrency} // Pass account currency
                      />
                    ))}
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className=" w-1/2 space-y-6">
              <SectionHeader title="Calculator" />
              <Card className="px-8 py-4  bg-transparent ">
                <div className="flex flex-col gap-4">
                  <FormProvider {...methods}>
                    <Form {...methods}>
                      <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <SelectInput
                          name={"accountCurrency"}
                          label={"Account currency"}
                          placeholder={"Select a currency"}
                          data={Object.entries(AccountCurrency)}
                        />

                        <TextInput
                          name="accountSize"
                          label="Your account size"
                          type="number"
                          placeholder="Enter account size, e.g 1000"
                          description="This is the total amount of money in your trading
                              account. It will help us calculate your risk and
                              position size."
                        />

                        <TextInput
                          name="riskPerTrade"
                          label="Risk"
                          type="number"
                          placeholder="1%"
                          description="How much risk for this trade?"
                        />

                        <SelectPairInput
                          name="pair"
                          label="Pair"
                          placeholder="Tradable pair"
                        />

                        <SelectInput
                          name={"exectutionType"}
                          label={"Execution type"}
                          placeholder={"Select execution type"}
                          data={Object.entries(ExecutionType)}
                        />
                        <TextInput
                          name="entryZone"
                          label="Entry Zone"
                          type="number"
                          placeholder="Market entry price, e.g: 3024"
                          description="We use this to calculate stop loss pips and potential PNLs."
                        />
                        <Button type="submit" className="cursor-pointer">
                          {loader && (
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Calculate
                        </Button>
                      </form>
                    </Form>
                  </FormProvider>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
