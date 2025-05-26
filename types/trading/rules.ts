export type ConditionOperator = "AND" | "OR";
export type ComparisonOperator =
  | ">"
  | "<"
  | "="
  | ">="
  | "<="
  | "CROSSES_ABOVE"
  | "CROSSES_BELOW";

// Rule system for flexible conditions
export interface RuleCondition {
  id: string;
  type: string; // "INDICATOR", "PRICE", "TIME", "PATTERN", etc.
  properties: Record<string, unknown>; // Dynamic properties based on type
  comparison: ComparisonOperator;
  value: string | number | boolean;
}

export interface RuleGroup {
  id: string;
  operator: ConditionOperator;
  conditions: (RuleCondition | RuleGroup)[];
}
