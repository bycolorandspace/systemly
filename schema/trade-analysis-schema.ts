import { z } from "zod";

// User Input Schema for trading parameters
export const userInputSchema = z.object({
  accountCurrency: z.string().min(1, "Choose currency"),
  accountSize: z
    .number()
    .positive("Account size must be positive")
    .min(50, `Account size must be at least 50.00`)
    .max(1_000_000, "Account size cannot exceed 1M"),
  riskPerTrade: z.coerce
    .number() // ✅ Automatically converts string to number
    .min(0.01, "Risk must be at least 0.01%")
    .max(100, "Risk cannot exceed 100%"),
  tradingStyle: z.string().min(1, "Trading style is required"),
});

// Email authentication schema for Supabase OTP
export const emailAuthSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Image upload schema (for form validation)
export const imageUploadSchema = z.object({
  image: z
    .instanceof(File, { message: "Please upload a valid image file" })
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "File size must be less than 10MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      "Only JPEG, PNG, and WebP images are allowed"
    ),
});

// Combined form schema for the main trading analysis request
export const tradingAnalysisRequestSchema = z.object({
  userInputs: userInputSchema,
  image: imageUploadSchema.shape.image,
});

// Type exports for use in your application
export type UserInputs = z.infer<typeof userInputSchema>;
export type EmailAuth = z.infer<typeof emailAuthSchema>;
export type ImageUpload = z.infer<typeof imageUploadSchema>;
export type TradingAnalysisRequest = z.infer<
  typeof tradingAnalysisRequestSchema
>;
// export type TradePlan = z.infer<typeof tradePlanSchema>;
// export type TradePlanDatabase = z.infer<typeof tradePlanDatabaseSchema>;
// export type OpenAIRequest = z.infer<typeof openAIRequestSchema>;
// export type OpenAIResponse = z.infer<typeof openAIResponseSchema>;
