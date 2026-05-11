import { createClient } from "@supabase/supabase-js"

export function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables")
  }

  return createClient(supabaseUrl, supabaseKey)
}

// Server-side client using service role key — bypasses RLS, never use client-side
export function getSupabaseServerClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables")
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  })
}
