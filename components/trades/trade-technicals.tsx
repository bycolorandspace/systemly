import { Accordion } from "@/components/ui/accordion";
import { TradePlan } from "@/types/trading/analysis";
import TradeTechnicalContent from "./trade-technical-content";

export default function TradeTechnicals({ data }: { data: TradePlan | null }) {
  const tradeAnalysisContent = [
    {
      title: data?.technical?.trendScore.title || "Trend",
      value: "item-0",
      score: data?.technical.trendScore.score ?? 0,
      content: data?.technical.trendScore.reasoning,
    },
    {
      title: data?.technical?.setupScore.title || "Setup",
      value: "item-1",
      score: data?.technical.setupScore.score ?? 0,
      content: data?.technical.setupScore.reasoning,
    },
    {
      title: data?.technical?.confluenceScore.title || "Confluence",
      value: "item-2",
      score: data?.technical.confluenceScore.score ?? 0,
      content: data?.technical.confluenceScore.reasoning,
    },
    {
      title: data?.technical?.clarityScore.title || "Clarity",
      value: "item-5",
      score: data?.technical.clarityScore.score ?? 0,
      content: data?.technical.clarityScore.reasoning,
    },
    {
      title: data?.technical?.volumeScore.title || "Volume",
      value: "item-7",
      score: data?.technical.volumeScore.score ?? 0,
      content: data?.technical.volumeScore.reasoning,
    },
    {
      title: data?.technical?.momentumScore.title || "Momentum",
      value: "item-8",
      score: data?.technical.momentumScore.score ?? 0,
      content: data?.technical.momentumScore.reasoning,
    },
    {
      title: data?.technical?.marketStructureScore.title || "Structure",
      value: "item-9",
      score: data?.technical.marketStructureScore.score ?? 0,
      content: data?.technical.marketStructureScore.reasoning,
    },
    {
      title: data?.technical?.volatilityScore.title || "Volatility",
      value: "item-10",
      score: data?.technical.volatilityScore.score ?? 0,
      content: data?.technical.volatilityScore.reasoning,
    },
  ];

  return (
    <div className="space-y-6 mb-8">
      <p className="max-w-2xl">{data?.technical.technicalSummary.reasoning}</p>
      <Accordion type="single" collapsible={true} className="w-full space-y-4 ">
        {/* Put trade analysis box in a grid layout*/}
        <div className="grid grid-cols-1 gap-4">
          {tradeAnalysisContent.map((item, index) => {
            return (
              <TradeTechnicalContent
                key={index}
                title={item.title}
                value={item.value}
                score={item.score}
                description={item.content}
              />
            );
          })}
        </div>
      </Accordion>
    </div>
  );
}
