import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import TradeSubHeader from "./trade-analysis-subHeader";
import { AnalysisProps } from "@/types/trading/analysis";
// import TradeAnalysisListAlt from "./trade-analysis-list-alt";
import TradeAnalysisList from "./trade-analysis-list";
import CopyPlanButton from "./copy-plan-button";
import { Badge } from "../ui/badge";

// title: "Summary",
// icon: <Zap className="w-4 h-4 text-primary" strokeWidth={1} />,
// content: data.summary,

interface ContentProps extends AnalysisProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  customContent?: (string | undefined)[];
}

export default function TradeAnalysisContent({
  title,
  value,
  icon,
  description,
  customContent,
  list,
}: ContentProps) {
  return (
    <AccordionItem value={value}>
      <TradeSubHeader title={title} icon={icon} />
      <AccordionContent>
        <div className="flex-col flex w-full gap-2">
          <div className="w-full">
            <div className="block float-right w-auto">
              <div className="flex flex-row gap-2">
                <CopyPlanButton contentName={title} />
              </div>
            </div>
          </div>
          {value !== "item-0" ? (
            <TradeAnalysisList list={list} />
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                {" "}
                <p className="text-lg">{description}</p>
              </div>
              <div className="flex flex-row gap-2">
                {customContent && (
                  <>
                    <Badge>Direction: {customContent[0]}</Badge>{" "}
                    <Badge>Timeframe: {customContent[1]}</Badge>{" "}
                    <Badge>Confidence: {customContent[2]}</Badge>{" "}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
