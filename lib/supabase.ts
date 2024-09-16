import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vpyxpgidjlwkpuxvrzbn.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZweXhwZ2lkamx3a3B1eHZyemJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgwMjUwNTQsImV4cCI6MjAzMzYwMTA1NH0.nA-Ka3q5aQsKon1NoXGNPTMKgVSqDd4FWHXQ2eTwR9Y"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})