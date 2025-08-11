"use client";

import TradePlanLeftCol from "@/components/trades/trade-plan-left-col";
import TradeHeader from "@/components/trades/trade-header";
import TradePlanRightCol from "@/components/trades/trade-plan-right-col";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Brain,
  CalculatorIcon,
  Clock,
  CookingPot,
  Cross,
  Crosshair,
  Landmark,
  Layers,
  Lightbulb,
  PlayIcon,
  PlusCircle,
  Scale,
  Store,
  Target,
  // Skull,
  Wallet,
  X,
  Zap,
  ZapIcon,
} from "lucide-react";
import React from "react";
import TradeResultsModule from "@/components/trades/trade-results-module";
import { useTradeModuleData } from "@/hooks/useTradeModuleData";
//import { calculateTradeMetrics } from "@/helpers/trade-calculator";
import { dummyData, userInput } from "@/data/dummy-data";
import SectionHeader from "@/components/common/section-header";
import TradeTechnicals from "@/components/trades/trade-technicals";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import TradeAnalysisProgress from "@/components/trades/trade-analysis-progress";
// import { useTradeAnalysisContext } from "@/contexts/trade-analysis-context";
// import { formatCurrrencytoSymbol } from "@/helpers/format-currency";

export default function TradeDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const renderIcon = (name: string): React.ReactNode => {
    switch (name) {
      case "setup":
        return <Target className="w-6 h-6 text-secondary" strokeWidth={0.75} />;
      case "momentum":
        return (
          <Activity className="w-6 h-6 text-secondary" strokeWidth={0.75} />
        );
      case "keyLevels":
        return <Layers className="w-6 h-6 text-secondary" strokeWidth={0.75} />;
      case "riskReward":
        return <Scale className="w-6 h-6 text-secondary" strokeWidth={0.75} />;
      case "timing":
        return <Clock className="w-6 h-6 text-secondary" strokeWidth={0.75} />;
      case "invalidation":
        return (
          <AlertTriangle
            className="w-6 h-6 text-secondary"
            strokeWidth={0.75}
          />
        );
      default:
        return null;
    }
  };

  const snapshot = [
    {
      title: "Direction",
      icon: <Crosshair className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
      value: dummyData.quickSignal.direction,
      label: `Entry ${dummyData.quickSignal.execution.entryZone}`,
    },
    {
      title: "Confidence",
      icon: (
        <BadgeCheck className="w-6 h-6 text-secondary" strokeWidth={0.75} />
      ),
      value: dummyData.quickSignal.confidence,
      label: `You're risking ${dummyData.quickSignal.position.riskAmount}`,
    },
    {
      title: "PNL",
      icon: <Wallet className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
      value: "$40",
      label: `Take Profit _ • _ pips`,
    },
    {
      title: "Max Loss",
      icon: (
        <CookingPot className="w-6 h-6 text-secondary" strokeWidth={0.75} />
      ),
      value: "$20",
      label: `Stop ${dummyData.quickSignal.execution.stopLoss}`,
    },
  ];

  const professionalInsight = [
    {
      title: "Market Context",
      value: "item-0",
      icon: <Store className="w-4 h-4 text-primary" strokeWidth={1} />,
      customContent: dummyData.professionalInsights?.marketContext,
    },
    {
      title: "Institutional Intelligence",
      value: "item-1",
      icon: <Landmark className="w-4 h-4 text-primary" strokeWidth={1} />,
      content: dummyData.professionalInsights?.institutionalIntelligence,
    },
    {
      title: "Psychological Edge",
      value: "item-2",
      icon: <Brain className="w-4 h-4 text-primary" strokeWidth={1} />,
      content: dummyData.professionalInsights?.psychologicalEdge,
    },
    {
      title: "Execution Mastery",
      value: "item-3",
      icon: <Lightbulb className="w-4 h-4 text-primary" strokeWidth={1} />,
      content: dummyData.professionalInsights?.executionMastery,
    },
    {
      title: "Risk Intelligence",
      value: "item-4",
      icon: <Zap className="w-4 h-4 text-primary" strokeWidth={1} />,
      content: dummyData.professionalInsights?.riskIntelligence,
    },
  ];

  // const TradeModuleData = [
  //   {
  //     icon: <Crosshair className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
  //     title: "Direction",
  //     value: `${validatedTradePlan ? validatedTradePlan.direction : "N/A"}`,
  //     description: `Entry ${
  //       validatedTradePlan ? validatedTradePlan.execution.entryZone.data : "N/A"
  //     }`,
  //   },
  //   {
  //     icon: <Wallet className="w-6 h-6 text-secondary" strokeWidth={0.75} />,
  //     title: "PNL",
  //     value: `${formatCurrrencytoSymbol(validatedUserInput.accountCurrency)}${
  //       calulations?.success ? calulations.data.profits.total : 0
  //     }`, // ✅ Add $ sign
  //     description: `${
  //       calulations?.success
  //         ? `RR ${calulations.data.risk.riskRewardRatio}  •  ${
  //             calulations.data.pips.individual[
  //               calulations.data.pips.individual.length - 1
  //             ]
  //           } pips`
  //         : "RR N/A  •  Lot size N/A"
  //     }`, // ✅ Add % sign
  //   },
  //   {
  //     // <Skull className="w-6 h-6 text-secondary" strokeWidth={0.75} />
  //     icon: (
  //       <CookingPot className="w-6 h-6 text-secondary" strokeWidth={0.75} />
  //     ),
  //     title: "Max Loss",
  //     value: `${formatCurrrencytoSymbol(validatedUserInput.accountCurrency)}${
  //       calulations?.success ? calulations?.data.risk.totalRiskAmount : 0
  //     }`, // ✅ Add $ sign
  //     description: `Stop ${
  //       validatedTradePlan ? validatedTradePlan.execution.stopLoss.data : "N/A"
  //     }`,
  //   },
  //   {
  //     icon: (
  //       <BadgeCheck className="w-6 h-6 text-secondary" strokeWidth={0.75} />
  //     ),
  //     title: "Trade Quality Score",
  //     value: `${
  //       validatedTradePlan
  //         ? validatedTradePlan.technical.technicalSummary.score
  //         : "N/A"
  //     }`,
  //     description: `Confidence: ${
  //       validatedTradePlan ? `${validatedTradePlan.confidence}` : "N/A"
  //     }`,
  //   },
  // ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* <Card className="bg-card px-6 relative">
          <X
            className="w-6 h-6 text-secondary absolute l-2"
            strokeWidth={0.75}
          />
          <span>
            1. 5 trades witih this R:R will make you weekly profit of $250
          </span>
          <span>2. It will take you 5 months to earn $10k</span>
          <span>3. You have 5 losing trades before you blow your account</span>
        </Card> */}

        <div>
          <h2 className="text-4xl">
            Trade Idea: XAUUSD {dummyData.quickSignal.direction.toLowerCase()}
            {", "}
            {dummyData.quickSignal.timeframe}
          </h2>
          <div className="flex flex-col lg:flex-row space-x-4 space-y-2 justify-between items-start">
            <div className="rounded-full mt-4 border border-border px-4 py-2 flex flex-row gap-4">
              <span>Did you take this trade?</span>
              <div className="flex flex-row gap-2 items-center">
                <Button
                  variant={"default"}
                  className="rounded-full w-2 h-2 text-black bg-green-400 text-xs"
                >
                  <Link href="#">Yes</Link>
                </Button>
                <Button
                  variant={"link"}
                  className="rounded-full w-2 h-2 text-black bg-red-500 text-xs"
                >
                  <Link href="#">No</Link>
                </Button>
              </div>
            </div>
            <Button variant="default" className="rounded-full mt-4">
              <PlusCircle className="mr-2 size-4" />
              <Link href="/analysis/new">New Trade</Link>
            </Button>
          </div>
        </div>

        {/* Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {snapshot.map((item, index) => (
            <TradeResultsModule
              key={index}
              icon={item.icon}
              title={item.title}
              value={item.value}
              description={item.label}
            />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row mt-8 justify-evenly space-y-4 space-x-8">
          <div className="w-full lg:max-w-1/2 space-y-2">
            <Tabs defaultValue="quickTrade" className="w-full space-y-4">
              <TabsList className="bg-card space-x-2">
                <TabsTrigger value="quickTrade" className="p-2">
                  <ZapIcon className="w-2 h-2 mr-1" />
                  Quick trade
                </TabsTrigger>
                <TabsTrigger value="execution" className="p-2">
                  <PlayIcon className="w-2 h-2 mr-1" />
                  Execution guide
                </TabsTrigger>
                <TabsTrigger value="risk" className="p-2">
                  <CalculatorIcon className="w-2 h-2 mr-1" />
                  Risk management
                </TabsTrigger>
              </TabsList>
              <TabsContent value="quickTrade" className="space-y-4">
                {/* Execution + Summary*/}
                {Object.entries(dummyData.quickSignal.execution).map(
                  ([key, value], index) => {
                    return (
                      <div
                        key={key}
                        className="flex justify-between items-center space-x-2 rounded-xl bg-card py-2 px-4 mb-4"
                      >
                        <div>
                          <span className="flex items-center space-x-4 justify-center">
                            <span className="text-white w-2 h-2 text-sm rounded-full bg-border flex p-4 justify-center items-center">
                              {index + 1}
                            </span>{" "}
                            <span className="text-secondary text-sm font-bold">
                              {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </span>
                          </span>
                        </div>
                        <span>{value}</span>
                      </div>
                    );
                  }
                )}
              </TabsContent>
              <TabsContent value="professional">
                {/* Professional Insights*/}
                <Card className="bg-transparent border-none space-y-4">
                  <div className="text-secondary text-sm space-y-4">
                    {Object.entries(dummyData.professionalInsights ?? {}).map(
                      ([sectionName, sectionData]) => (
                        <div
                          key={sectionName}
                          className="flex flex-col space-y-4"
                        >
                          <h3 className="text-primary text-lg font-semibold p-0 mb-4">
                            {sectionName.charAt(0).toUpperCase() +
                              sectionName.slice(1)}
                            :
                          </h3>
                          <Card
                            key={sectionName}
                            className="space-y-0 flex gap-0 p-0 border"
                          >
                            {Object.entries(sectionData).map(([key, value]) => (
                              <div
                                key={key}
                                className="block m-0 border-b px-4 py-4 space-y-2 last:border-0"
                              >
                                <h4 className="font-semibold">{key}: </h4>
                                <span>{String(value)}</span>
                              </div>
                            ))}
                          </Card>
                        </div>
                      )
                    )}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            <Tabs defaultValue="context" className="w-full space-y-4">
              <TabsList className="bg-card space-x-2">
                <TabsTrigger value="context" className="p-2">
                  <Store className="w-2 h-2 mr-1" />
                  Market Context
                </TabsTrigger>
                <TabsTrigger value="intelligence" className="p-2">
                  <Landmark className="w-2 h-2 mr-1" />
                  Institutional Intelligence
                </TabsTrigger>
                <TabsTrigger value="professional" className="p-2">
                  <Brain className="w-2 h-2 mr-1" />
                  Psychological Edge
                </TabsTrigger>
              </TabsList>
              <TabsContent value="context" className="space-y-4">
                {/* Execution + Summary*/}
                {Object.entries(dummyData.quickSignal.execution).map(
                  ([key, value], index) => {
                    return (
                      <div
                        key={key}
                        className="flex justify-between items-center space-x-2 rounded-xl bg-card py-2 px-4 mb-4"
                      >
                        <div>
                          <span className="flex items-center space-x-4 justify-center">
                            <span className="text-white w-2 h-2 text-sm rounded-full bg-border flex p-4 justify-center items-center">
                              {index + 1}
                            </span>{" "}
                            <span className="text-secondary text-sm font-bold">
                              {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </span>
                          </span>
                        </div>
                        <span>{value}</span>
                      </div>
                    );
                  }
                )}
              </TabsContent>
              <TabsContent value="professional">
                {/* Professional Insights*/}
                <Card className="bg-transparent border-none space-y-4">
                  <div className="text-secondary text-sm space-y-4">
                    {Object.entries(dummyData.professionalInsights ?? {}).map(
                      ([sectionName, sectionData]) => (
                        <div
                          key={sectionName}
                          className="flex flex-col space-y-4"
                        >
                          <h3 className="text-primary text-lg font-semibold p-0 mb-4">
                            {sectionName.charAt(0).toUpperCase() +
                              sectionName.slice(1)}
                            :
                          </h3>
                          <Card
                            key={sectionName}
                            className="space-y-0 flex gap-0 p-0 border"
                          >
                            {Object.entries(sectionData).map(([key, value]) => (
                              <div
                                key={key}
                                className="block m-0 border-b px-4 py-4 space-y-2 last:border-0"
                              >
                                <h4 className="font-semibold">{key}: </h4>
                                <span>{String(value)}</span>
                              </div>
                            ))}
                          </Card>
                        </div>
                      )
                    )}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full lg:max-w-1/2 space-y-4">
            <SectionHeader title="Trade summary" />
            {Object.entries(dummyData.quickSignal.tradeJustification).map(
              ([key, value]) => {
                return (
                  <div
                    key={key}
                    className="flex flex-col justify-between items-start space-x-2 rounded-xl bg-card p-4 mb-4"
                  >
                    <div className="flex flex-col items-start space-y-2 mb-2">
                      {renderIcon(key)}
                      <h3 className="text-secondary text-md font-semibold">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </h3>
                    </div>
                    <span className="text-sm">{value}</span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
}
