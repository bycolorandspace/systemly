import { TradePlan, UserInputs } from "@/types/trading/analysis";
import { supabase } from "./supabase";

// We are recieveing:
// userID
// TradeAnalysis data (cleaned JSON) -> Save to Analysis table with ref to user
// User input -> Save to user table with user ID

export class DatabaseError extends Error {
  constructor(
    message: string,
    public code: "VALIDATION_ERROR" | "DATABASE_ERROR" | "UNAUTHORIZED",
    public originError?: unknown
  ) {
    super(message);
    this.name = "DatabaseError";
  }
}

export type TradeAnalysisReturn = {
  success: boolean;
  data?: {
    created_at: string;
    trade_data: TradePlan;
    user_input: UserInputs;
  };
  error?: string | null;
};

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function uploadAnalysisData(
  userId: string,
  userInput: UserInputs,
  analysis: TradePlan
): Promise<ServiceResponse<void>> {
  try {
    const { error } = await supabase
      .from("trade_analysis")
      .insert([
        {
          id: analysis.id,
          user_id: userId,
          trade_data: analysis,
          user_inputs: userInput,
        },
      ])
      .select("*")
      .single();

    if (error) {
      return {
        success: false,
        error: error.message || "Error saving analysis data",
      };
    }
    return {
      success: true,
      data: undefined, // No data to return on success
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while saving analysis data",
    };
  }
}

export async function getAnalysisById(
  analysisId: string
): Promise<TradeAnalysisReturn | null> {
  try {
    const { data, error } = await supabase
      .from("trade_analysis")
      .select("created_at, trade_data, user_inputs")
      .eq("id", analysisId)
      .single();
    // If there's an error, log it and throw a DatabaseError
    if (error) {
      return {
        success: false,
        error: error.message || "Error fetching analysis by ID",
      };
    }
    return {
      success: true,
      data: {
        created_at: data.created_at as string, // Ensure this is cast to string
        trade_data: data.trade_data as TradePlan,
        user_input: data.user_inputs as UserInputs, // Ensure this is cast to UserInputs
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function getUserAnalysesByID(
  userId: string
): Promise<ServiceResponse<TradeAnalysisReturn[]>> {
  try {
    const { data, error } = await supabase
      .from("trade_analysis")
      .select("created_at, trade_data, user_inputs")
      .eq("user_id", userId);

    if (error) {
      return {
        success: false,
        error: error.message || "Error fetching user analyses",
      };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        error: "No analyses found for the user",
      };
    }
    return {
      success: true,
      data: data.map((item) => ({
        success: true,
        data: {
          created_at: item.created_at as string,
          trade_data: item.trade_data as TradePlan,
          user_input: item.user_inputs as UserInputs,
        },
      })),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

// export async function updateUser(
//   userId: string,
//   userInput: UserInputs
// ): Promise<void> {
//   try {
//     const { data, error } = await supabase
//       .from("User")
//       .insert([dbFormData])
//       .select();

//     if (error) {
//       console.error("Error saving form:", error);
//       return { success: false, error: error };
//     }
//   } catch (error) {
//     if (error instanceof DatabaseError) {
//       throw error;
//     }
//     throw new DatabaseError("Problem usaveing your trade", "AUTH_ERROR", error);
//   }
// }
