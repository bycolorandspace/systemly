import { Button } from "@/components/ui/button";
import { Link2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { UserInputs } from "@/types/trading/analysis";
import { Skeleton } from "../ui/skeleton";
import { formatCurrrencytoSymbol } from "@/helpers/format-currency";
import { Badge } from "../ui/badge";
import { GetTradingStyleColor } from "@/helpers/status-converter";
//import { data } from "@/data/dummy-data";

export default function TradeHeader({
  isLoading,
  title,
  userInputs,
  pnl,
}: {
  isLoading?: boolean;
  title: string;
  userInputs: UserInputs | null;
  pnl: number;
}) {
  return (
    <div className="header flex flex-col gap-6 justify-between mt-10">
      {isLoading ? (
        <>
          <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
            <Skeleton className="w-full max-w-3xl  h-[20px] rounded-full" />
            <div className="flex flex-row gap-4">
              <Skeleton className="w-[100px] h-[40px] rounded-full" />
              <Skeleton className="w-[100px] h-[40px] rounded-full" />
            </div>
          </div>

          <div className="w-full flex flex-row gap-2">
            <div>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
            <Separator orientation="vertical" />
            <div>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </div>
            <Separator orientation="vertical" />
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-row justify-between">
            <h1 className="text-4xl font-light max-w-5xl">
              {" "}
              {`${title} - ${
                userInputs
                  ? formatCurrrencytoSymbol(
                      userInputs?.accountCurrency as string
                    )
                  : "Problem fetching data"
              }${pnl} potential`}{" "}
            </h1>
            <div className="flex flex-row gap-4">
              <Button className="rounded-full">
                <Link
                  href={"/"}
                  className="flex flex-row gap-2 justify-center items-center"
                >
                  <Link2
                    strokeWidth={1}
                    className="w-[24px] h-[24px] text-background"
                  />
                  <span>Share the plan</span>
                </Link>
              </Button>
              <Button variant={"ghost"}>
                <Link
                  href={"/"}
                  className="flex flex-row gap-2 justify-center items-center"
                >
                  <PlusCircle
                    strokeWidth={1}
                    className="w-[24px] h-[24px] text-primary"
                  />
                  <span>New</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="w-full flex flex-row gap-2">
            <Badge className="bg-card text-card-foreground rounded-full">
              Your account size:{" "}
              {userInputs?.accountSize
                ? `${formatCurrrencytoSymbol(userInputs?.accountCurrency)}${
                    userInputs?.accountSize
                  }`
                : "N/A"}
            </Badge>
            <Separator orientation="vertical" />
            <Badge className="bg-card text-card-foreground rounded-full">
              Risk per trade:{" "}
              {userInputs?.accountSize ? `${userInputs?.riskPerTrade}%` : "N/A"}
            </Badge>
            <Separator orientation="vertical" />
            <Badge
              className={`text-black rounded-full ${GetTradingStyleColor(
                userInputs?.tradingStyle ?? "Day"
              )} `}
            >
              Trading style:{" "}
              {userInputs?.tradingStyle ? `${userInputs?.tradingStyle}` : "N/A"}
            </Badge>
          </div>
        </>
      )}
    </div>
  );
}
