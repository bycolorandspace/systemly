import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChevronDown } from "lucide-react";
import { FormInputProps } from "./form-input-interface";
import {
  ForexPair,
  IndexPair,
  StockPair,
  TRADABLE_ASSETS,
} from "@/data/trading-pairs-data";

export default function SelectPairInput({
  name,
  label,
  placeholder,
  description,
}: FormInputProps) {
  const { control } = useFormContext();

  // Add this helper function inside your component
  const renderTradingPair = (pair: ForexPair | IndexPair | StockPair) => {
    if ("category" in pair) {
      // It's a ForexPair
      return `${pair.symbol} - ${pair.name}`;
    } else if ("market_cap" in pair) {
      // It's a StockPair
      return `${pair.symbol} - ${pair.name}`;
    } else {
      // It's an IndexPair
      return `${pair.symbol} - ${pair.name}`;
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>{label}</FormLabel>
          <Select
            value={field.value}
            onValueChange={(e) => {
              field.onChange(e);
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const flatKey = field.name.split(".").pop();
            }}
          >
            <FormControl>
              <SelectTrigger className="relative w-full text-primary  border border-border p-2 pl-3 rounded-md text-left h-[40px]">
                <SelectValue
                  className="text-secondary"
                  placeholder={placeholder}
                />
                <ChevronDown className="text-secondary absolute right-2 top-1/2 transform -translate-y-1/2" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-border text-primary focus:text-primary">
              {Object.entries(TRADABLE_ASSETS).map(([category, pairs]) => (
                <div key={category}>
                  <div className="font-semibold text-xs uppercase px-2 py-1 text-secondary">
                    {category}
                  </div>
                  {pairs.map((pair: ForexPair | IndexPair | StockPair) => (
                    <SelectItem
                      key={pair.symbol}
                      value={pair.symbol}
                      className="text-xs"
                    >
                      {renderTradingPair(pair)}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
          <FormDescription className="text-secondary text-sm">
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
