import { Button } from "@/components/ui/button";
import { Link2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
//import { data } from "@/data/dummy-data";

export default function TradeHeader({ title }: { title: string }) {
  const accountSize = "$10,000";
  const risk = "1%";

  return (
    <div className="header flex flex-col gap-6 justify-between mt-10">
      <div className="w-full flex flex-row justify-between">
        <h1 className="text-4xl font-light"> {title}</h1>
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
          <span className="text-secondary text-sm">Your account size: </span>{" "}
          {accountSize}
        </div>
        <Separator orientation="vertical" />
        <div>
          <span className="text-secondary text-sm">Risk per trade: </span>{" "}
          {risk}
        </div>
        <Separator orientation="vertical" />
      </div>
    </div>
  );
}
