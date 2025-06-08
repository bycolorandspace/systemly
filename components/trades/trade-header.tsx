import { Button } from "@/components/ui/button";
import { Link2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { UserInputs } from "@/types/trading/analysis";
import { Skeleton } from "../ui/skeleton";
//import { data } from "@/data/dummy-data";

export default function TradeHeader({
  isLoading,
  title,
  userInputs,
}: {
  isLoading?: boolean;
  title: string;
  userInputs: UserInputs | null;
}) {
  const accountCurrency = "$";

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
            <h1 className="text-4xl font-light max-w-4xl"> {title}</h1>
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
            <div>
              <span className="text-secondary text-sm">
                Your account size:{" "}
              </span>{" "}
              {userInputs?.accountSize
                ? `${accountCurrency}${userInputs?.accountSize}`
                : "N/A"}
            </div>
            <Separator orientation="vertical" />
            <div>
              <span className="text-secondary text-sm">Risk per trade: </span>{" "}
              {userInputs?.accountSize ? `${userInputs?.riskPerTrade}%` : "N/A"}
            </div>
            <Separator orientation="vertical" />
          </div>
        </>
      )}
    </div>
  );
}
