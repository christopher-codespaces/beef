import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://mtrinscfwajetohklhso.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10cmluc2Nmd2FqZXRvaGtsaHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA1NDc3NDQsImV4cCI6MjAwNjEyMzc0NH0.6V7p3V4OuIHHmQvdnDdivqGcDcsSY6zCwNZCZS2P1nw"
//hey
export const supabase = createClient(supabaseUrl, supabaseAnonKey)