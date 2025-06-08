import { Accordion } from "@/components/ui/accordion";

import { Baby, Ban, Clock, DatabaseZap, Zap } from "lucide-react";

import TradeAnalysisContent from "./trade-analysis-content";
import { TradePlan } from "@/types/trading/analysis";

// <div className="flex flex-col gap-4">
//   <div>
//     {" "}
//     <p className="text-lg">{data.summary}</p>
//   </div>
//   <div className="flex flex-row gap-2">
//     <Badge>Direction: {data.direction}</Badge>{" "}
//     <Badge>Timeframe: {data.timeframe}</Badge>{" "}
//     <Badge>Confidence: {data.confidence}</Badge>{" "}

export default function TradePlanLeftCol({ data }: { data: TradePlan | null }) {
  const tradeAnalysisContent = [
    {
      title: "Summary",
      value: "item-0",
      icon: <Zap className="w-4 h-4 text-primary" strokeWidth={1} />,
      description: data?.summary,
      customContent: [data?.direction, data?.timeframe, data?.confidence],
    },
    {
      title: "Time optimisation",
      value: "item-1",
      icon: <Clock className="w-4 h-4 text-primary" strokeWidth={1} />,
      content: data?.tradingReality,
    },
    {
      title: "Risk warnings",
      value: "item-2",
      icon: <Ban className="w-4 h-4 text-primary" strokeWidth={1} />,
      content: data?.riskWarnings,
    },
    {
      title: "Data limitations",
      value: "item-3",
      icon: <DatabaseZap className="w-4 h-4 text-primary" strokeWidth={1} />,
      content: data?.dataLimitations,
    },
    {
      title: "Beginner Guidance",
      value: "item-4",
      icon: <Baby className="w-4 h-4 text-primary" strokeWidth={1} />,
      content: data?.beginnerGuidance,
    },
  ];

  return (
    <div className="">
      <Accordion type="single" collapsible className="w-full">
        {tradeAnalysisContent.map((item, index) => {
          return (
            <TradeAnalysisContent
              title={item.title}
              value={item.value}
              key={index}
              icon={item.icon}
              description={item.description}
              customContent={item.customContent}
              list={item.content}
            />
          );
        })}
      </Accordion>
    </div>
  );
}
