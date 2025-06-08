import { AuthResults, SignUpData } from "@/types/auth/types";
import { supabase } from "./supabase";

// signUp - Create new account
// signIn - Login existing user
// signOut - Logout user
// getCurrentUser - Get current session
// resetPassword - Password reset flow
// updateUser - Update user details

// Custom error class for auth operations
export class AuthServiceError extends Error {
  constructor(
    message: string,
    public code: "AUTH_ERROR" | "NETWORK_ERROR" | "VALIDATION_ERROR",
    public originError?: unknown
  ) {
    super(message);
    this.name = "AuthServiceError";
  }
}

export async function signUp(data: SignUpData): Promise<AuthResults> {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          first_name: data.firstName ? data.firstName : "",
          last_name: data.lastName ? data.lastName : "",
        },
      },
    });

    if (error) {
      throw new AuthServiceError(error.message, "AUTH_ERROR", error);
    }
    return {
      user: authData.user,
      session: authData.session,
    };
  } catch (error) {
    if (error instanceof AuthServiceError) {
      throw error;
    }

    throw new AuthServiceError(
      "Unexpected error during sign up",
      "NETWORK_ERROR",
      error
    );
  }
}

export async function logIn(
  email: string,
  password: string
): Promise<AuthResults> {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw new AuthServiceError(error.message, "AUTH_ERROR", error);
    }
    return {
      user: authData.user,
      session: authData.session,
    };
  } catch (error) {
    if (error instanceof AuthServiceError) {
      throw error;
    }

    throw new AuthServiceError(
      "Unexpected error duting sign in",
      "NETWORK_ERROR",
      error
    );
  }
}

export async function logOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new AuthServiceError(error.message, "AUTH_ERROR", error);
    }
  } catch (error) {
    if (error instanceof AuthServiceError) {
      throw error;
    }
    throw new AuthServiceError(
      "Unexpected error during sign out",
      "NETWORK_ERROR",
      error
    );
  }
}

export async function getCurrentSession(): Promise<AuthResults> {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw new AuthServiceError(error.message, "AUTH_ERROR", error);
    }

    return {
      user: session?.user || null,
      session: session,
    };
  } catch (error) {
    if (error instanceof AuthServiceError) {
      throw error;
    }
    throw new AuthServiceError(
      "Unexpected error getting session",
      "NETWORK_ERROR",
      error
    );
  }
}

export async function recoverPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      throw new AuthServiceError(error.message, "AUTH_ERROR", error);
    }
  } catch (error) {
    if (error instanceof AuthServiceError) {
      throw error;
    }

    throw new AuthServiceError(
      "Unexpected error sending reset email",
      "NETWORK_ERROR",
      error
    );
  }
}

export async function updateUser(
  email?: string,
  password?: string
): Promise<void> {
  try {
    const { error } = await supabase.auth.updateUser(
      {
        email: email,
        password: password,
      },
      {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      }
    );

    if (error) {
      throw new AuthServiceError(error.message, "AUTH_ERROR", error);
    }
  } catch (error) {
    if (error instanceof AuthServiceError) {
      throw error;
    }

    throw new AuthServiceError(
      "Unexpected error sending reset email",
      "NETWORK_ERROR",
      error
    );
  }
}
