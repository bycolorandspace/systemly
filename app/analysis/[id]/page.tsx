"use client";

import TradePlanLeftCol from "@/components/trades/trade-plan-left-col";
import TradeHeader from "@/components/trades/trade-header";
import TradePlanRightCol from "@/components/trades/trade-plan-right-col";
import {
  BadgeCheck,
  //CookingPot,
  Crosshair,
  Skull,
  Wallet,
} from "lucide-react";
import React, { useEffect } from "react";
import TradeResultsModule from "@/components/trades/trade-results-module";
import { useTradeModuleData } from "@/hooks/useTradeModuleData";
//import { calculateTradeMetrics } from "@/helpers/trade-calculator";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { dummyData, userInput } from "@/data/dummy-data";
import SectionHeader from "@/components/common/section-header";
import TradeTechnicals from "@/components/trades/trade-technicals";
import { useTradeAnalysisContext } from "@/contexts/trade-analysis-context";
import { formatCurrrencytoSymbol } from "@/helpers/format-currency";
// import TradeAnalysisProgress from "@/components/trades/trade-analysis-progress";
import { useGetAnalysisWithID } from "@/hooks/useGetAnalysisWithID";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TradeAnalysisLoading from "@/components/skeleton/trade-analysis-loading";
import { toast } from "sonner";

