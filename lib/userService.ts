import { UserInputs } from "@/types/trading/analysis";
import { DatabaseError } from "./analysisDataService";
import { supabase } from "./supabase";

type userUpdate = {
  user_id: string; // Ensure this matches your user ID field
  account_currency: string;
  account_size: number;
  risk_per_trade: number;
  trading_style: string;
};

export async function updateUser(
  userId: string,
  userInput: UserInputs
): Promise<void> {
  const userUpdate: userUpdate = {
    user_id: userId,
    account_currency: userInput.accountCurrency,
    account_size: userInput.accountSize,
    risk_per_trade: userInput.riskPerTrade,
    trading_style: userInput.tradingStyle,
  };
  try {
    const { error } = await supabase
      .from("users")
      .upsert(userUpdate, {
        onConflict: "user_id", // Ensure we update existing user if exists
      })
      .eq("user_id", userId); // ✅ Ensure we're updating the right user

    if (error) {
      console.error("Error saving form:", error);
      throw new DatabaseError(
        "Error saving user inputs",
        "DATABASE_ERROR",
        error
      );
    }
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error;
    }
    throw new DatabaseError(
      "Problem usaveing your trade",
      "DATABASE_ERROR",
      error
    );
  }
}

// And any other functions that reference the table
export async function getUserSettings(userId: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await supabase
    .from("users") // ✅ Updated table name
    .select("*")
    .eq("user_id", userId)
    .single();

  // ... rest of function
}
