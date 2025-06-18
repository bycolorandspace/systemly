"use client";

import TradePlanLeftCol from "@/components/trades/trade-plan-left-col";
import TradeHeader from "@/components/trades/trade-header";
import TradePlanRightCol from "@/components/trades/trade-plan-right-col";
import React, { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { dummyData, userInput } from "@/data/dummy-data";
import SectionHeader from "@/components/common/section-header";
import TradeTechnicals from "@/components/trades/trade-technicals";
// import TradeAnalysisProgress from "@/components/trades/trade-analysis-progress";
import { useGetAnalysisWithID } from "@/hooks/useGetAnalysisWithID";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import UniversalPageLoader from "@/components/common/universal-page-loader";
import TradeSnapshot from "@/components/trades/analysis-detail/trade-snapshot";
import { TradePlan, UserInputs } from "@/types/trading/analysis";
import { useTradeAnalysisContext } from "@/contexts/trade-analysis-context";
import TradeAnalysisLoading from "@/components/skeleton/trade-analysis-loading";

export default function TradeDetail(props: {
  params: Promise<{ id: string }>;
}) {
  const params = React.use(props.params);
  const { isLoading } = useTradeAnalysisContext();
  const { analysis, userInputs, pnl, loading, error, getAnalysisWithID } =
    useGetAnalysisWithID(); // Custom hook to fetch trade analysis data

  const loadingViaFormContext = isLoading;
  const loadingViaAnalyses = loading;

  useEffect(() => {
    if (error) {
      toast.error(`Sorry, ${error}`);
    }
  }, [error]);

  useEffect(() => {
    // If formcontext is not loading, then fetch the analysis with the ID from the URL params
    if (!isLoading) {
      getAnalysisWithID(params.id);
    }
  }, [params.id, getAnalysisWithID, isLoading]);

  // Is loading without form context upload check - In other words, you're viewing from analysis page, not from the form upload
  if (loadingViaAnalyses) {
    // return <TradeAnalysisProgress />;
    return <UniversalPageLoader />;
  }

  if (loadingViaFormContext) {
    return <TradeAnalysisLoading />;
  }

  if (error) {
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
          title={analysis ? analysis?.title : "Trade analysis"}
          userInputs={userInputs}
          pnl={pnl ? pnl : 0}
        />
        <div className="w-full my-8 space-y-6">
          <SectionHeader title="Snapshot" />
          <TradeSnapshot
            analysis={analysis as TradePlan}
            userInputs={userInputs as UserInputs}
          />
        </div>
        <div className="flex flex-col lg:flex-row mt-10 space-y-6">
          <div className="lg:w-3/5 mb-6 lg:mb-0  space-y-6">
            <SectionHeader title="Take action" />
            <TradePlanRightCol data={analysis} />
          </div>
          <div className="lg:w-2/5 mb-6 lg:mb-0 lg:pl-8 space-y-6">
            <div className="space-y-6">
              <SectionHeader title="Analysis" />
              <TradePlanLeftCol data={analysis} />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <SectionHeader title="Technicals" />
          <div>
            <TradeTechnicals data={analysis} />
          </div>
        </div>
      </div>
    </>
  );
}
