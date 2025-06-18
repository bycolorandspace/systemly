import Link from "next/link";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import TradeDirectionIcon from "./trade-direction-icon";
import { TradeAnalysisReturn } from "@/lib/analysisDataService";
import { formatRelativeTime } from "@/helpers/date-formatter";
// import useTradeCalculator from "@/hooks/useTradeCalculator";
// import { useEffect } from "react";

export default function AnalysisSummarised({
  analysis,
}: {
  analysis: TradeAnalysisReturn;
}) {
  return (
    <Link
      key={analysis.trade_data.id}
      href={`/analysis/${analysis.trade_data.id}`}
      className="flex flex-col gap-2 group"
    >
      <div className="flex flex-col w-full gap-4 mb-2 p-6 border border-border rounded-2xl hover:bg-card hover:border-secondary transition-colors duration-200">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start gap-2">
          <h2 className="text-3xl font-light flex flex-row items-center justify-start gap-2">
            {analysis.trade_data.direction}
            <Label className="text-secondary group-hover:text-white transition-colors duration-400">
              {analysis.trade_data.symbol}
            </Label>
          </h2>
          <Badge className="bg-card text-secondary h-6 group-hover:bg-green-300 group-hover:text-card transition-colors duration-500">
            {analysis.user_input.accountCurrency}
            {analysis ? analysis.trade_data. : 0}
          </Badge>
        </div>

        <div className="flex flex-row gap-4 items-start">
          <TradeDirectionIcon
            direction={analysis.trade_data.direction as string}
            className="transition-colors duration-600"
          />
          <Badge className="text-xs  font-light bg-transparent text-secondary pl-0">
            {analysis.trade_data.execution.type.data}
          </Badge>
        </div>

        <div className="flex sm:flex-row md:flex-col gap-2 xl:flex-row xl:gap-4 text-secondary justify-between items-start">
          <Badge className="text-xs  font-light bg-transparent text-secondary pl-0">
            {analysis.trade_data.execution.entryZone.title} -{" "}
            {analysis.trade_data.execution.entryZone.data}
          </Badge>
          {/* <Separator
                      orientation="vertical"
                      className="xl:h-full bg-transparent xl:visible"
                    /> */}

          <Badge className="text-xs  font-light bg-transparent text-secondary pl-0">
            {analysis.trade_data.execution.stopLoss.title} -{" "}
            {analysis.trade_data.execution.stopLoss.data}
          </Badge>
          {/* <Separator
                      orientation="vertical"
                      className="xl:h-full xl:visible"
                    /> */}
          <Badge className="text-xs font-light bg-transparent text-secondary pl-0">
            <p>{analysis.trade_data.execution.lotSize.title}</p>
            <p>{analysis.trade_data.execution.lotSize.data}</p>
          </Badge>
        </div>

        <div>
          {analysis.created_at && (
            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(analysis.created_at)}
            </span>
          )}
        </div>

        {/* <p className="text-sm font-bold">{analysis.title}</p> */}
      </div>
    </Link>
  );
}
