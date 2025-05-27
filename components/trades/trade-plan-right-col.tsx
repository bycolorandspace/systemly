import { Bolt, Copy } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { data } from "@/data/dummy-data";

export default function TradePlanRightCol() {
  return (
    <div className="flex flex-col gap-4 lg:pl-8 ">
      <Tabs
        defaultValue="action"
        className="w-auto border border-border rounded-xl m-0 p-0"
      >
        <TabsList className="grid w-full grid-cols-3 bg-transparent rounded-xl justify-center items-center p-4">
          <TabsTrigger
            value="action"
            className="data-[state=active]:border-border rounded-xl"
          >
            Action plan
          </TabsTrigger>
          <TabsTrigger
            value="exit"
            className="data-[state=active]:border-border rounded-xl"
          >
            Exit Strategy
          </TabsTrigger>
          <TabsTrigger
            value="alt"
            className="data-[state=active]:border-border rounded-xl"
          >
            Alternative scenerios
          </TabsTrigger>
        </TabsList>
        <TabsContent value="action" className="bg-transparent border-0 p-4">
          <Card className="bg-transparent ">
            <CardHeader>
              <CardTitle className="flex flex-row justify-between">
                <h2 className="headerh2">Action plan </h2>

                <div className="flex-row flex">
                  <Button variant={"ghost"} className="flex flex-row gap-2">
                    <span>Edit trade</span> <Bolt className="icon w-2 h-2" />
                  </Button>

                  <Button variant={"ghost"} className="flex flex-row gap-2">
                    <span>Copy plan</span> <Copy className="icon w-2 h-2" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 m-0 p-0">
              {Object.entries(data.actionPlan).map(([key, item]) => (
                <div
                  key={key}
                  className="w-full flex flex-col xl:justify-between xl:flex-row gap-1 not-last:border-b-1 p-4 m-0"
                >
                  <h3 className="font-bold">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
