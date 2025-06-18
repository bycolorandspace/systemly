import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function FilterSelector({
  onFilterChange,
}: {
  onFilterChange: (value: string) => void;
}) {
  const filterQueries = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "execution-buy",
      label: "Execution: Buy",
    },
    {
      value: "execution-sell",
      label: "Execution: Sell",
    },
    {
      value: "pnl-high",
      label: "High to low PNL",
    },
    {
      value: "pnl-low",
      label: "Low to high PNL",
    },
    {
      value: "direction-long",
      label: "Direction: Long",
    },
    {
      value: "direction-short",
      label: "Direction: Short",
    },
    {
      value: "direction-wait",
      label: "Direction: Wait",
    },
  ];

  const handleFilterChange = (value: string) => {
    onFilterChange(value);
  };

  return (
    <Select onValueChange={handleFilterChange} defaultValue="all">
      <SelectTrigger className="w-[200px] bg-transparent border-none text-secondary justify-items-start  border-0 data-[placeholder]:text-muted-secondary [&_svg:not([class*='text-'])]:text-muted-secondary justify-start  ">
        <SelectValue placeholder="Show all" className="text-white bg-white" />
      </SelectTrigger>
      <SelectContent className="bg-card text-secondary border-border border-1">
        {filterQueries.map((query) => (
          <SelectItem
            key={query.value}
            value={query.value}
            className="text-primary bg-transparent hover:bg-secondary hover:text-card"
          >
            {query.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
