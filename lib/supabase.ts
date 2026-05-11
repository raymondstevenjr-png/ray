import { createClient } from "@supabase/supabase-js"

export function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables")
  }

  return createClient(supabaseUrl, supabaseKey)
}