export default function TradeDetail(props: {
  params: Promise<{ id: string }>;
}) {
  const params = React.use(props.params);
  const { analysis, userInputs, loading, error, getAnalysisWithID } =
    useGetAnalysisWithID(); // Custom hook to fetch trade analysis data
  const { validatedTradePlan, validatedUserInput, isLoading, contextError } =
    useTradeAnalysisContext(); // Custom context to manage trade analysis state

  const errorMessage = error || contextError; // Combining error messages from context and hook
  const loadingState = isLoading || loading; // Combine loading states from context and hook
  const currentAnalysis = validatedTradePlan || analysis; // Combine analysis from context and hook
  const currentUserInput = validatedUserInput || userInputs; // Combine analysis from context and hook

  // States to determine what to show
  const hasMatchingAnalysisInContext = validatedTradePlan?.id === params.id;
  const shouldFetchFromDB =
    !validatedTradePlan && !hasMatchingAnalysisInContext;
  const shouldShowLoading = shouldFetchFromDB && loadingState;
  const shouldShowError = shouldFetchFromDB && error;

  // Handle error state changes
  useEffect(() => {
    if (errorMessage) {
      toast.error(`Sorry, ${errorMessage}`);
    }
  }, [errorMessage]);

  useEffect(() => {
    console.log("📊 TradeDetail - Data changed:", {
      analysisId: currentAnalysis?.id,
      userInputExists: !!currentUserInput,
      timestamp: new Date().toISOString(),
    });

    // console.log("TradeDetail component mounted with tradePlan:", validatedTradePlan?.id);
    if (!validatedTradePlan && params.id && !hasMatchingAnalysisInContext) {
      getAnalysisWithID(params.id);
    }
  }, [
    params.id,
    validatedTradePlan,
    getAnalysisWithID,
    hasMatchingAnalysisInContext,
    currentAnalysis,
    currentUserInput,
  ]);

  const { calulations } = useTradeModuleData(currentAnalysis, currentUserInput);

  const TradeModuleData = [
    {
      icon: <Crosshair className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
      title: "Direction",
      value: `${validatedTradePlan ? validatedTradePlan.direction : "N/A"}`,
      description: `Entry ${
        validatedTradePlan ? validatedTradePlan.execution.entryZone.data : "N/A"
      }`,
    },
    {
      icon: <Wallet className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
      title: "PNL",
      value: `${
        validatedUserInput
          ? formatCurrrencytoSymbol(validatedUserInput.accountCurrency)
          : "$"
      }${calulations?.success ? calulations.data.profits.total : 0}`, // ✅ Add $ sign
      description: `${
        calulations?.success
          ? `RR ${calulations.data.risk.riskRewardRatio}  •  ${
              calulations.data.pips.individual[
                calulations.data.pips.individual.length - 1
              ]
            } pips`
          : "RR N/A  •  Lot size N/A"
      }`, // ✅ Add % sign
    },
    {
      // <Skull className="w-6 h-6 text-secondary" strokeWidth={0.75} />
      icon: <Skull className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
      title: "Max Loss",
      value: `${
        validatedUserInput
          ? formatCurrrencytoSymbol(validatedUserInput.accountCurrency)
          : "$"
      }${calulations?.success ? calulations?.data.risk.totalRiskAmount : 0}`, // ✅ Add $ sign
      description: `Stop ${
        validatedTradePlan ? validatedTradePlan.execution.stopLoss.data : "N/A"
      }`,
    },
    {
      icon: (
        <BadgeCheck className="w-6 h-6 text-secondary" strokeWidth={0.75} />
      ),
      title: "Trade Quality Score",
      value: `${
        validatedTradePlan
          ? validatedTradePlan.technical.technicalSummary.score
          : "N/A"
      }`,
      description: `Confidence: ${
        validatedTradePlan ? `${validatedTradePlan.confidence}` : "N/A"
      }`,
    },
  ];

  if (shouldShowLoading) {
    // return <TradeAnalysisProgress />;
    return <TradeAnalysisLoading />;
  }

  if (shouldShowError) {
    return (
      <div className="max-w-4xl w-full mx-auto px-6">
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
          <p className="text-8xl">😭</p>
          <h1 className="text-3xl font-extralight">
            Oops! Trade Analysis Error
          </h1>
          <p className="text-red-500">{error}</p>
          <Button variant={"default"} className="rounded-full">
            <Link href="/trades/new">Create New Trade Analysis</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        <TradeHeader
          title={
            validatedTradePlan ? validatedTradePlan?.title : "Trade analysis"
          }
          userInputs={validatedUserInput}
          pnl={calulations?.success ? calulations.data.profits.total : 0}
        />
        <div className="w-full my-8 space-y-6">
          <SectionHeader title="Snapshot" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:flex-row  gap-4  justify-evenly w-full">
            {TradeModuleData.map((item, index) => (
              <TradeResultsModule
                key={index}
                icon={item.icon}
                title={item.title}
                value={item.value}
                description={item.description}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-10 space-y-6">
          <div className="lg:w-3/5 mb-6 lg:mb-0  space-y-6">
            <SectionHeader title="Take action" />
            <TradePlanRightCol data={validatedTradePlan} />
          </div>
          <div className="lg:w-2/5 mb-6 lg:mb-0 lg:pl-8 space-y-6">
            <div className="space-y-6">
              <SectionHeader title="Analysis" />
              <TradePlanLeftCol data={validatedTradePlan} />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <SectionHeader title="Technicals" />
          <div>
            <TradeTechnicals data={validatedTradePlan} />
          </div>
        </div>
      </div>
    </>
  );
}

// {!validatedTradePlan ? (
//   <TradeAnalysisProgress />
// ) : isCurrentAnalysis ? (
//   <div className="max-w-7xl mx-auto px-6">
//     <TradeHeader
//       title={
//         validatedTradePlan
//           ? `Strategy: ${validatedTradePlan?.summary}`
//           : "No trade analysis found"
//       }
//       userInputs={validatedUserInput}
//     />
//     <div className="w-full my-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:flex-row  gap-4  justify-evenly w-full">
//         {TradeModuleData.map((item, index) => (
//           <TradeResultsModule
//             key={index}
//             icon={item.icon}
//             title={item.title}
//             value={item.value}
//             description={item.description}
//           />
//         ))}
//       </div>
//     </div>
//     <div className="flex flex-col lg:flex-row mt-10">
//       <div className="lg:w-2/5 mb-6 lg:mb-0">
