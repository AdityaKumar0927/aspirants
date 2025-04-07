import { supabaseAdmin } from "./supabase.server";
import type { Session, User } from "@supabase/supabase-js";

export async function getSessionUser(session: Session | null): Promise<User | null> {
  if (!session || !session.user) return null;
  return session.user;
}


