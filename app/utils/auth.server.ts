import { supabaseAdmin } from "./supabase.server";
import type { Session, User } from "@supabase/supabase-js";

/**
 * Minimal user authentication logic using Supabase.
 * In production, you'd have a more robust approach or rely on direct 
 * supabase-client usage from the client side plus server checks.
 */

export async function getSessionUser(session: Session | null): Promise<User | null> {
  if (!session || !session.user) return null;
  // In real production code, you might fetch DB roles or additional data.
  return session.user;
}


