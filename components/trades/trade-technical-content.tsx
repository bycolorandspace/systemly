import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "../ui/badge";
import { GetScoreColor } from "@/helpers/status-converter";

// title: "Summary",
// icon: <Zap className="w-4 h-4 text-primary" strokeWidth={1} />,
// content: data.summary,

interface ContentProps {
  title: string;
  value: string;
  score: number;
  description?: string;
}

export default function TradeTechnicalContent({
  title,
  value,
  score,
  description,
}: ContentProps) {
  return (
    <>
      <AccordionItem
        value={value}
        className="border border-border border-b-1  p-4 rounded-2xl last:border-border last:border-b-1"
      >
        <AccordionTrigger className="hover:no-underline items-center p-0 cursor-pointer">
          <div className="flex flex-row justify-between items-center w-full">
            <h3>{title}</h3>
            <Badge className="flex-row gap-2 rounded-2xl bg-card px-2 py-1 text-primary">
              <span>{score}</span>
              <div
                className={`w-2 h-2 rounded-full ${GetScoreColor(score)}`}
              ></div>
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">{description}</p>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
