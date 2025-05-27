// Pre-Trading Psychology Types
export type PsychologyQuestionType = "single_choice" | "scale";

export type PsychologyOption = {
  value: string;
  label: string;
  score: number;
};

export type PsychologyQuestion = {
  id: string;
  question: string;
  type: PsychologyQuestionType;
  options?: PsychologyOption[];
  min?: number;
  max?: number;
  labels?: {
    [key: string]: string;
  };
};

export type PsychologyScoring = {
  min: number;
  max: number;
  recommendation: string;
  message: string;
};

export type PsychologyFlag = {
  triggered_by: string[];
  warning: string;
};

export type PreTradingQuestionnaire = {
  title: string;
  description: string;
  questions: PsychologyQuestion[];
  scoring: {
    excellent: PsychologyScoring;
    good: PsychologyScoring;
    moderate: PsychologyScoring;
    poor: PsychologyScoring;
    dangerous: PsychologyScoring;
  };
  flags: {
    [key: string]: PsychologyFlag;
  };
};
