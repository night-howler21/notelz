import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.generated";
import { getPublicSupabaseEnv, getSecretSupabaseKey } from "./env";

export function createAdminClient() {
  const { url } = getPublicSupabaseEnv();

  return createClient<Database>(url, getSecretSupabaseKey(), {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
