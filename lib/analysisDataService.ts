import { TradePlan, UserInputs } from "@/types/trading/analysis";
import { supabase } from "./supabase";
import { CalculationResults } from "@/helpers/trade-calculator";
import { ExecutionTypeToString } from "@/helpers/execution-formatting";

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
  pnl: number;
  symbol?: string;
  created_at: string;
  trade_data: TradePlan;
  user_input: UserInputs;
};

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface UploadAnalysisData {
  id?: string;
  user_id?: string; // Optional, can be set later
  // Make new Top-level fields
  execution_type?: string;
  direction?: string;
  confidence?: string;
  symbol?: string;
  // Calculations will be added later
  pnl?: number;
  rr?: string;
  pips?: number;

  updated_at?: string;
  user_inputs?: UserInputs;
  trade_data?: TradePlan;
}

export async function uploadAnalysisData(
  userId: string,
  userInput: UserInputs,
  analysis: TradePlan
): Promise<ServiceResponse<void>> {
  const uploadData: UploadAnalysisData = {
    id: analysis.id || crypto.randomUUID(), // Generate a new ID if not provided
    user_id: userId, // Ensure userId is set
    // Add the new top-level fields ------
    execution_type: ExecutionTypeToString(
      analysis.execution.type.data as string
    ),
    direction: analysis.direction, // Assuming analysis has a direction field;
    confidence: analysis.confidence as string,
    symbol: analysis.symbol,
    //-----------
    updated_at: new Date().toISOString(),
    user_inputs: userInput,
    trade_data: analysis, // <-- Should i stringify this?
  };

  try {
    const { error } = await supabase
      .from("trade_analysis")
      .insert([uploadData])
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

export async function updateAnalysisData(
  analysisId: string,
  updates: {
    calculations?: CalculationResults;
    userInput?: UserInputs;
    analysis?: TradePlan;
  }
): Promise<ServiceResponse<void>> {
  if (!analysisId) {
    return {
      success: false,
      error: "Analysis ID is required",
    };
  }

  const uploadData: UploadAnalysisData = {
    updated_at: new Date().toISOString(),
  };
  // Only add fields that are provided
  if (updates.calculations) {
    uploadData.pnl = updates.calculations.profits.total;
    uploadData.rr = updates.calculations.risk.riskRewardRatio;
    uploadData.pips = updates.calculations.pips.total;
  }

  if (updates.userInput) {
    uploadData.user_inputs = updates.userInput;
  }

  try {
    const { error } = await supabase
      .from("trade_analysis")
      .update(uploadData) // ✅ Use update instead of upsert
      .eq("id", analysisId) // ✅ Specify which record to update
      .select("*")
      .single();

    if (error) {
      console.error("Error updating analysis data:", error);
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
    console.error("Unexpected error while updating analysis data:", error);
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
): Promise<ServiceResponse<TradeAnalysisReturn | null>> {
  try {
    const { data, error } = await supabase
      .from("trade_analysis")
      .select("*")
      .eq("id", analysisId)
      .single();
    // If there's an error, log it and throw a DatabaseError
    if (error) {
      return {
        success: false,
        error: error.message || "Error fetching analysis by ID",
      };
    }
    console.log("Fetched analysis data PNL:", data?.pnl);
    const returnedData: TradeAnalysisReturn = {
      pnl: data.pnl ? parseFloat(data.pnl) : 0,
      symbol: data.symbol as string,
      created_at: data.created_at as string,
      trade_data: data.trade_data as TradePlan,
      user_input: data.user_inputs as UserInputs,
    };
    return {
      success: true,
      data: returnedData,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function getUserAnalysesByID(
  userId: string,
  filter?: string
): Promise<ServiceResponse<TradeAnalysisReturn[]>> {
  try {
    let query = supabase
      .from("trade_analysis")
      .select("*")
      .eq("user_id", userId);

    if (filter === "execution-buy") {
      query = query.eq("execution_type", "Buy");
    } else if (filter === "execution-sell") {
      query = query.eq("execution_type", "Sell");
    } else if (filter === "pnl-high") {
      query = query.order("pnl", { ascending: false });
    } else if (filter === "pnl-low") {
      query = query.order("pnl", { ascending: true });
    } else if (filter === "direction-long") {
      query = query.eq("trade_data->>direction", "Long");
    } else if (filter === "direction-short") {
      query = query.eq("trade_data->>direction", "Short");
    } else if (filter === "direction-wait") {
      query = query.eq("trade_data->>direction", "Wait");
    }

    query = query.order("created_at", { ascending: false }).limit(10);

    const { data, error } = await query;

    // supabase
    //   .from("trade_analysis")
    //   .select("*")
    //   .eq("user_id", userId)
    //   .order("created_at", { ascending: false });

    if (error) {
      return {
        success: false,
        error: error.message || "Error fetching user analyses",
      };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        error: "No analyses found for here",
      };
    }
    return {
      success: true,
      data: data.map(
        (item) =>
          ({
            pnl: item.pnl ? parseFloat(item.pnl) : 0,
            created_at: item.created_at as string,
            trade_data: item.trade_data as TradePlan,
            user_input: item.user_inputs as UserInputs,
          } as TradeAnalysisReturn)
      ),
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
