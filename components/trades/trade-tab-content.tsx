import { AnalysisProps } from "@/types/trading/analysis";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { TabsContent } from "@/components/ui/tabs";
import TradeAnalysisListAlt from "./trade-analysis-list-alt";
import EditPlanButton from "./edit-plan-button";
import CopyPlanButton from "./copy-plan-button";

interface TradeTabProp extends AnalysisProps {
  title: string;
  value: string;
}

export default function TradeTabContent({ title, value, list }: TradeTabProp) {
  return (
    <TabsContent
      value={value}
      className="bg-transparent border-0 px-4 py-0 my-0"
    >
      <Card className="bg-transparent border-0 gap-0 p-0 pb-8">
        <CardHeader className="m-0 mb-2 flex flex-row justify-between">
          <CardTitle className="flex flex-row w-full justify-between m-0 p-0">
            <h2 className="headerh2">{title}</h2>
            <div className="flex flex-row gap-2 items-center">
              <EditPlanButton />
              <CopyPlanButton contentName={title} title={title} list={list} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className=" m-0 p-0">
          {value === "execution" ? (
            <div className="mx-4 p-0">
              <TradeAnalysisListAlt list={list} />
            </div>
          ) : list !== undefined ? (
            <div className="mx-4 border rounded-2xl p-0">
              {Object.entries(list ?? ["No data"]).map(([key, item], index) => (
                <div
                  key={key}
                  className="w-full flex flex-row   items-center xl:justify-start xl:flex-row gap-4 not-last:border-b-1 p-4 m-0"
                >
                  <span className="p-4 bg-card text-secondary w-4 h-4 flex justify-center items-center rounded-full">
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-2 ">
                    <h3 className="font-bold text-secondary">{item.title}</h3>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-xl mx-4 ">
              <div className="px-4 py-2">
                <div className="mx-0 p-0">
                  <span> No data available </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
