"use client";

import React, { useEffect } from "react";
//import { calculateTradeMetrics } from "@/helpers/trade-calculator";

import TradeAnalysisProgress from "@/components/trades/trade-analysis-progress";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { Accordion } from "../ui/accordion";
import { useTradeplan } from "@/hooks/useTradePlan";
import { useRouter } from "next/navigation";

export default function TradeAnalysisLoading() {
  // const { isLoading, fullAnalysis } = useTradeplan();
  // const router = useRouter();

  // useEffect(() => {
  //   console.log("TradeAnalysisLoading component mounted");
  //   console.log("isLoading:", isLoading);
  //   console.log("fullAnalysis:", fullAnalysis);
  //   if (!isLoading && fullAnalysis) {
  //     router.push(`/trades/${fullAnalysis.analysis.id}`);
  //   }
  // }, [isLoading, fullAnalysis, router]);

  return (
    <>
      <TradeAnalysisProgress />
      <div className="max-w-7xl mx-auto px-6">
        <>
          <div className="w-full flex flex-row justify-between">
            <Skeleton className="w-full max-w-3xl  h-[20px] rounded-full" />
            <div className="flex flex-row gap-4">
              <Skeleton className="w-[100px] h-[40px] rounded-full" />
              <Skeleton className="w-[100px] h-[40px] rounded-full" />
            </div>
          </div>

          <div className="w-full flex flex-row gap-2">
            <div>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
            <Separator orientation="vertical" />
            <div>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
            <Separator orientation="vertical" />
          </div>
        </>
        <div className="w-full my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:flex-row  gap-4  justify-evenly w-full">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="w-full rounded-2xl h-[190px]" />
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-10">
          <div className="lg:w-2/5 mb-6 lg:mb-0">
            <div className="">
              <Accordion type="single" collapsible className="w-full">
                {Array.from({ length: 5 }, (_, index) => (
                  <Skeleton key={index} className="w-full h-[30px] mb-8" />
                ))}
              </Accordion>
            </div>
          </div>
          <div className="lg:w-3/5 mb-6 lg:mb-0">
            <Skeleton className="w-full h-[600px] mx-8" />
          </div>
        </div>
      </div>
    </>
  );
}
