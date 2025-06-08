import { Session, User } from "@supabase/supabase-js";

export type AuthResults = {
  user: User | null;
  session: Session | null;
};

export type SignUpData = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
