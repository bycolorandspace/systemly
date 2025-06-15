import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TradeDirectionIcon({
  direction,
  className,
}: {
  direction: string;
  className?: string;
}) {
  return (
    <div>
      {direction === "Long" ? (
        <span
          className={cn(
            "w-6 h-6  flex justify-center items-center bg-card text-secondary rounded-full  group-hover:bg-white group-hover:text-black" +
              className
          )}
        >
          <ArrowUpRight size={14} />
        </span>
      ) : direction === "Short" ? (
        <span
          className={cn(
            "w-6 h-6  flex justify-center items-center bg-card text-secondary rounded-full group-hover:bg-white group-hover:text-black " +
              className
          )}
        >
          <ArrowDownRight size={14} />
        </span>
      ) : (
        <span
          className={cn(
            "w-6 h-6  flex justify-center items-center bg-card text-secondary rounded-full group-hover:bg-white  group-hover:text-black " +
              className
          )}
        >
          <X size={14} />
        </span>
      )}
    </div>
  );
}
