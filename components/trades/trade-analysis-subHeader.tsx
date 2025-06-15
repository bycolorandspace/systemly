import React from "react";
import { AccordionTrigger } from "../ui/accordion";

export default function TradeSubHeader({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <AccordionTrigger className="hover:no-underline">
      <div className="flex gap-4 items-center justify-center">
        {icon}
        <h2 className="text-lg font-normal">{title}</h2>
      </div>
    </AccordionTrigger>
  );
}
