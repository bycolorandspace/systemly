import { Card } from "@/components/ui/card";
import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function TradeResultsModule({
  icon,
  title,
  value,
  description,
  isLoading,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  isLoading?: boolean;
}) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full rounded-2xl h-[190px]" />
      ) : (
        <Card className="bg-transparent w-full p-4 flex flex-col justify-center h-full max-h-[190px]  md:max-w-[300px]   rounded-3xl">
          <div className="flex flex-col gap-2">
            {icon}
            <h4 className="text-md">{title}</h4>
          </div>
          <div className="flex flex-col gap-1">
            <span className="large-currency">{value}</span>
            <small className="text-secondary">{description}</small>
          </div>
        </Card>
      )}
    </>
  );
}
