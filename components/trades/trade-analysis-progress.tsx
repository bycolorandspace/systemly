import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle2, LoaderIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState, useMemo } from "react";

const TradeProgressSteps = [
  {
    title: "Preparing",
    description: "Analyzing your trade plan and user inputs.",
    time: 4000,
  },
  {
    title: "Analyzing",
    description: "Analyzing market conditions and trade scenarios.",
    time: 10000,
  },
  {
    title: "Calculating",
    description: "Calculating trade metrics and risk management.",
    time: 4000,
  },
  {
    title: "Optimizing",
    description: "Optimizing trade parameters for best results.",
    time: 8000,
  },
  {
    title: "Finalizing",
    description: "Finalizing trade plan and preparing results.",
    time: 10000,
  },
];
// Total: 36000 ms (36 seconds)

export default function TradeAnalysisProgress() {
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
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isComplete]);

  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent className="bg-transparent border-0 outline-0 shadow-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-extralight mb-4 text-center">
            Preparing your chart analysis...
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
        <div className="flex flex-col gap-6">
          {TradeProgressSteps.map((step, index) => {
            // Step is completed if we've moved past it
            const stepCompleted =
              index < currentStepIndex ||
              (index === currentStepIndex && currentStepProgress === 1);
            // Step is currently active if it's the current step and not completed
            const stepActive = index === currentStepIndex && !stepCompleted;

            return (
              <div key={index} className="flex flex-row gap-2 items-center">
                {stepCompleted ? (
                  <CheckCircle2
                    className="w-6 h-6 text-green-400"
                    strokeWidth={0.75}
                  />
                ) : stepActive ? (
                  <LoaderIcon className="w-6 h-6 text-secondary animate-spin" />
                ) : (
                  <div className="w-6 h-6 rounded-full border border-secondary/30" />
                )}

                <div>
                  <h3 className={`text-xl font-light`}>{step.description}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
