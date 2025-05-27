import { Button } from "@/components/ui/button";
import { Link2, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function TradeHeader({ title }: { title: string }) {
  return (
    <div className="header flex flex-col gap-6  lg:flex-row justify-between mt-10">
      <h1 className="text-4xl font-light"> {title}</h1>
      <div className="flex flex-row gap-6">
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
  );
}
