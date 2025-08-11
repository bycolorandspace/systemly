import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";

export default function TradeResizer({
  onResize,
}: {
  onResize: (width: number, height: number) => void;
}) {
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);

  const handleResize = () => {
    if (onResize) {
      onResize(width, height);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full text-black h-full rounded-md"
      >
        <ResizablePanel className="bg-red-300">
          <div className="text-xs flex flex-row px-4 py-2">
            <span>SL: </span>
            <span>$30</span>{" "}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle={true} />
        <ResizablePanel className="bg-green-500">
          {/* TP1 - £10.47 (30 pips) */}
          <div className="text-xs flex flex-row px-4 py-2">
            <span>TP1: </span>
            <span>£10.47 </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle={true} />
        <ResizablePanel className="bg-green-300">
          {/* TP2 - £16.50 (30 pips) */}
          <div className="text-xs flex flex-row px-4 py-2">
            <span>TP2: </span>
            <span>£16.50</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle={true} />
        <ResizablePanel className="bg-green-200">
          {/* TP3 - £40 (30 pips) */}
          <div className="text-xs flex flex-row px-4 py-2">
            <span>TP3: </span>
            <span>£40</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle={true} />
        <ResizablePanel className="bg-green-100">
          {/* TP4 - £75 (30 pips) */}
          <div className="text-xs flex flex-row p-2">
            <span>TP4: </span>
            <span>£75</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

{
  /* <h2 className="text-lg font-semibold mb-4">Trade Resizer</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          placeholder="Width"
          className="border rounded p-2 w-24"
        />
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          placeholder="Height"
          className="border rounded p-2 w-24"
        />
      </div>
      <button
        onClick={handleResize}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Resize Trade
      </button> */
}
