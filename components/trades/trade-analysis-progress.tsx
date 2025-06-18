import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTradeAnalysisContext } from "@/contexts/trade-analysis-context";
import { CheckCircle2, LoaderIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, useMemo } from "react";

const TradeProgressSteps = [
  {
    title: "Preparing",
    description: "Analyzing your chart and settings.",
    time: 4000, // 4s: quick start
  },
  {
    title: "Analyzing",
    description: "Analyzing market conditions and trade scenarios.",
    time: 8000, // 8s: builds anticipation
  },
  {
    title: "Calculating",
    description: "Calculating trade metrics and risk management.",
    time: 22000, // 22s: longest, main work
  },
  {
    title: "Optimizing",
    description: "Optimizing trade parameters for best results.",
    time: 9000, // 4s: quick, feels smart
  },
  {
    title: "Finalizing",
    description: "Finalizing analysis...",
    time: 20000, // 14.058s: suspenseful finish
  },
];
// Total: 4000 + 8000 + 22000 + 4000 + 14058 = 52058 ms

export default function TradeAnalysisProgress() {
  const router = useRouter();
  const { validatedTradePlan } = useTradeAnalysisContext();
  const [startTime, setStartTime] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Force re-render every 50ms while active
  const [, forceUpdate] = useState({});

  // Calculate cumulative durations once
  const { cumulativeDurations, totalDuration } = useMemo(() => {
    const stepDurations = TradeProgressSteps.map((step) => step.time);
    const cumulative = stepDurations.reduce((acc, duration, index) => {
      acc[index] = (acc[index - 1] || 0) + duration;
      return acc;
    }, [] as number[]);

    return {
      cumulativeDurations: cumulative,
      totalDuration: cumulative[cumulative.length - 1],
    };
  }, []);

  // Calculate current state
  const now = Date.now();
  const totalElapsed = startTime ? now - startTime : 0;

  // Find current step based on cumulative time
  const currentStepIndex = useMemo(() => {
    const index = cumulativeDurations.findIndex(
      (cumTime) => totalElapsed <= cumTime
    );
    return index === -1 ? TradeProgressSteps.length - 1 : index;
  }, [totalElapsed, cumulativeDurations]);

  // Calculate progress within current step
  const currentStepProgress = useMemo(() => {
    if (totalElapsed >= totalDuration) return 1;

    const stepStartTime =
      currentStepIndex === 0 ? 0 : cumulativeDurations[currentStepIndex - 1];
    const stepDuration = TradeProgressSteps[currentStepIndex].time;
    const timeIntoStep = totalElapsed - stepStartTime;

    return Math.min(timeIntoStep / stepDuration, 1);
  }, [totalElapsed, currentStepIndex, cumulativeDurations, totalDuration]);

  // Overall progress (0-1)
  const overallProgress = Math.min(totalElapsed / totalDuration, 1);

  // Check if sequence is complete
  const isComplete = totalElapsed >= totalDuration;

  useEffect(() => {
    // Start the sequence

    setStartTime(Date.now());

    // Set up the smooth update timer
    intervalRef.current = setInterval(() => {
      forceUpdate({}); // Trigger re-render
    }, 50);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Stop timer when complete to prevent unnecessary re-renders
  useEffect(() => {
    if (isComplete && intervalRef.current) {
      if (validatedTradePlan) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("Analysis complete, redirecting...", validatedTradePlan.id);
        // Redirect to the trade plan page when analysis is complete
        router.push(`/analysis/${validatedTradePlan.id}`); // Redirect to new analysis page
      }
    }
  }, [isComplete, router, validatedTradePlan]);

  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent className="bg-transparent border-0 outline-0 shadow-none justify-center items-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-extralight mb-4 text-center">
            <span className="space-x-4">Let us prepare your analysis...</span>
          </AlertDialogTitle>
          <div className="w-full h-[1px] bg-border rounded-full">
            <div
              className="h-full bg-white rounded-full transition-all duration-100 ease-out"
              style={{ width: `${Math.round(overallProgress * 100)}%` }}
            />
          </div>
          <Image
            src={"/images/chef.png"}
            alt="Chef"
            width={300}
            height={300}
            className="mx-auto mb-4"
          />
        </AlertDialogHeader>
        <div className="flex flex-col gap-4">
          {TradeProgressSteps.map((step, index) => {
            // Step is completed if we've moved past it
            const stepCompleted =
              index < currentStepIndex ||
              (index === currentStepIndex && currentStepProgress === 1);
            // Step is currently active if it's the current step and not completed
            const stepActive = index === currentStepIndex && !stepCompleted;

            return (
              <div
                key={index}
                className="flex flex-row gap-2 items-center bg-white text-card p-2 rounded-xl shadow-sm"
              >
                {stepCompleted ? (
                  <CheckCircle2
                    className="w-6 h-6 text-green-600"
                    strokeWidth={2}
                  />
                ) : stepActive ? (
                  <LoaderIcon className="w-6 h-6 text-secondary animate-spin" />
                ) : (
                  <div className="w-6 h-6 rounded-full border border-secondary/30" />
                )}

                <div>
                  <h3 className={`text-sm font-medium`}>{step.description}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
