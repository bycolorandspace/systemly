import { z } from "zod";

// User Input Schema for trading parameters
export const riskCalculatorSchema = z.object({
  accountCurrency: z.string().min(1, "Choose currency"),
  accountSize: z.coerce
    .number()
    .positive("Account size must be positive")
    .min(50, `Account size must be at least 50.00`)
    .max(1_000_000, "Account size cannot exceed 1M"),
  riskPerTrade: z.coerce
    .number() // ✅ Automatically converts string to number
    .min(0.01, "Risk must be at least 0.01%")
    .max(100, "Risk cannot exceed 100%"),
  pair: z.string().min(1, "Please select a pair to trade"),
  entryZone: z.string().optional(),
  exectutionType: z.string().optional(),
  stopLoss: z.string().optional(),
});

export const Update_RiskCalculatorSchema = z.object({
  entryZone: z.coerce.number().optional(),
  stopLossPips: z.coerce.number().optional(),
  stopLoss: z.coerce.number().optional(),
  takeProfit: z.coerce.number().optional(),
});

export type Update_RiskCalculatorInputs = z.infer<
  typeof Update_RiskCalculatorSchema
>;
export type RiskCalculatorInputs = z.infer<typeof riskCalculatorSchema>;
