import React from "react";
import { AccordionItem, AccordionContent } from "../ui/accordion";
import TradeAnalysisList from "./trade-analysis-list";
import TradeSubHeader from "./trade-analysis-subHeader";
import { AnalysisProps } from "@/types/trading/analysis";
import { Badge } from "../ui/badge";

interface BlockProps extends AnalysisProps {
  title: string;
  icon: React.ReactNode;
  content?: string;
  direction?: string;
  timeframe?: string;
  confidence?: string;
}

export default function TradeAnalysisBlock({
  title,
  icon,
  list,
  content,
  direction,
  timeframe,
  confidence,
}: BlockProps) {
  return (
    <AccordionItem value={title}>
      <TradeSubHeader title={title} icon={icon} />
      <AccordionContent>
        {content ? (
          <TradeAnalysisList list={list} />
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              {" "}
              <p className="text-lg">{content}</p>
            </div>
            <div className="flex flex-row gap-2">
              <Badge>Direction: {direction}</Badge>{" "}
              <Badge>Timeframe: {timeframe}</Badge>{" "}
              <Badge>Confidence: {confidence}</Badge>{" "}
            </div>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
