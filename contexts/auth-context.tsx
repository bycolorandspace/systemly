"use client";

import { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as authService from "@/lib/authService";
import { supabase } from "@/lib/supabase";
import { SignUpData } from "@/types/auth/types";
import { useRouter } from "next/navigation";

type AuthContextType = {
  //State
  user: User | null;
  loading: boolean;
  session: Session | null;
  //Actions
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  //Computed values
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    // const initializeAuth = async () => {
    //   try {
    //     const { user: currentUser, session: currentSession } =
    //       await authService.getCurrentSession();
    //     setUser(currentUser);
    //     setSession(currentSession);
    //   } catch (error) {
    //     console.error("Error initializing auth: ", error);
    //     setUser(null);
    //     setSession(null);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // initializeAuth();

    // listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logIn = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const results = await authService.logIn(email, password);
      if (results.user) {
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (data: SignUpData): Promise<void> => {
    setLoading(true);
    try {
      await authService.signUp(data);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logOut = async (): Promise<void> => {
    setLoading(true);
    try {
      await authService.logOut();
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await authService.recoverPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    loading,
    session,
    logIn,
    signUp,
    logOut,
    resetPassword,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be within an AuthProvider");
  }
  return context;
}
