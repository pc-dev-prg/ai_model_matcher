// Import the Supabase client factory function
import { createClient } from '@supabase/supabase-js'

// Get Supabase project URL and anon key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL! // Supabase project URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Supabase anon public API key

// Create and export a single Supabase client instance for use throughout the app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
