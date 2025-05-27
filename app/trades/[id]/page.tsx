import TradePlanLeftCol from "@/components/trades/trade-plan-left-col";
import TradeHeader from "@/components/trades/trade-header";
import TradePlanRightCol from "@/components/trades/trade-plan-right-col";
import {
  ArrowDownRightFromCircle,
  BadgeCheck,
  Skull,
  Wallet,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function TradeDetail() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <TradeHeader title=" XAU/USD Trading plan" />
      {/* <div className="w-full my-8">
        <div className="flex flex-col md:flex-row  gap-4  justify-evenly w-full">
          <Card className="bg-transparent w-full p-4 flex flex-col justify-center h-full max-h-[190px] md:max-w-1/4 max-w-[190px] rounded-3xl">
            <div className="flex flex-col gap-2">
              <Wallet className="w-6 h-6 text-secondary" strokeWidth={0.75} />
              <h4 className="text-md">Potential Profit</h4>
            </div>
            <div className="flex flex-col gap-1">
              <span className="large-currency">$100</span>
              <small>
                <span className="text-green-400">+10%</span> account increase
              </small>
            </div>
          </Card>
          <Card className="bg-transparent w-full p-4 flex flex-col justify-center h-full max-h-[190px] md:max-w-1/4 max-w-[190px]   rounded-3xl">
            <div className="flex flex-col gap-2">
              <Skull className="w-6 h-6 text-secondary" strokeWidth={0.75} />
              <h4 className="text-md">Potential Loss</h4>
            </div>
            <div className="flex flex-col gap-1">
              <span className="large-currency">$25</span>
              <small>
                <span className="text-red-500">$254</span> Balance after loss
              </small>
            </div>
          </Card>
          <Card className="bg-transparent w-full p-4 flex flex-col justify-center h-full max-h-[190px] md:max-w-1/4 max-w-[190px]  rounded-3xl">
            <div className="flex flex-col gap-2">
              <BadgeCheck
                className="w-6 h-6 text-secondary"
                strokeWidth={0.75}
              />
              <h4 className="text-md">Trade Quality Score</h4>
            </div>
            <div className="flex flex-col gap-1">
              <span className="large-currency">68</span>
              <small>Not Recommended</small>
            </div>
          </Card>
          <Card className="bg-transparent w-full p-4 flex flex-col justify-center h-full max-h-[190px] md:max-w-1/4 max-w-[190px]  rounded-3xl">
            <div className="flex flex-col gap-2">
              <ArrowDownRightFromCircle
                className="w-6 h-6 text-secondary"
                strokeWidth={0.75}
              />
              <h4 className="text-md">Sell</h4>
              <small>Not Recommended</small>
            </div>
            <div className="flex flex-col gap-1">
              <span className="large-currency">68</span>
            </div>
          </Card>
          <Card className="bg-transparent w-full p-4 flex flex-col justify-center h-full max-h-[190px] md:max-w-1/4 max-w-[190px]  rounded-3xl">
            <div className="flex flex-col gap-2">
              <BadgeCheck
                className="w-6 h-6 text-secondary"
                strokeWidth={0.75}
              />
              <h4 className="text-md">Trade Quality Score</h4>
            </div>
            <div className="flex flex-col gap-1">
              <span className="large-currency">68</span>
              <small>Not Recommended</small>
            </div>
          </Card>
        </div>
      </div> */}
      <div className="flex flex-col lg:flex-row mt-10">
        <div className="lg:w-2/5 mb-6 lg:mb-0">
          <TradePlanLeftCol />
        </div>
        <div className="lg:w-3/5 mb-6 lg:mb-0">
          <TradePlanRightCol />
        </div>
      </div>
    </div>
  );
}

// <Loader strokeWidth={1} />
