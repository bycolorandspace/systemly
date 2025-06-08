import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { useTradeAnalysisContext } from "@/contexts/trade-analysis-context";
import { Select, SelectTrigger } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { calculateRiskAmount } from "@/helpers/trade-calculator";
import { formatMoney } from "@/helpers/format-money";
import { AccountCurrency, TradingStyle } from "@/types/trading/analysis";

export default function UserTradeInput() {
  const form = useFormContext();
  const { userInputFields, setUserInput } = useTradeAnalysisContext();
  const description =
    "This will be used to calculate your risk and position size for each trade. You can change this later in your account settings.";
  return (
    <div className=" items-center justify-items-center  p-8 pb-4 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full gap-[32px] row-start-2 items-center justify-center">
        <div className="grid grid-cols-3 gap-8 w-full mx-auto mt-2 justify-between items-start">
          <div className="flex flex-col gap-2 justify-center items-center">
            <h3 className="w-full text-center">Your account size</h3>
            <h2 className="text-5xl font-extralight w-full text-center">
              {`${userInputFields?.accountCurrency ?? "$"}${formatMoney(
                userInputFields?.accountSize ?? 1000
              )}`}
            </h2>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <h3 className="w-full text-center">Risk per trade</h3>
            <h2 className="text-5xl font-extralight w-full text-center">
              {userInputFields?.riskPerTrade
                ? `${userInputFields?.riskPerTrade}%`
                : `0%`}
            </h2>
            <small className="text-secondary text-sm w-full text-center">
              {userInputFields?.riskPerTrade
                ? `You may lose up to ${
                    userInputFields.accountCurrency ?? "$"
                  }${calculateRiskAmount(
                    userInputFields?.accountSize,
                    userInputFields?.riskPerTrade
                  )} per trade`
                : "Set your risk per trade to see potential losses"}
            </small>
          </div>

          <div className="flex flex-col gap-2 justify-center items-center">
            <h3 className="w-full text-center">Your trading style</h3>
            <h2 className="text-5xl font-extralight w-full text-center">
              {`${userInputFields?.tradingStyle ?? "Day"}`}
            </h2>
          </div>
        </div>
        <Card className="px-8 py-4 w-full max-w-4xl bg-transparent">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name={"userInputs.accountCurrency"}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Account currency</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(e) => {
                      field.onChange(e);
                      const flatKey = field.name.split(".").pop();
                      setUserInput({ [flatKey ?? "accountCurrency"]: e });
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="relative w-full text-primary  border border-border p-2 pl-3 rounded-md text-left h-[40px]">
                        <SelectValue
                          className="text-secondary"
                          placeholder="Change account currency"
                        />
                        <ChevronDown className="text-secondary absolute right-2 top-1/2 transform -translate-y-1/2" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-border text-primary focus:text-primary">
                      {Object.entries(AccountCurrency).map(([key, symbol]) => (
                        <SelectItem key={key} value={symbol}>
                          {symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-secondary text-sm">
                    What currency are you trading with?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"userInputs.accountSize"}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Your account size</FormLabel>
                  <FormControl>
                    <Input
                      type={"number"}
                      placeholder="Enter account size, e.g 1000"
                      className="input input-bordered border-border w-full"
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value === "") {
                          field.onChange("");
                          setUserInput({ ["accountSize"]: 10_000 });
                          return;
                        }

                        const numericValue = parseFloat(e.target.value) || 0;

                        field.onChange(numericValue);
                        setUserInput({ ["accountSize"]: numericValue }); // Pass number to state
                      }}
                    />
                  </FormControl>
                  <FormDescription className="text-secondary text-sm">
                    {description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"userInputs.riskPerTrade"}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Risk per trade</FormLabel>
                  <FormControl>
                    <Input
                      type={"number"}
                      placeholder="Enter % risk per trade, e.g 0.5%"
                      className="input input-bordered border-border w-full"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;

                        const numericValue =
                          value === "" ? 0 : parseFloat(e.target.value) || 0;
                        field.onChange(numericValue); // Pass number to form
                        setUserInput({ ["riskPerTrade"]: numericValue }); // Pass number to state
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"userInputs.tradingStyle"}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Trading style</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(e) => {
                      field.onChange(e);
                      setUserInput({ ["tradingStyle"]: e });
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="relative  text-primary w-full border border-border p-2 pl-3 rounded-md text-left h-[40px]">
                        <SelectValue
                          className="text-secondary"
                          placeholder="Select trading style"
                        />
                        <ChevronDown className="text-secondary absolute right-2 top-1/2 transform -translate-y-1/2" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-border text-primary focus:text-primary">
                      {Object.entries(TradingStyle).map(([key, symbol]) => (
                        <SelectItem key={key} value={symbol}>
                          {symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-secondary text-sm">
                    This will help us tailor the analysis to your trading style.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>
      </main>
    </div>
  );
}
