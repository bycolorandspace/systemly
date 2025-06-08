import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TradeTabContent from "./trade-tab-content";
import { TradePlan } from "@/types/trading/analysis";
import { Skeleton } from "../ui/skeleton";

export default function TradePlanRightCol({
  data,
  isLoading,
}: {
  data: TradePlan | null;
  isLoading?: boolean;
}) {
  const tradePlanData = [
    {
      value: "execution",
      title: "Execution",
      list: data?.execution,
    },
    {
      value: "action",
      title: "Action plan",
      list: data?.actionPlan,
    },
    {
      value: "exit",
      title: "Exit strategy",
      list: data?.exitStrategy,
    },
    {
      value: "alt",
      title: "Alternative scenerios",
      list: data?.alternativeScenarios,
    },
  ];

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[600px] mx-8" />
      ) : (
        <div className="flex flex-col gap-0 lg:pl-8 ">
          <Tabs
            defaultValue="execution"
            className="w-auto border border-border rounded-xl m-0 p-0"
          >
            <TabsList className="grid w-auto grid-cols-4 bg-transparent m-4 justify-center items-center  max-w-[650px]">
              {tradePlanData.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="data-[state=active]:bg-sidebar rounded-full"
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {tradePlanData.map((item) => (
              <TradeTabContent
                key={item.value}
                value={item.value}
                title={item.title}
                list={item.list}
              />
            ))}
          </Tabs>
        </div>
      )}
    </>
  );
}
