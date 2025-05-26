import {
  strategyBasicsFields,
  accountConfigFields,
  riskManagementFields,
  tradeExecutionFields,
  marketAnalysisFields,
  timeParametersFields,
  notificationsFields,
  entryConditionsFields,
  exitConditionsFields,
  positionSizingFields,
  backtestFields,
  forwardTestFields,
} from "./fields";

export interface FormFieldConfig {
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "switch"
    | "select"
    | "multi-select"
    | "slider"
    | "date"
    | "number-array"
    | "checkbox-group"
    | "rule-builder";
  description: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  options?: Array<{ value: string; label: string }>;
  dependsOn?: string;
  dependsOnValue?: string; // Add this for conditional fields
  minSelections?: number;
  pattern?: string; // Add this for text validation patterns
}

export interface FormStep {
  id: string;
  title: string;
  description: string;
  icon?: string;
  fields: Record<string, FormFieldConfig>;
  optional?: boolean;
  estimatedTime?: string;
}

export const formSteps: FormStep[] = [
  {
    id: "basics",
    title: "Strategy Basics",
    description: "Set up your strategy fundamentals and growth goals",
    icon: "Target",
    fields: strategyBasicsFields,
    optional: false,
    estimatedTime: "2 min",
  },
  {
    id: "account",
    title: "Account Configuration",
    description: "Configure your trading account settings",
    icon: "Wallet",
    fields: accountConfigFields,
    optional: false,
    estimatedTime: "1 min",
  },
  {
    id: "risk",
    title: "Risk Management",
    description: "Define your risk parameters and limits",
    icon: "Shield",
    fields: riskManagementFields,
    optional: false,
    estimatedTime: "3 min",
  },
  {
    id: "execution",
    title: "Trade Execution",
    description: "Set up trade execution rules and limits",
    icon: "Zap",
    fields: tradeExecutionFields,
    optional: false,
    estimatedTime: "2 min",
  },
  {
    id: "analysis",
    title: "Market Analysis",
    description: "Configure market analysis and pattern recognition",
    icon: "TrendingUp",
    fields: marketAnalysisFields,
    optional: false,
    estimatedTime: "2 min",
  },
  {
    id: "timing",
    title: "Time Parameters",
    description: "Set trading hours and session preferences",
    icon: "Clock",
    fields: timeParametersFields,
    optional: false,
    estimatedTime: "1 min",
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Configure alerts and notification preferences",
    icon: "Bell",
    fields: notificationsFields,
    optional: true,
    estimatedTime: "2 min",
  },
  {
    id: "entry",
    title: "Entry Conditions",
    description: "Define complex entry rules and conditions",
    icon: "ArrowRight",
    fields: entryConditionsFields,
    optional: true,
    estimatedTime: "5 min",
  },
  {
    id: "exit",
    title: "Exit Conditions",
    description: "Set up exit rules and profit-taking strategies",
    icon: "ArrowLeft",
    fields: exitConditionsFields,
    optional: true,
    estimatedTime: "5 min",
  },
  {
    id: "sizing",
    title: "Position Sizing",
    description: "Configure position sizing methodology",
    icon: "Calculator",
    fields: positionSizingFields,
    optional: false,
    estimatedTime: "3 min",
  },
  {
    id: "backtest",
    title: "Backtesting",
    description: "Set up historical strategy testing parameters",
    icon: "BarChart3",
    fields: backtestFields,
    optional: true,
    estimatedTime: "3 min",
  },
  {
    id: "forward",
    title: "Forward Testing",
    description: "Configure paper trading and live testing",
    icon: "Play",
    fields: forwardTestFields,
    optional: true,
    estimatedTime: "2 min",
  },
];

export const getStepById = (stepId: string): FormStep | undefined => {
  return formSteps.find((step) => step.id === stepId);
};

export const getNextStep = (currentStepId: string): FormStep | undefined => {
  const currentIndex = formSteps.findIndex((step) => step.id === currentStepId);
  return currentIndex !== -1 && currentIndex < formSteps.length - 1
    ? formSteps[currentIndex + 1]
    : undefined;
};

export const getPreviousStep = (
  currentStepId: string
): FormStep | undefined => {
  const currentIndex = formSteps.findIndex((step) => step.id === currentStepId);
  return currentIndex > 0 ? formSteps[currentIndex - 1] : undefined;
};

export const getRequiredSteps = (): FormStep[] => {
  return formSteps.filter((step) => !step.optional);
};

export const getOptionalSteps = (): FormStep[] => {
  return formSteps.filter((step) => step.optional);
};

export const getTotalEstimatedTime = (): string => {
  const totalMinutes = formSteps.reduce((total, step) => {
    const minutes = parseInt(step.estimatedTime?.replace(" min", "") || "0");
    return total + minutes;
  }, 0);

  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  }

  return `${totalMinutes} min`;
};

export const getStepProgress = (currentStepId: string): number => {
  const currentIndex = formSteps.findIndex((step) => step.id === currentStepId);
  return currentIndex !== -1
    ? ((currentIndex + 1) / formSteps.length) * 100
    : 0;
};
