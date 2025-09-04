import { createClient } from '@supabase/supabase-js'

// Temporary hardcoded values for testing
const supabaseUrl = 'https://snasylsaxbckacorrvyx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuYXN5bHNheGJja2Fjb3Jydnl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MzgxMDcsImV4cCI6MjA3MjQxNDEwN30.jjHEmJlUtSWyQLr49NRVkZCvSHAAlurSDYdJ0ymqK3w'

console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing')
console.log('Supabase Key:', supabaseAnonKey ? 'Set' : 'Missing')

// Create the real Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
