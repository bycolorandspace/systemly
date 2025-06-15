"use client";
import TradeDirectionIcon from "@/components/analysis/trade-direction-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { useGetUsersAnalyses } from "@/hooks/useGetUserAnalyses";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function AnalysesPage() {
  const { user } = useAuth();
  const { analyses, userInputs, error, loading, getUserAnalyses } =
    useGetUsersAnalyses();

  useEffect(() => {
    if (user?.id) getUserAnalyses(user?.id);
  }, [user?.id, getUserAnalyses]);

  // ADD LOADING AND ERROR HANDLING

  return (
    <div className="flex flex-col items-center justify-start h-screen p-8">
      <div className="w-full">
        <div className="flex flex-row justify-between mb-8">
          <h1 className="text-3xl font-light mb-4">Analyses</h1>
          <Button>
            <Link href="/analysis/new" className="flex items-center">
              <PlusCircle className="mr-2 size-4" />
              New Analysis
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {analyses &&
            analyses.map((analysis) => (
              <Link
                key={analysis.id}
                href={`/analysis/${analysis.id}`}
                className="flex flex-col gap-2 group"
              >
                <div className="flex flex-col w-full gap-4 mb-2 p-6 border border-border rounded-2xl hover:bg-card hover:border-secondary transition-colors duration-200">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start gap-2">
                    <h2 className="text-3xl font-light flex flex-col items-start justify-start gap-2">
                      <Label className="text-secondary group-hover:text-white transition-colors duration-400">
                        {analysis.symbol}
                      </Label>
                      {analysis.direction}
                    </h2>
                    <Badge className="bg-card text-secondary h-6 group-hover:bg-green-300 group-hover:text-card transition-colors duration-500">
                      Potential PNL - £10
                    </Badge>
                  </div>

                  <TradeDirectionIcon
                    direction={analysis.direction as string}
                    className="transition-colors duration-600"
                  />
                  <div className="flex sm:flex-row md:flex-col gap-2 xl:flex-row xl:gap-4 text-secondary items-start">
                    <Badge className="text-xs  font-light bg-transparent text-secondary pl-0">
                      {analysis.execution.entryZone.title} -{" "}
                      {analysis.execution.entryZone.data}
                    </Badge>
                    {/* <Separator
                      orientation="vertical"
                      className="xl:h-full bg-transparent xl:visible"
                    /> */}

                    <Badge className="text-xs  font-light bg-transparent text-secondary pl-0">
                      {analysis.execution.stopLoss.title} -{" "}
                      {analysis.execution.stopLoss.data}
                    </Badge>
                    {/* <Separator
                      orientation="vertical"
                      className="xl:h-full xl:visible"
                    /> */}
                    <Badge className="text-xs font-light bg-transparent text-secondary pl-0">
                      <p>{analysis.execution.lotSize.title}</p>
                      <p>{analysis.execution.lotSize.data}</p>
                    </Badge>
                  </div>
                  {/* <p className="text-sm font-bold">{analysis.title}</p> */}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
