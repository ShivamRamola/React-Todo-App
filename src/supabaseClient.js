// Supabase client configuration
// Replace these values with your own Supabase project URL and anon key
import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and anon key from environment variables
// You can also hardcode them here, but environment variables are more secure
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY' // Superbase Password

// Create and export the Supabase client
// This client will be used throughout the app to interact with the database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

