import { AccordionItem, AccordionContent } from "@/components/ui/accordion";
import TradeSubHeader from "./trade-analysis-subHeader";
import { AnalysisProps } from "@/types/trading/analysis";
// import TradeAnalysisListAlt from "./trade-analysis-list-alt";
import TradeAnalysisList from "./trade-analysis-list";
import CopyPlanButton, { CopyButtonType } from "./copy-plan-button";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

// title: "Summary",
// icon: <Zap className="w-4 h-4 text-primary" strokeWidth={1} />,
// content: data.summary,

interface ContentProps extends AnalysisProps {
  isLoading?: boolean;
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  customContent?: (string | undefined)[];
}

export default function TradeAnalysisContent({
  isLoading,
  title,
  value,
  icon,
  description,
  customContent,
  list,
}: ContentProps) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[30px] mb-8" />
      ) : (
        <AccordionItem value={value}>
          <TradeSubHeader title={title} icon={icon} />
          <AccordionContent>
            <div className="flex-col flex w-full gap-2">
              <div className="w-full">
                <div className="block float-right w-auto">
                  <div className="flex flex-row gap-2">
                    <CopyPlanButton
                      buttonType={CopyButtonType.full}
                      contentName={title}
                      title={title}
                      list={list}
                    />
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
                        <Badge>Direction: {customContent[0] ?? "N/A"}</Badge>{" "}
                        <Badge>Timeframe: {customContent[1] ?? "N/A"}</Badge>{" "}
                        <Badge>Confidence: {customContent[2] ?? "N/A"}</Badge>{" "}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
    </>
  );
}
