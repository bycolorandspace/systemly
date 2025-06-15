import { Accordion } from "@/components/ui/accordion";

import {
  Baby,
  Ban,
  BriefcaseBusinessIcon,
  DatabaseZap,
  LucidePictureInPicture2,
  Zap,
} from "lucide-react";

import TradeAnalysisContent from "./trade-analysis-content";
import { TradePlan } from "@/types/trading/analysis";

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
      title: "Risk warnings",
      value: "item-1",
      icon: <Ban className="w-4 h-4 text-primary" strokeWidth={1} />,
      content: data?.riskWarnings,
    },
    {
      title: "Market context",
      value: "item-2",
      icon: (
        <LucidePictureInPicture2
          className="w-4 h-4 text-primary"
          strokeWidth={1}
        />
      ),
      content: data?.marketContext,
    },
    {
      title: "Beginner guidance",
      value: "item-5",
      icon: <Baby className="w-4 h-4 text-primary" strokeWidth={1} />,
      content: data?.beginnerGuidance,
    },
    {
      title: "Proffesional edge",
      value: "item-6",
      icon: (
        <BriefcaseBusinessIcon
          className="w-4 h-4 text-primary"
          strokeWidth={1}
        />
      ),
      content: data?.professionalEdge,
    },
    {
      title: "Data limitations",
      value: "item-8",
      icon: <DatabaseZap className="w-4 h-4 text-primary" strokeWidth={1} />,
      content: data?.dataLimitations,
    },
  ];

  return (
    <div className="space-y-6">
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
