import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { data } from "@/data/dummy-data";
import { Badge } from "../ui/badge";
import TradeSubHeader from "./trade-analysis-subHeader";
import TradeAnalysisList from "./trade-analysis-list";
import { Baby, Ban, Clock, DatabaseZap, Zap } from "lucide-react";

// Get all the headers
// Get

export default function TradePlanLeftCol() {
  return (
    <div className="">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-0">
          <TradeSubHeader
            title="Trade Co-ordinates"
            icon={<Clock className="w-4 h-4 text-primary" strokeWidth={1} />}
          />
          <AccordionContent></AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1">
          <TradeSubHeader
            title={"Summary"}
            icon={<Zap className="w-4 h-4 text-primary" strokeWidth={1} />}
          />
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div>
                {" "}
                <p className="text-lg">{data.summary}</p>
              </div>
              <div className="flex flex-row gap-2">
                <Badge>Direction: {data.direction}</Badge>{" "}
                <Badge>Timeframe: {data.timeframe}</Badge>{" "}
                <Badge>Confidence: {data.confidence}</Badge>{" "}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <TradeSubHeader
            title="Time optimisation"
            icon={<Clock className="w-4 h-4 text-primary" strokeWidth={1} />}
          />
          <AccordionContent>
            <TradeAnalysisList list={data.tradingReality} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <TradeSubHeader
            title={"Risk warnings"}
            icon={<Ban className="w-4 h-4 text-primary" strokeWidth={1} />}
          />
          <AccordionContent>
            <TradeAnalysisList list={data.riskWarnings} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <TradeSubHeader
            title={"Data limitations"}
            icon={
              <DatabaseZap className="w-4 h-4 text-primary" strokeWidth={1} />
            }
          />
          <AccordionContent>
            <TradeAnalysisList list={data.dataLimitations} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <TradeSubHeader
            title={"Beginner Guidance"}
            icon={<Baby className="w-4 h-4 text-primary" strokeWidth={1} />}
          />
          <AccordionContent>
            <TradeAnalysisList list={data.beginnerGuidance} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
